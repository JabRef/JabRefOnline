<script setup lang="ts">
import NavBar from './NavBar.vue'
</script>

<template>
  <Stories
    title="NavBar"
    :component="NavBar"
  >
    <Story title="With Logo and Search">
      <NavBar
        :show-logo="true"
        :show-search-bar="true"
        :show-user-profile="false"
      />
    </Story>
    <Story title="With User Profile">
      <NavBar
        :show-logo="true"
        :show-search-bar="true"
        :show-user-profile="true"
      />
    </Story>
    <Story title="Minimal (Search Only)">
      <NavBar
        :show-logo="false"
        :show-search-bar="true"
        :show-user-profile="false"
      />
    </Story>
    <Story title="Full Navigation">
      <NavBar
        :show-logo="true"
        :show-search-bar="true"
        :show-user-profile="true"
      >
        <template #default>
          <div class="space-x-14">
            <span class="text-primary-600 text-lg font-semibold">Library</span>
            <span class="text-gray-400 text-lg font-semibold">Browse</span>
            <span class="text-gray-400 text-lg font-semibold">Subscriptions</span>
          </div>
        </template>
      </NavBar>
    </Story>
  </Stories>
</template>
