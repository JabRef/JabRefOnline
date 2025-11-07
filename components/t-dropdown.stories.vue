<script setup lang="ts">
// @ts-expect-error: not yet compatible with 'bundler' module resolution
import { TDropdown } from '@variantjs/vue'
</script>

<template>
  <Stories
    title="t-dropdown"
    :component="TDropdown"
  >
    <Story title="Default">
      <t-dropdown text="Dropdown">
        <div class="py-1 rounded-md shadow-2xs">
          <a
            href="#"
            class="block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
            role="menuitem"
          >
            Your Profile
          </a>
          <a
            href="#"
            class="block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
            role="menuitem"
          >
            Settings
          </a>
          <a
            href="#"
            class="block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
            role="menuitem"
          >
            Sign out
          </a>
        </div>
      </t-dropdown>
    </Story>
  </Stories>
</template>
