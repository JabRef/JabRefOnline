<template>
  <section id="support">
    <div class="container mx-auto sm:px-4">
      <div class="flex flex-col text-center">
        <h1 class="pb-10 text-5xl">Want to learn more?</h1>
      </div>
      <div
        class="grid grid-flow-col grid-rows-3 md:grid-rows-2 max-w-5xl mx-auto"
      >
        <div
          v-for="item in items"
          :key="item.href"
          class="pr-4 pl-4 text-center pt-3"
        >
          <t-nuxtlink
            :href="item.href"
            class="text-primary-500 hover:text-highlight-600"
          >
            <FontAwesomeIcon :icon="item.icon" size="4x" />
            <h3 class="pb-6 pt-3 text-xl">{{ item.text }}</h3>
          </t-nuxtlink>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
const items = [
  {
    href: 'https://docs.jabref.org/getting-started',
    icon: 'walking',
    text: 'Getting started',
  },
  {
    href: 'https://docs.jabref.org/',
    icon: 'book',
    text: 'User Documentation',
  },
  {
    href: 'http://discourse.jabref.org',
    icon: 'comments',
    text: 'Forum',
  },
  {
    href: 'https://discourse.jabref.org/c/features/',
    icon: 'lightbulb',
    text: 'Propose a new feature',
  },
  {
    href: 'https://github.com/JabRef/jabref/issues',
    icon: 'bug',
    text: 'Report a bug',
  },
  {
    href: 'https://blog.jabref.org/',
    icon: 'newspaper',
    text: 'Blog',
  },
]
</script>
