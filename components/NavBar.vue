<template>
    <n-page-header class="pl-20 pt-5">
        <template #avatar>
            <JabrefLogo class="w-10 flex-none"/>
        </template>
        <template #title>
            <a href="/" class="ml-3 flex-1 text-gray-900 text-2xl font-semibold lg:inline-block hidden">JabRef</a>
        </template>
        <template #extra>
            <div class="flex justify-evenly pr-20">
                <nav class='justify-evenly'>
                    <t-nuxtlink
                    active-class="text-gray-400 hover:text-primary-600 text-lg font-semibold"
                    class="text-gray-400 hover:text-primary-600 text-lg font-semibold"
                    to="https://docs.jabref.org/"
                    >Docs</t-nuxtlink
                    >
                    <n-divider vertical />
                    <t-nuxtlink
                    active-class="text-gray-400 hover:text-primary-600 text-lg font-semibold"
                    class="text-gray-400 hover:text-primary-600 text-lg font-semibold"
                    to="https://builds.jabref.org/"
                    >Builds</t-nuxtlink
                    >
                    <n-divider vertical />
                    <t-nuxtlink
                    active-class="text-gray-400 hover:text-primary-600 text-lg font-semibold"
                    class="text-gray-400 hover:text-primary-600 text-lg font-semibold"
                    to="https://contribute.jabref.org/"
                    >Contribute</t-nuxtlink
                    >
                    <n-divider vertical />
                    <t-nuxtlink
                    active-class="text-gray-400 hover:text-primary-600 text-lg font-semibold"
                    class="text-gray-400 hover:text-primary-600 text-lg font-semibold"
                    to="https://discourse.jabref.org/"
                    >Forum</t-nuxtlink
                    >
                    <n-divider vertical />
                    <t-nuxtlink
                    active-class="text-gray-400 hover:text-primary-600 text-lg font-semibold"
                    class="text-gray-400 hover:text-primary-600 text-lg font-semibold"
                    to="/download"
                    >Download</t-nuxtlink
                    >
                    <n-divider vertical />
                    <n-button
                        text
                        type="primary"
                        class="text-xl text-gray-400 hover:text-primary-500"
                        >
                        <a
                            href="https://github.com/JabRef"
                        >
                            <Icon
                            name="mdi:github"
                            class="text-5xl"
                            />
                        </a>
                    </n-button>
                </nav>
            </div>
        </template>
    </n-page-header>
    <n-divider />
</template>