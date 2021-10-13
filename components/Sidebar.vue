<template>
  <div
    v-if="sideBarOpen"
    id="sideBar"
    class="
      flex flex-col flex-wrap
      bg-white
      border-r border-gray-300
      w-64
      fixed
      md:top-0 md:left-0
      z-40
      h-screen
    "
  >
    <!-- Logo -->
    <div
      class="
        hidden
        flex-none
        md:flex
        flex-row
        items-center
        w-full
        h-20
        border-b
        px-6
      "
    >
      <Logo class="w-10 flex-none" />
      <strong class="ml-3 flex-1">JabRef</strong>
    </div>

    <!-- Collections -->
    <div class="flex flex-col pl-12 pt-6 pr-4">
      <p class="uppercase text-xs text-gray-600 mb-4 tracking-wider">Home</p>

      <a
        href="#"
        class="
          mb-3
          capitalize
          font-medium
          text-sm
          hover:text-teal-600
          transition
          ease-in-out
          duration-500
        "
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
        class="
          mb-3
          capitalize
          font-medium
          text-sm
          hover:text-teal-600
          transition
          ease-in-out
          duration-500
        "
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

      <vue-tree-list
        v-if="groupsTree"
        class="groupsTree"
        :model="groupsTree"
        :default-expanded="true"
        @click="onGroupClicked"
      >
        <template #leafNameDisplay="slotProps">
          <span
            class="
              capitalize
              font-medium
              text-sm
              hover:text-teal-600
              transition
              ease-in-out
              duration-500
            "
          >
            {{ slotProps.model.name }}
          </span>
        </template>
        <span slot="addTreeNodeIcon" class="icon"></span>
        <span slot="addLeafNodeIcon" class="icon"></span>
        <span slot="editNodeIcon" class="icon"></span>
        <span slot="delNodeIcon" class="icon"></span>
        <span slot="leafNodeIcon" class="icon"></span>
        <template #treeNodeIcon="slotProps">
          <FontAwesomeIcon
            :icon="slotProps.model.icon"
            size="sm"
            class="mr-2 pb-0.5"
            fixed-width
          />
        </template>
      </vue-tree-list>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
// @ts-ignore: No type infos available
import { VueTreeList, Tree } from 'vue-tree-list'
import { useResult, useQuery } from '@vue/apollo-composable'
import { gql } from '~/apollo'
import { useUiStore } from '~/store'

export default defineComponent({
  components: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    VueTreeList,
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
    const groupsTree = computed(() =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
      groups.value != null ? new Tree(groups.value) : null
    )

    const uiStore = useUiStore()
    function onGroupClicked(group: { id: string }) {
      uiStore.selectedGroupId = group.id
    }

    return {
      groupsTree,
      onGroupClicked,
      sideBarOpen: true,
    }
  },
})
</script>
<style>
.groupsTree .vtl-caret {
  margin-left: -0.9rem;
  margin-right: 0.3rem;
}
.groupsTree .vtl-node-main {
  padding: 0;
  margin-bottom: 0.35rem;
  margin-top: 0.35rem;
}
.groupsTree .vtl-node-content {
  line-height: 20px;
}
.groupsTree .vtl-tree-margin {
  margin-top: -12.5px;
  margin-left: 1.5em;
}
.groupsTree .vtl-icon-caret-down:before {
  content: url('data:image/svg+xml; utf8, <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" data-svgs-path="sm1/caret.svg"><path fill="none" fill-rule="evenodd" stroke="gray" stroke-linecap="round" stroke-linejoin="round" d="M16 10l-4 4-4-4"></path></svg>');
  display: block;
  padding-right: 0.3rem;
  margin-left: -1.3rem;
  margin-top: -0.1rem;
  font-size: 0.875em;
}
.groupsTree .vtl-icon-caret-right:before {
  content: url('data:image/svg+xml; utf8, <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" data-svgs-path="sm1/caret.svg"><path fill="none" fill-rule="evenodd" stroke="gray" stroke-linecap="round" stroke-linejoin="round" d="M16 10l-4 4-4-4"></path></svg>');
  display: block;
  margin-left: -1.5rem;
  margin-top: -0.2rem;
  padding-right: 0.2rem;
  padding-left: 0.3rem;
  font-size: 0.875em;
  transform: rotate(-90deg);
}

.groupsTree .vtl-operation {
  display: none;
}
</style>
