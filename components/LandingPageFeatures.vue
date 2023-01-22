<template>
  <section id="features">
    <ContentList
      v-slot="{ list }"
      path="/_landingpagefeatures"
    >
      <div
        v-for="(feature, index) in list"
        :key="feature._path"
        class="container mx-auto px-4 pb-4 lg:pb-16 mt-4 max-w-screen-xl"
      >
        <div class="flex flex-wrap">
          <div
            class="lg:w-3/5 sm:w-1/2"
            :class="{
              'md:pr-12': !(index % 2),
              'md:pl-12 md:order-last': index % 2,
            }"
          >
            <hr />
            <h2 class="text-4xl mt-5 font-semibold">{{ feature.title }}</h2>
            <div class="prose text-2xl font-light">
              <ContentRenderer :value="feature"></ContentRenderer>
            </div>
          </div>
          <div
            class="lg:w-2/5 sm:w-1/2 pt-3 flex items-center justify-center"
            :class="{
              'md:pl-12': !(index % 2),
              'md:pr-12': index % 2,
            }"
          >
            <img
              class="max-w-full h-auto shadow-[0_0_12px_#a7a7bd] rounded"
              :src="useAsset(feature.img)"
              alt=""
            />
          </div>
        </div>
      </div>
    </ContentList>
  </section>
</template>

<script lang="ts" setup>
// Taken from https://github.com/nuxt/framework/issues/7121#issuecomment-1247934787
function useAsset(path: string): string {
  const assets = import.meta.glob('~/assets/**/*', {
    eager: true,
    import: 'default',
  })
  // @ts-expect-error: wrong type info
  return assets['/assets/' + path]
}
</script>
