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
    <Story title="Search Only">
      <NavBar
        :show-logo="false"
        :show-search-bar="true"
        :show-user-profile="false"
      />
    </Story>
    <Story title="Custom Navigation">
      <NavBar
        :show-logo="true"
        :show-search-bar="true"
        :show-user-profile="true"
      >
        <template #default> Custom items </template>
      </NavBar>
    </Story>
  </Stories>
</template>
