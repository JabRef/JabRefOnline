<template>
  <UHeader
    v-model:open="isMenuOpen"
    :toggle="links.length > 0"
    :menu="menu"
    :ui="{ container: 'max-w-none', left: 'gap-6', root: 'static' }"
  >
    <template #left>
      <ULink
        v-if="showLogo"
        to="/"
        aria-label="JabRef"
        class="flex shrink-0 items-center gap-3"
      >
        <jabref-logo class="w-10" />
        <span class="text-highlighted text-2xl font-semibold">JabRef</span>
      </ULink>

      <UInput
        v-if="showSearchBar"
        v-model="searchQuery"
        type="search"
        placeholder="Search..."
        icon="i-ri-search-line"
        variant="none"
        size="xl"
        class="w-full xl:w-96"
        :ui="{ base: 'font-semibold' }"
      />
    </template>

    <slot>
      <UNavigationMenu
        :items="links"
        variant="link"
        :ui="{ link: 'text-lg font-semibold' }"
      />
    </slot>

    <template #right>
      <template v-if="showUserProfile">
        <Icon
          name="ri:notification-3-fill"
          class="text-dimmed hover:text-primary text-lg"
        />
        <UDropdownMenu
          :content="{ align: 'end' }"
          :items="[
            [{ label: 'Your Profile' }, { label: 'Settings' }],
            [{ label: 'Logout', onSelect: () => logout() }],
          ]"
        >
          <button
            id="user-menu"
            class="w-12 h-12"
            aria-label="User menu"
            aria-haspopup="true"
          >
            <img
              class="rounded-full"
              src="https://a7sas.net/wp-content/uploads/2019/07/4060.jpeg"
              alt=""
            />
          </button>
        </UDropdownMenu>
      </template>

      <UTooltip
        v-if="showGithubLink"
        text="GitHub Stars"
      >
        <UButton
          icon="i-ri-github-fill"
          to="https://github.com/JabRef/jabref"
          target="_blank"
          variant="ghost"
          color="neutral"
          square
          :label="stars === null ? '...' : formatNumber(stars)"
          aria-label="JabRef on GitHub"
          :ui="{ label: 'hidden sm:inline-flex' }"
        />
      </UTooltip>
    </template>

    <template #body>
      <UNavigationMenu
        :items="menuLinks"
        orientation="vertical"
        :ui="{ link: 'text-base font-semibold' }"
        class="-mx-2.5"
      />
    </template>
  </UHeader>
</template>

<script lang="ts" setup>
import type { NavigationMenuItem } from '@nuxt/ui'
import { useApolloClient, useMutation } from '@vue/apollo-composable'
import { gql } from '~/apollo'
import { cacheCurrentUser } from '~/apollo/cache'
import { useUiStore } from '~/store'

const {
  showLogo = false,
  showSearchBar = true,
  showUserProfile = false,
  showGithubLink = false,
  links = [],
} = defineProps<{
  showLogo?: boolean
  showSearchBar?: boolean
  showUserProfile?: boolean
  showGithubLink?: boolean
  /**
   * Navigation links, shown in the header on large screens and in the menu on small screens.
   */
  links?: NavigationMenuItem[]
}>()

const isMenuOpen = ref(false)
let isMenuClosedByLink = false
const menuLinks = computed(() =>
  // oxlint-disable-next-line oxc/no-map-spread -- the links are props, so copy them instead of mutating them
  links.map((link) => ({
    ...link,
    // Close the menu also when the link points to the current section, UHeader only closes it on route changes
    // (fix proposed in https://github.com/nuxt/ui/pull/7461)
    onSelect: () => {
      isMenuClosedByLink = true
      isMenuOpen.value = false
    },
  })),
)
const menu = {
  content: {
    onCloseAutoFocus: (event: Event) => {
      // The header is not sticky, so returning the focus to the menu toggle would scroll back to the top of the page
      if (isMenuClosedByLink) {
        event.preventDefault()
        isMenuClosedByLink = false
      }
    },
  },
}

const stars = useGitHubStars()

const numberFormatter = new Intl.NumberFormat('en-GB', {
  notation: 'compact',
  maximumFractionDigits: 1,
})
function formatNumber(value: number) {
  return numberFormatter
    .format(value)
    .replace(/[kmb]$/i, (suffix) => suffix.toUpperCase())
}

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
