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
        <FontAwesomeIcon
          icon="list"
          size="sm"
          class="mr-2 pb-0.5"
          fixed-width
        />
        All entries
      </a>

      <a
        href="#"
        class="mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500"
      >
        <FontAwesomeIcon
          icon="exchange-alt"
          size="xs"
          class="mr-2"
          fixed-width
        />
        Recently modified
      </a>

      <p class="uppercase text-xs text-gray-600 mb-2 mt-4 tracking-wider">
        Groups
      </p>

      <BaseTree
        v-if="groups"
        :tree-data="
          // @ts-ignore -- issue with BaseTree not being generic
          groups as any
        "
        children-key="children"
        :gap="7"
        class="groupsTree"
      >
        <template #default="{ node, tree }">
          <span
            v-if="node.$children.length > 0"
            class="-ml-8 mr-4 w-4 text-gray-400 inline-block"
            @click="tree.toggleFold(node)"
          >
            <FontAwesomeIcon
              v-if="node.$folded"
              icon="angle-down"
              size="sm"
              fixed-width
            />
            <FontAwesomeIcon
              v-else
              icon="angle-up"
              size="sm"
              class=""
              fixed-width
            />
          </span>
          <button
            class="hover:bg-gray-200 pl-1 pr-1"
            @click="onGroupClicked(node)"
          >
            <FontAwesomeIcon
              :icon="node.icon"
              size="sm"
              class="mr-2 pb-0.5"
              fixed-width
            />
            <span class="capitalize font-medium text-sm hover:text-teal-600">
              {{ node.name }}
            </span>
          </button>
        </template>
      </BaseTree>
    </div>
  </div>
</template>
<script lang="ts">
import { useResult, useQuery } from '@vue/apollo-composable'
import { BaseTree } from '@he-tree/vue3'
import { gql } from '~/apollo'
import { useUiStore } from '~/store'
import '@he-tree/vue3/dist/he-tree-vue3.css'

export default defineComponent({
  components: {
    BaseTree,
  },
  setup() {
    const { result } = useQuery(
      gql(/* GraphQL */ `
        query GetGroups {
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
      `)
    )
    const groups = useResult(result, null, (data) => data?.me?.groups)

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
.groupsTree .vl-items {
  overflow: visible;
}
</style>
