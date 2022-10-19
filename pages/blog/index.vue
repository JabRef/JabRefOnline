<template>
  <main class="max-w-3xl mx-auto">
    <div class="pt-24 pb-14">
      <h1 class="font-bold text-5xl">
        <n-text type="primary">The JabRef Blog</n-text>
      </h1>
    </div>
    <div
      v-for="post in posts"
      :key="post._id"
    >
      <n-divider />
      <p class="text-sm text-gray-400 font-medium uppercase">
        {{ post.date?.toLocaleDateString() ?? 'Unknown date' }}
      </p>
      <h2 class="text-2xl font-medium py-2">
        <t-nuxtlink
          :href="post._path"
          class="text-black hover:text-primary-700"
          >{{ post.title }}
        </t-nuxtlink>
      </h2>
      <p class="text-base text-gray-500">
        <ContentRendererMarkdown
          :value="post"
          :excerpt="true"
        />
      </p>
    </div>
  </main>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'content' })

function extractDate(file: string | undefined) {
  // Extract the data from filenames such as "blog/2016-01-26-welcome.md"
  const match = file?.match(/blog\/(\d{4})-(\d{2})-(\d{2})-(.*)/)
  return match
    ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
    : null
}

const entries = await queryContent('/blog').find()
const posts = entries
  .map((entry) => {
    return {
      ...entry,
      date: extractDate(entry._file),
    }
  })
  .sort((a, b) => {
    return (b.date?.getTime() || 0) - (a.date?.getTime() || 0)
  })
</script>
