<template>
  <nav
    class="w-full flex flex-row flex-wrap items-center justify-between bg-white px-6 border-b border-gray-300 h-20"
  >
    <!-- Logo -->
    <div
      v-if="showLogo"
      class="flex-1 flex flex-row items-center h-20 border-b mx-3 md:mx-6"
    >
      <jabref-logo class="w-10 flex-none" />
      <span
        class="ml-3 flex-1 text-gray-900 text-2xl font-semibold lg:inline-block hidden"
      >
        JabRef</span
      >
    </div>

    <!-- Search bar -->
    <div
      v-if="showSearchBar"
      class="relative text-gray-600"
    >
      <t-input
        v-model="searchQuery"
        type="search"
        placeholder="Search..."
        class="w-full xl:w-96 px-5 border-none shadow-none pl-10 font-semibold text-lg"
      />
      <button
        type="submit"
        class="absolute left-0 top-0 bottom-0 ml-2"
      >
        <Icon
          name="ri:search-line"
          class="text-gray-400"
        />
      </button>
    </div>

    <!-- Hamburger menu for small screens -->
    <n-popover
      ref="hamburgerMenu"
      placement="top-end"
      :overlap="true"
      trigger="click"
      :duration="0"
      :show-arrow="false"
      style="
        border-radius: 0.5rem;
        padding: 0;
        width: 20rem;
        margin-right: -10px;
      "
      @update:show="isHamburgerShown = $event"
    >
      <template #trigger>
        <div
          v-show="isSmallDisplay"
          class="flex mr-5 items-center relative"
        >
          <div
            v-if="isHamburgerShown"
            class="fixed z-50 inset-0 w-full h-full"
            role="dialog"
            aria-modal="true"
          >
            <div
              class="backdrop-blur-sm bg-gray-400/20 w-full h-full"
              aria-hidden="true"
            />
          </div>
          <button
            class="text-right text-gray-700 text-xl relative z-60"
            @click="isHamburgerShown = !isHamburgerShown"
          >
            <Icon :name="isHamburgerShown ? 'ri:close-fill' : 'ri:menu-fill'" />
          </button>
        </div>
      </template>
      <div class="px-6 py-5 text-base max-w-xs w-full">
        <button
          class="text-right text-gray-700 text-xl absolute top-3 right-5"
          @click=";[hamburgerMenu?.setShow(false), (isHamburgerShown = false)]"
        >
          <Icon
            v-if="isHamburgerShown"
            name="ri:close-fill"
          />
        </button>
        <slot name="collapsed" />
      </div>
    </n-popover>

    <!-- Main menu -->
    <div v-show="!isSmallDisplay">
      <slot>
        <div class="space-x-14">
          <span class="text-primary-600 text-lg font-semibold">Library</span>
          <span class="text-gray-400 text-lg font-semibold">Browse</span>
          <div class="inline">
            <span class="text-gray-400 text-lg font-semibold">
              Subscriptions
            </span>
            <div class="inline-block align-top pl-0.5 -mt-1">
              <Icon
                name="ri:checkbox-blank-circle-fill"
                class="text-primary-600 text-xs"
              />
            </div>
          </div>
        </div>
      </slot>
    </div>

    <!-- User profile -->
    <nav
      v-if="showUserProfile"
      class="flex items-center pr-10 space-x-7"
    >
      <Icon
        name="ri:notification-3-fill"
        class="text-gray-400 hover:text-primary-500 text-lg"
      />
      <div>
        <!-- User profile dropdown -->
        <t-dropdown variant="left">
          <template
            #trigger="{
              mousedownHandler,
              focusHandler,
              blurHandler,
              keydownHandler,
            }"
          >
            <button
              id="user-menu"
              class="w-12 h-12"
              aria-label="User menu"
              aria-haspopup="true"
              @mousedown="mousedownHandler"
              @focus="focusHandler"
              @blur="blurHandler"
              @keydown="keydownHandler"
            >
              <img
                class="rounded-full"
                src="https://a7sas.net/wp-content/uploads/2019/07/4060.jpeg"
                alt=""
              />
            </button>
          </template>

          <template #default="{ blurHandler }">
            <div class="w-36">
              <button
                class="block w-full px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                role="menuitem"
                @blur="blurHandler"
              >
                Your Profile
              </button>
              <button
                class="block w-full px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                role="menuitem"
                @blur="blurHandler"
              >
                Settings
              </button>
              <button
                class="block w-full px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out border-t hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                @click="logout()"
              >
                Logout
              </button>
            </div>
          </template>
        </t-dropdown>
      </div>
    </nav>

    <!-- Empty stopper for proper alignment -->
    <div
      v-show="!isSmallDisplay"
      class="flex-1 mx-3 md:mx-6"
    />
  </nav>
</template>

<script lang="ts" setup>
import { useApolloClient, useMutation } from '@vue/apollo-composable'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { gql } from '~/apollo'
import { cacheCurrentUser } from '~/apollo/cache'
import { useUiStore } from '~/store'

const isHamburgerShown = ref(false)
const hamburgerMenu = ref<typeof NPopover | null>(null)

const isSmallDisplay = useBreakpoints(breakpointsTailwind).smallerOrEqual('md')

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
  },
})

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
