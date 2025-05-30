# type: ignore

import logging
import os
from argparse import ArgumentParser

from azure.identity import DefaultAzureCredential
from azure.mgmt.applicationinsights import ApplicationInsightsManagementClient
from azure.mgmt.communication import CommunicationServiceManagementClient
from azure.mgmt.redis import RedisManagementClient
from azure.mgmt.storage import StorageManagementClient
from azure.mgmt.web import WebSiteManagementClient
from azure.mgmt.web.models import (
    Site,
    SiteConfig,
    StaticSiteUserProvidedFunctionAppARMResource,
)


def main(environment_name: str, verbose: bool = False, secret: bool = False):
    logger = logging.getLogger("script")
    logger.addHandler(logging.StreamHandler(stream=os.sys.stdout))
    if verbose:
        logger.setLevel(level=logging.DEBUG)
    elif secret:
        logger.setLevel(level=5)
    else:
        logger.setLevel(level=logging.INFO)

    logger.info(f"Deploying to {environment_name}")

    SUBSCRIPTION_ID = os.environ.get("SUBSCRIPTION_ID", None)
    if SUBSCRIPTION_ID is None:
        raise Exception("No subscription ID found")
    GROUP_NAME = "JabRefOnline"
    STATIC_SITE = "jabref-online"
    STORAGE_ACCOUNT = "jabreffunctionstorage"
    APP_INSIGHTS_NAME = "jabref-online"
    REDIS_NAME = "jabref"
    DATABASE_URL = os.environ.get("DATABASE_URL", "<Not specified>")
    SESSION_SECRET = os.environ.get("NUXT_SESSION_PASSWORD", "<Not specified>")
    GITHUB_REPO_TOKEN = os.environ.get("GITHUB_REPO_TOKEN", "<Not specified>")

    function_app_name = "jabref-function-" + environment_name

    # Create clients
    # For other authentication approaches
    # see: https://pypi.org/project/azure-identity/
    web_client = WebSiteManagementClient(
        credential=DefaultAzureCredential(), subscription_id=SUBSCRIPTION_ID
    )
    storage_client = StorageManagementClient(
        credential=DefaultAzureCredential(), subscription_id=SUBSCRIPTION_ID
    )
    appinsights_client = ApplicationInsightsManagementClient(
        credential=DefaultAzureCredential(), subscription_id=SUBSCRIPTION_ID
    )
    redis_client = RedisManagementClient(
        credential=DefaultAzureCredential(), subscription_id=SUBSCRIPTION_ID
    )
    email_client = CommunicationServiceManagementClient(
        credential=DefaultAzureCredential(), subscription_id=SUBSCRIPTION_ID
    )

    # Get info for static site (only for debug)
    # static_site = web_client.static_sites.get_static_site(
    #     resource_group_name=GROUP_NAME, name=STATIC_SITE
    # )
    # print("Get static site:\n{}".format(static_site))
    # builds = web_client.static_sites.get_static_site_builds(
    #     resource_group_name=GROUP_NAME, name=STATIC_SITE
    # )
    # for build in builds:
    #     print("Get build:\n{}".format(build))

    storage_keys = storage_client.storage_accounts.list_keys(
        resource_group_name=GROUP_NAME, account_name=STORAGE_ACCOUNT
    )
    storage_connection_string = f"DefaultEndpointsProtocol=https;EndpointSuffix=core.windows.net;AccountName={STORAGE_ACCOUNT};AccountKey={storage_keys.keys[0].value}"
    logger.log(5, f"Storage connection string: {storage_connection_string}")

    # Azure CLI equivalent:  az communication list-key
    email_connection_string = email_client.communication_services.list_keys(
        resource_group_name=GROUP_NAME, communication_service_name="JabRefCommunication"
    ).primary_connection_string
    logger.log(5, f"Email connection string: {email_connection_string}")

    appinsights = appinsights_client.components.get(GROUP_NAME, APP_INSIGHTS_NAME)
    logger.log(5, f"Application insights instrumentation key: {appinsights.instrumentation_key}")
    redis = redis_client.redis.get(resource_group_name=GROUP_NAME, name=REDIS_NAME)
    logger.log(5, f"Redis client: {redis}")
    redis_keys = redis_client.redis.list_keys(
        resource_group_name=GROUP_NAME, name=REDIS_NAME
    )
    logger.log(5, f"Redis keys: {redis_keys}")

    # We can even link to a certain slot in an function app
    # however, we are currently limited to 2 slots per app, so this doesn't make much sense for PRs
    # https://docs.microsoft.com/en-us/azure/azure-functions/functions-scale#service-limits
    # but maybe for production + staging with swapping this might be handy in the future
    # poller_function_app_slot = web_client.web_apps.begin_create_or_update_slot(
    #     resource_group_name=GROUP_NAME,
    #     name=function_app_name,
    #     site_envelope=Site(
    #         server_farm_id=function_app.server_farm_id,
    #         location=function_app.location,
    #     ),
    #     slot="test",
    # )
    # function_app_slot = poller_function_app_slot.result()
    # print("Created function app slot:\n{}".format(function_app_slot))

    # Detach and delete already attached function apps
    linked_function_apps = (
        web_client.static_sites.get_user_provided_function_apps_for_static_site_build(
            resource_group_name=GROUP_NAME,
            name=STATIC_SITE,
            environment_name=environment_name,
        )
    )
    for app in linked_function_apps:
        logger.info(f"Detaching and deleting function app {app.name}")
        logger.debug(f"{app}")
        try:
            web_client.static_sites.detach_user_provided_function_app_from_static_site_build(
                resource_group_name=GROUP_NAME,
                name=STATIC_SITE,
                environment_name=environment_name,
                function_app_name=app.name,
            )
        except Exception as e:
            logger.error(f"Failed to detach function app {app.name}: {e}")

        # Delete function app if it exists
        # This is actually not necessary (and perhaps desired), since we can just update the function app (see below)
        # however, when doing this, we sometimes got function apps that were stuck in "deleting" state
        # so deleting the function app is a workaround for that azure bug
        try:
            web_client.web_apps.delete(
                resource_group_name=GROUP_NAME,
                name=app.name,
            )
            logger.info(f"Deleted function app: {app.name}")
        except Exception as e:
            logger.error(f"Failed to delete function app {app.name}: {e}")

    poller_function_app = web_client.web_apps.begin_create_or_update(
        resource_group_name=GROUP_NAME,
        name=function_app_name,
        site_envelope=Site(
            location="westeurope",
            kind="functionapp",
            site_config=SiteConfig(
                use32_bit_worker_process=False,
                app_settings=[
                    {"name": "FUNCTIONS_EXTENSION_VERSION", "value": "~4"},
                    {"name": "FUNCTIONS_WORKER_RUNTIME", "value": "node"},
                    {"name": "WEBSITE_NODE_DEFAULT_VERSION", "value": "~20"},
                    # Better deploy and cold-start performance
                    # https://docs.microsoft.com/en-us/azure/azure-functions/run-functions-from-deployment-package#integration-with-zip-deployment
                    {"name": "WEBSITE_RUN_FROM_PACKAGE", "value": "1"},
                    {
                        "name": "APPINSIGHTS_INSTRUMENTATIONKEY",
                        "value": appinsights.instrumentation_key,
                    },
                    {
                        "name": "AzureWebJobsStorage",
                        "value": storage_connection_string,
                    },
                    {
                        "name": "WEBSITE_CONTENTAZUREFILECONNECTIONSTRING",
                        "value": storage_connection_string,
                    },
                    {"name": "EMAIL_CLIENT", "value": email_connection_string},
                    {"name": "DATABASE_URL", "value": DATABASE_URL},
                    {"name": "NODE_ENV", "value": "production"},
                    {
                        "name": "REDIS_HOST",
                        "value": redis.host_name,
                    },
                    {
                        "name": "REDIS_PASSWORD",
                        "value": redis_keys.primary_key,
                    },
                    {"name": "NUXT_SESSION_PASSWORD", "value": SESSION_SECRET},
                    {"name": "GITHUB_REPO_TOKEN", "value": GITHUB_REPO_TOKEN},
                    # Disable indexing of non-production sites
                    # https://nuxtseo.com/robots/guides/disable-indexing#preview-staging-testing-environments
                    {"name": "NUXT_SITE_URL", "value":
                        "production" if environment_name == "default" else "preview"
                    },
                    # {
                    #     "name": "WEBSITE_CONTENTSHARE",
                    #     "value": "[concat(toLower(parameters('name')), 'b215')]",
                    # },
                ],
            ),
        ),
    )
    function_app = poller_function_app.result()
    logger.info(f"Created function app: {function_app.name}")
    logger.debug(f"{function_app}")

    # Attach new function app
    poller_link = web_client.static_sites.begin_register_user_provided_function_app_with_static_site_build(
        resource_group_name=GROUP_NAME,
        name=STATIC_SITE,
        environment_name=environment_name,
        function_app_name=function_app_name,
        static_site_user_provided_function_envelope=StaticSiteUserProvidedFunctionAppARMResource(
            kind="functionapp",
            function_app_resource_id=function_app.id,
            # function_app_resource_id=function_app_slot.id,
            function_app_region=function_app.location,
        ),
    )
    logger.info(f"Linked function app {function_app_name} to {environment_name}")
    logger.debug(f"{poller_link.result()}")


if __name__ == "__main__":
    parser = ArgumentParser()
    parser.add_argument(
        "--env",
        dest="environment_name",
        required=True,
        help="name of the environment to deploy to",
    )
    # add verbose flag
    parser.add_argument(
        "-v",
        "--verbose",
        help="increase output verbosity",
        dest="verbose",
        action="store_true",
    )
    # add secret flag
    parser.add_argument(
        "--secret",
        help="also show sensitive information (e.g. connection strings)",
        dest="secret",
        action="store_true",
    )
    args = parser.parse_args()
    main(**vars(args))
