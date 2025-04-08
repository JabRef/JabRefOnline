<template>
  <div
    v-if="sideBarOpen"
    id="sideBar"
    class="flex flex-col flex-wrap bg-white border-r border-gray-300 w-64 fixed md:top-0 md:left-0 z-40 h-screen"
  >
    <!-- Logo -->
    <div
      class="hidden flex-none md:flex flex-row items-center w-full h-20 border-b px-6"
    >
      <jabref-logo class="w-10 flex-none" />
      <strong class="ml-3 flex-1">JabRef</strong>
    </div>

    <!-- Collections -->
    <div class="flex flex-col pl-12 pt-6 pr-4">
      <p class="uppercase text-xs text-gray-600 mb-4 tracking-wider">Home</p>

      <a
        href="#"
        class="mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500"
      >
        <Icon
          name="ri:list-check"
          class="mr-2 pb-0.5"
        />
        All entries
      </a>

      <a
        href="#"
        class="mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500"
      >
        <Icon
          name="ri:arrow-left-right-fill"
          class="mr-2"
        />
        Recently modified
      </a>

      <p class="uppercase text-xs text-gray-600 mb-2 mt-4 tracking-wider">
        Groups
      </p>
      <BaseTree
        v-if="groups"
        v-model="groups"
        children-key="children"
        :gap="7"
        class="groupsTree"
      >
        <template #default="{ node, stat }">
          <span
            v-if="node.children && node.children.length > 0"
            class="-ml-8 mr-4 w-4 text-gray-400 inline-block"
            @click="stat.open = !stat.open"
          >
            <Icon
              v-if="!stat.open"
              name="ri:arrow-down-s-line"
            />
            <Icon
              v-else
              name="ri:arrow-up-s-line"
            />
          </span>
          <button
            class="hover:bg-gray-200 pl-1 pr-1"
            @click="onGroupClicked(node)"
          >
            <Icon
              :name="node.icon"
              class="mr-2 pb-0.5"
            />
            <span class="capitalize font-medium text-sm hover:text-teal-600">
              {{ node.name }}
            </span>
          </button>
        </template>
        <template #placeholder>
          <span class="text-gray-400">No groups</span>
        </template>
      </BaseTree>
    </div>
  </div>
</template>
<script lang="ts">
import { BaseTree } from '@he-tree/vue'
import { useQuery } from '@vue/apollo-composable'
import { gql } from '~/apollo'
import { useUiStore } from '~/store'

import '@he-tree/vue/style/default.css'

export default defineComponent({
  components: {
    BaseTree,
  },
  setup() {
    const { result } = useQuery(
      gql(/* GraphQL */ `
        query Groups {
          me {
            id
            groups {
              id
              name
              icon
              children {
                id
                name
                icon
              }
            }
          }
        }
      `),
    )
    const groups = computed(
      () => result.value?.me?.groups ?? null,
    ) as unknown as any[]

    const uiStore = useUiStore()
    function onGroupClicked(group: { id: string }) {
      uiStore.selectedGroupId = group.id
    }

    return {
      groups,
      onGroupClicked,
      sideBarOpen: true,
    }
  },
})
</script>
<style>
.groupsTree .vtlist-inner {
  overflow: visible;
  gap: 0.4em;
}
</style>
