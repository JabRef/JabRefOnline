<template>
  <div>
    <NuxtLayout name="content">
      <template #header>
        <NavBar
          :show-search-bar="false"
          :show-logo="true"
        >
          <div class="space-x-14">
            <t-nuxtlink
              v-for="link in links"
              :key="link.title"
              active-class="text-gray-400 hover:text-highlight-600 text-lg font-semibold"
              class="text-gray-400 hover:text-highlight-600 text-lg font-semibold"
              :to="link.href"
              >{{ link.title }}</t-nuxtlink
            >
          </div>
          <template #collapsed>
            <div class="flex flex-col">
              <t-nuxtlink
                v-for="link in links"
                :key="link.title"
                active-class="text-gray-400 hover:text-highlight-600 text-lg font-semibold"
                class="text-gray-400 hover:text-highlight-600 text-lg font-semibold"
                :href="link.href"
                >{{ link.title }}</t-nuxtlink
              >
            </div>
          </template>
        </NavBar>
      </template>

      <!-- Masthead -->
      <header class="masthead text-center">
        <div class="container mx-auto">
          <div class="flex flex-wrap">
            <div class="xl:w-3/4 pr-4 pl-4 mt-16 mx-auto">
              <h1 class="text-5xl mb-4">Stay on top of your Literature</h1>
            </div>
            <div class="xl:w-3/4 pr-4 pl-4 mx-auto">
              <h2 class="mb-5 text-3xl text-gray-700">
                The efficient way to collect, organize & discover
              </h2>
            </div>
          </div>
          <div class="mt-20 shadow-[0_0_25px_#a7a7bd] max-w-screen-xl mx-auto">
            <img
              src="~/assets/jabref-mainscreen.png"
              alt=""
            />
          </div>
          <div class="row mt-5">
            <div class="xl:w-3/4 pr-4 pl-4 mt-16 mx-auto">
              <h2 class="text-3xl">
                JabRef supports you in every step of your research
              </h2>
              <p class="text-xl font-light pt-2">
                Read more about it below or get going straight away.
              </p>
            </div>
          </div>
          <div class="row justify-content-center pt-6 pb-16">
            <div class="col-auto">
              <n-button
                type="primary"
                size="large"
                class="mx-auto"
                style="height: 3.2em"
              >
                <a
                  class="text-2xl"
                  :href="downloadUrl"
                  >Download JabRef</a
                >
              </n-button>
            </div>
          </div>
        </div>
      </header>

      <LandingPageFeatures></LandingPageFeatures>
      <LandingPageDownload></LandingPageDownload>
      <LandingPageGetInvolved></LandingPageGetInvolved>
      <LandingPageMore></LandingPageMore>
      <LandingPageFooter></LandingPageFooter>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const links = [
  {
    title: 'Features',
    href: '#features',
  },
  {
    title: 'Download',
    href: '#download',
  },
  {
    title: 'Get Involved',
    href: '#getinvolved',
  },
  {
    title: 'Support',
    href: '#support',
  },
  {
    title: 'News',
    href: 'https://blog.jabref.org/',
  },
]

const downloadUrl = constructDownloadUrl()
</script>
