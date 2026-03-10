To test these scripts locally, run

```bash
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
sudo apt-get install python3 pip python3-venv
python3 -m venv .venv
source .venv/bin/activate
pip install azure-identity azure-mgmt-web azure-mgmt-storage azure-mgmt-applicationinsights azure-mgmt-redis azure-mgmt-communication
az login
export AZURE_SUBSCRIPTION_ID=<...>
export AZURE_DATABASE_URL=<...>
export AZURE_SESSION_PASSWORD=<...>
python3 .github/scripts/deploy.py --env dev -v
```
