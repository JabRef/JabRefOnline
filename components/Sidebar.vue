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
      <Logo class="w-10 flex-none" />
      <strong class="ml-3 flex-1">JabRef</strong>
    </div>

    <!-- Collections -->
    <div class="flex flex-col px-6 pt-6">
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

      <p class="uppercase text-xs text-gray-600 mb-4 mt-4 tracking-wider">
        Groups
      </p>

      <a
        href="#"
        class="mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500"
      >
        <FontAwesomeIcon
          icon="dragon"
          size="sm"
          class="mr-2 pb-0.5"
          fixed-width
        />
        Dragons
      </a>

      <a
        href="#"
        class="mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500"
      >
        <FontAwesomeIcon
          icon="leaf"
          size="sm"
          class="mr-2 pb-0.5"
          fixed-width
        />
        Plants
      </a>

      <a
        href="#"
        class="mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500"
      >
        <FontAwesomeIcon
          icon="frog"
          size="sm"
          class="mr-2 pb-0.5"
          fixed-width
        />
        Animals
      </a>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      sideBarOpen: true,
    }
  },
})
</script>
