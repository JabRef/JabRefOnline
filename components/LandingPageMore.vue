<template>
  <section id="support">
    <div class="container mx-auto px-4">
      <div class="flex flex-col text-center">
        <h1 class="pb-10 text-5xl">Want to learn more?</h1>
      </div>
      <div
        class="grid md:grid-flow-col grid-cols-2 md:grid-cols-none md:grid-rows-2 max-w-5xl mx-auto gap-4"
      >
        <div
          v-for="item in items"
          :key="item.href"
          class="text-center"
        >
          <t-nuxtlink
            :href="item.href"
            class="text-primary-500 hover:text-primary-600"
          >
            <UIcon
              :name="item.icon"
              class="text-6xl"
            />
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
    icon: 'ri:walk-fill',
    text: 'Getting started',
  },
  {
    href: 'http://discourse.jabref.org',
    icon: 'ri:chat-3-fill',
    text: 'Forum',
  },
  {
    href: 'https://docs.jabref.org/',
    icon: 'ri:book-2-fill',
    text: 'User Documentation',
  },
  {
    href: 'https://discourse.jabref.org/c/features/',
    icon: 'ri:lightbulb-flash-fill',
    text: 'Propose a new feature',
  },
  {
    href: 'https://github.com/JabRef/jabref/issues',
    icon: 'ri:bug-fill',
    text: 'Report a bug',
  },
  {
    href: 'https://blog.jabref.org/',
    icon: 'ri:file-edit-fill',
    text: 'Blog',
  },
]
</script>
