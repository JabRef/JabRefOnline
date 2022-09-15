<template>
  <section id="features">
    <ContentList
      v-slot="{ list }"
      path="/_landingpagefeatures"
    >
      <div
        v-for="(feature, index) in list"
        :key="feature._path"
        class="container mx-auto sm:px-4 lg:pb-16 mt-4 max-w-screen-xl"
      >
        <div class="flex flex-wrap">
          <div
            class="lg:w-3/5 sm:w-1/2"
            :class="{
              'pl-3 pr-3 md:pr-12': !(index % 2),
              'pr-4 pl-3 md:pl-12 md:order-last': index % 2,
            }"
          >
            <hr />
            <h2 class="text-3xl mt-5">{{ feature.title }}</h2>
            <div class="prose text-xl font-light">
              <ContentRenderer :value="feature"></ContentRenderer>
            </div>
          </div>
          <div
            class="lg:w-2/5 sm:w-1/2 pt-3 flex items-center justify-center"
            :class="{
              'pr-3 pl-4 md:pl-12': !(index % 2),
              'pr-4 pl-3 md:pr-12': index % 2,
            }"
          >
            <img
              class="max-w-full h-auto"
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
