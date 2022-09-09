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
              active-class="text-gray-400 hover:text-highlight-600 text-lg font-semibold"
              href="#features"
              >Features</t-nuxtlink
            >
            <t-nuxtlink
              active-class="text-gray-400 hover:text-highlight-600 text-lg font-semibold"
              href="#download"
              >Download</t-nuxtlink
            >
            <t-nuxtlink
              active-class="text-gray-400 hover:text-highlight-600 text-lg font-semibold"
              href="#getinvolved"
              >Get Involved</t-nuxtlink
            >
            <t-nuxtlink
              active-class="text-gray-400 hover:text-highlight-600 text-lg font-semibold"
              href="#support"
              >Support</t-nuxtlink
            >
            <t-nuxtlink
              class="text-gray-400 hover:text-highlight-600 text-lg font-semibold"
              href="https://blog.jabref.org/"
              >News</t-nuxtlink
            >
          </div>
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
              >
                <a
                  class="text-2xl"
                  href="https://downloads.jabref.org/"
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
</script>
