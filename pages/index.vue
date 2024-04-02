<template>
  <div class="text-base">
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
              active-class="text-gray-400 hover:text-primary-600 text-lg font-semibold"
              class="text-gray-400 hover:text-primary-600 text-lg font-semibold"
              :to="link.href"
              >{{ link.title }}</t-nuxtlink
            >
          </div>
          <template #collapsed>
            <ul class="space-y-4">
              <li
                v-for="link in links"
                :key="link.title"
              >
                <t-nuxtlink
                  active-class="hover:text-primary-600 font-semibold"
                  class="hover:text-primary-600 font-semibold"
                  :href="link.href"
                  >{{ link.title }}</t-nuxtlink
                >
              </li>
            </ul>
          </template>
        </NavBar>
      </template>

      <!-- Masthead -->
      <header class="masthead text-center">
        <div class="container mx-auto px-4">
          <div class="flex flex-wrap">
            <div class="xl:w-3/4 mt-16 md:mt-24 mx-auto">
              <h1 class="text-5xl mb-4 font-semibold">
                Stay on top of your Literature
              </h1>
            </div>
            <div class="xl:w-3/4 mx-auto">
              <h2 class="mb-5 text-3xl text-gray-700">
                The efficient way to collect, organize & discover
              </h2>
            </div>
          </div>
          <div class="mt-4 md:mt-20 max-w-screen-xl mx-auto">
            <img
              src="~/assets/jabref-mainscreen.png"
              class="shadow-[0_0_25px_#a7a7bd] rounded-xl"
              alt=""
            />
          </div>
          <div class="row md:mt-5">
            <div class="xl:w-3/4 pr-4 pl-4 mt-16 mx-auto">
              <h2 class="text-3xl">
                JabRef supports you in every step of your research
              </h2>
              <p class="text-xl font-light pt-2">
                Read more about it below or get going straight away.
              </p>
            </div>
          </div>
          <div class="row justify-content-center py-6 md:pb-16">
            <div class="col-auto">
              <n-button
                type="primary"
                size="large"
                class="mx-auto"
                style="height: 3.2em"
              >
                <ClientOnly>
                  <a
                    class="text-2xl"
                    :href="constructDownloadUrl()"
                    >Download JabRef</a
                  >
                </ClientOnly>
              </n-button>
            </div>
          </div>
        </div>
      </header>

      <LandingPageFeatures />
      <LandingPageDownload />
      <LandingPageGetInvolved />
      <LandingPageMore />
      <LandingPageFooter />
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
</script>
