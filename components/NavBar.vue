<template>
    <n-page-header class="pl-20 pt-5">
        <template v-if="showLogo" #avatar>
            <JabrefLogo class="w-10 flex-none" />
        </template>
        <template #title>
            <div v-if="showLogo">
                <a href="/" class="ml-3 flex-1 text-gray-900 text-2xl font-semibold lg:inline-block hidden">JabRef</a>
            </div>
        </template>
        <template #extra>
            <!-- Search bar -->
            <div v-if="showSearchBar" class="relative text-gray-600">
                <t-input v-model="searchQuery" type="search" placeholder="Search..."
                    class="w-full xl:w-96 px-5 border-none shadow-none pl-10 font-semibold text-lg" />
                <button type="submit" class="absolute left-0 top-0 bottom-0 ml-2">
                    <Icon name="ri:search-line" class="text-gray-400" />
                </button>
            </div>

            <!-- Hamburger menu for small screens -->
            <n-popover ref="hamburgerMenu" placement="top-end" :overlap="true" trigger="click" :duration="0"
                :show-arrow="false" style="
          border-radius: 0.5rem;
          padding: 0;
          width: 20rem;
          margin-right: -10px;
        " @update:show="isHamburgerShown = $event">
                <template #trigger>
                    <div v-show="isSmallDisplay" class="flex mr-5 items-center relative">
                        <div v-if="isHamburgerShown" class="fixed z-50 inset-0 w-full h-full" role="dialog"
                            aria-modal="true">
                            <div class="backdrop-blur-sm bg-gray-400/20 w-full h-full" aria-hidden="true"></div>
                        </div>
                        <button class="text-right text-gray-700 text-xl relative z-60"
                            @click="isHamburgerShown = !isHamburgerShown">
                            <Icon :name="isHamburgerShown ? 'ri:close-fill' : 'ri:menu-fill'" />
                        </button>
                    </div>
                </template>
                <div class="px-6 py-5 text-base max-w-xs w-full">
                    <button class="text-right text-gray-700 text-xl absolute top-3 right-5" @click="
              ;[hamburgerMenu?.setShow(false), (isHamburgerShown = false)]
                        ">
                        <Icon v-if="isHamburgerShown" name="ri:close-fill" />
                    </button>
                    <slot name="collapsed" />
                </div>
            </n-popover>

            <!-- Main menu -->
            <div v-show="!isSmallDisplay">
                <n-menu mode="horizontal" :options="menuOptions" responsive></n-menu>
            </div>
            <!-- <div v-show="!isSmallDisplay" class="flex justify-evenly pr-20">
                <nav class="justify-evenly">
                    <t-nuxtlink active-class="text-gray-400 hover:text-primary-600 text-lg font-semibold"
                        class="text-gray-400 hover:text-primary-600 text-lg font-semibold"
                        to="https://docs.jabref.org/">Docs</t-nuxtlink>
                    <n-divider vertical />
                    <t-nuxtlink active-class="text-gray-400 hover:text-primary-600 text-lg font-semibold"
                        class="text-gray-400 hover:text-primary-600 text-lg font-semibold"
                        to="https://contribute.jabref.org/">Contribute</t-nuxtlink>
                    <n-divider vertical />
                    <t-nuxtlink active-class="text-gray-400 hover:text-primary-600 text-lg font-semibold"
                        class="text-gray-400 hover:text-primary-600 text-lg font-semibold"
                        to="https://discourse.jabref.org/">Forum</t-nuxtlink>
                    <n-divider vertical />
                    <t-nuxtlink active-class="text-gray-400 hover:text-primary-600 text-lg font-semibold"
                        class="text-gray-400 hover:text-primary-600 text-lg font-semibold"
                        to="/download">Download</t-nuxtlink>
                    <n-divider vertical />
                    <t-nuxtlink active-class="text-gray-400 hover:text-primary-600 text-lg font-semibold"
                        class="text-gray-400 hover:text-primary-600 text-lg font-semibold"
                        to="https://matrix.to/#/#JabRef_jabref:gitter.im">Gitter</t-nuxtlink>
                    <n-divider vertical />
                    <n-button text type="primary" class="text-xl text-gray-400 hover:text-primary-500">
                        <a href="https://github.com/JabRef">
                            <Icon name="mdi:github" class="text-5xl" />
                        </a>
                    </n-button>
                </nav>
            </div> -->

            <!-- User profile -->
            <nav v-if="showUserProfile" class="flex items-center pr-10 space-x-7">
                <Icon name="ri:notification-3-fill" class="text-gray-400 hover:text-primary-500 text-lg" />
                <div>
                    <!-- User profile dropdown -->
                    <t-dropdown variant="left">
                        <template #trigger="{
                            mousedownHandler,
                            focusHandler,
                            blurHandler,
                            keydownHandler,
                        }">
                            <button id="user-menu" class="w-12 h-12" aria-label="User menu" aria-haspopup="true"
                                @mousedown="mousedownHandler" @focus="focusHandler" @blur="blurHandler"
                                @keydown="keydownHandler">
                                <img class="rounded-full" src="https://a7sas.net/wp-content/uploads/2019/07/4060.jpeg"
                                    alt="" />
                            </button>
                        </template>

                        <!-- Profile -->
                        <template #default="{ blurHandler }">
                            <div class="w-36">
                                <button
                                    class="block w-full px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                                    role="menuitem" @blur="blurHandler">
                                    Your Profile
                                </button>
                                <button
                                    class="block w-full px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                                    role="menuitem" @blur="blurHandler">
                                    Settings
                                </button>
                                <button
                                    class="block w-full px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out border-t hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                                    @click="logout()">
                                    Logout
                                </button>
                            </div>
                        </template>
                    </t-dropdown>
                </div>
            </nav>
        </template>
    </n-page-header>
    <n-divider />
</template>

<script lang="ts" setup>
import { useApolloClient, useMutation } from '@vue/apollo-composable'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { NPopover, NIcon } from 'naive-ui'
import { gql } from '~/apollo'
import { cacheCurrentUser } from '~/apollo/cache'
import { useUiStore } from '~/store'
import { h, ref } from 'vue'
import type { MenuOption } from 'naive-ui'
import type { Component } from 'vue'

const isHamburgerShown = ref(false)
const hamburgerMenu = ref<typeof NPopover | null>(null)

const isSmallDisplay = useBreakpoints(breakpointsTailwind).smallerOrEqual('md')

function renderIcon(icon: Component) {
    return () => h(NIcon, null, { default: () => h(icon) })
}

defineProps({
    showLogo: {
        type: Boolean,
        default: false,
    },
    showSearchBar: {
        type: Boolean,
        default: true,
    },
    showUserProfile: {
        type: Boolean,
        default: false,
    }
})

const menuOptions: MenuOption[] = [
    {
        label: () =>
            h(
                'a',
                {
                    href: 'https://docs.jabref.org/',
                    target: '_blank',
                    rel: 'noopenner noreferrer'
                },
                'Docs'
            ),
        key: 'docs',
        children: [
            {
                label: () =>
                    h(
                        'a',
                        {
                            href: 'https://docs.jabref.org/getting-started',
                            target: '_blank',
                            rel: 'noopenner noreferrer'
                        },
                        'Getting Started'
                    ),
                key: 'docs/getting-started',
            },
            {
                label: () =>
                    h(
                        'a',
                        {
                            href: 'https://devdocs.jabref.org/',
                            target: '_blank',
                            rel: 'noopenner noreferrer'
                        },
                        'Dev Docs'
                    ),
                key: 'docs/dev-docs',
            },
            {
                label: () =>
                    h(
                        'a',
                        {
                            href: 'https://github.com/JabRef/jabref/blob/main/CHANGELOG.md',
                            target: '_blank',
                            rel: 'noopenner noreferrer'
                        },
                        'Change Log'
                    ),
                key: 'docs/change-log'
            }
        ]
    },
    {
        label: () =>
            h(
                'a',
                {
                    href: 'https://contribute.jabref.org/',
                    target: '_blank',
                    rel: 'noopenner noreferrer'
                },
                'Contribute'
            ),
        key: 'contribute',
    },
    {
        label: () =>
            h(
                'a',
                {
                    href: 'https://discourse.jabref.org/',
                    target: '_blank',
                    rel: 'noopenner noreferrer'
                },
                'Forum'
            ),
        key: 'forum',
        children: [
            {
                label: () =>
                    h(
                        'a',
                        {
                            href: 'https://discourse.jabref.org/c/news',
                            target: '_blank',
                            rel: 'noopenner noreferrer'
                        },
                        'News'
                    ),
                key: 'forum/news'
            },
            {
                label: () =>
                    h(
                        'a',
                        {
                            href: 'https://discourse.jabref.org/c/help',
                            target: '_blank',
                            rel: 'noopenner noreferrer'
                        },
                        'Ask for Help'
                    ),
                key: 'forum/ask-for-help'
            },
            {
                label: () =>
                    h(
                        'a',
                        {
                            href: 'https://github.com/JabRef/jabref/issues',
                            target: '_blank',
                            rel: 'noopenner noreferrer'
                        },
                        'Report an Issue'
                    ),
                key: 'forum/report-an-issue'
            },
            {
                label: () =>
                    h(
                        'a',
                        {
                            href: 'https://discourse.jabref.org/c/features',
                            target: '_blank',
                            rel: 'noopenner noreferrer'
                        },
                        'Propose a Feature'
                    ),
                key: 'forum/propose-a-feature'
            },
            {
                label: () =>
                    h(
                        'a',
                        {
                            href: 'https://discourse.jabref.org/c/feedback',
                            target: '_blank',
                            rel: 'noopenner noreferrer'
                        },
                        'Give Feedback'
                    ),
                key: 'forum/give-feedback'
            },
            {
                label: () =>
                    h(
                        'a',
                        {
                            href: 'https://discourse.jabref.org/c/beta-testing',
                            target: '_blank',
                            rel: 'noopenner noreferrer'
                        },
                        'Beta Testing'
                    ),
                key: 'forum/beta-testing'
            },
            {
                label: () =>
                    h(
                        'a',
                        {
                            href: 'https://discourse.jabref.org/c/corner',
                            target: '_blank',
                            rel: 'noopenner noreferrer'
                        },
                        'Speaker\'s Corner'
                    ),
                key: 'forum/speakers-corner'
            }
        ]
    },
    {
        label: () =>
            h(
                'a',
                {
                    href: '/download',
                    target: '_blank',
                    rel: 'noopenner noreferrer'
                },
                'Download'
            ),
        key: 'download',
    },
    {
        label: () =>
            h(
                'a',
                {
                    href: 'https://matrix.to/#/#JabRef_jabref:gitter.im',
                    target: '_blank',
                    rel: 'noopenner noreferrer'
                },
                'Gitter'
            ),
        key: 'gitter',
    },
    {
        label: () =>
            h(
                'a',
                {
                    href: 'https://github.com/JabRef',
                    target: '_blank',
                    rel: 'noopenner noreferrer'
                },
                'GitHub'
            ),
        key: 'github'
    }
]


const { resolveClient } = useApolloClient()

const { mutate: logout, onDone } = useMutation(
    gql(/* GraphQL */ `
    mutation Logout {
      logout {
        result
      }
    }
  `),
    {
        update(cache, _data) {
            cacheCurrentUser(cache, null)
        },
    },
)

onDone(() => {
    // Reset graphql cache
    void resolveClient().clearStore()

    void navigateTo({ name: 'index' })
})

const uiStore = useUiStore()
// TODO:Don't update store immediately to avoid unnecessary queries to the server.
// For some reason `toRef(uiStore.activeSearchQuery) + useDebounce` or `debouncedWatch` doesn't work here
const searchQuery = ref(uiStore.activeSearchQuery ?? '')

watch(searchQuery, (newQuery) => {
    uiStore.activeSearchQuery = newQuery
})
</script>
