<template>
  <div class="text-base">
    <NuxtLayout name="content">
      <template #header>
        <NavBar
          :show-search-bar="false"
          :show-logo="true"
          :show-github-link="true"
          :links="links"
        />
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
              <h2 class="mb-5 text-3xl text">
                The efficient way to collect, organize & discover
              </h2>
            </div>
          </div>
          <div class="mt-4 md:mt-20 max-w-(--breakpoint-xl) mx-auto">
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
              <UButton
                size="xl"
                class="mx-auto h-[3.2em]"
              >
                <ClientOnly>
                  <a
                    v-if="isWindows()"
                    class="text-2xl"
                    href="/download/win_msi"
                    >Download for Windows</a
                  >
                  <a
                    v-if="isLinux()"
                    class="text-2xl"
                    href="/download/linux_deb"
                    >Download for Linux (Ubuntu, Debian)</a
                  >
                  <a
                    v-if="isMac()"
                    class="text-2xl"
                    href="/download/mac_arm64_pkg"
                    >Download for macOS (Apple Silicon)</a
                  >
                </ClientOnly>
              </UButton>
              <div class="text-center pt-4 text-sm">
                <a
                  class="text-primary hover:text-primary/75 text-sm"
                  href="/#download"
                  >Or see all download options</a
                >
              </div>
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
import type { NavigationMenuItem } from '@nuxt/ui'
import { isLinux, isMac, isWindows } from '~/composables/detectOs'

definePageMeta({ layout: false })

const links: NavigationMenuItem[] = [
  { label: 'Features', to: '#features', active: false },
  { label: 'Download', to: '#download', active: false },
  { label: 'Get Involved', to: '#getinvolved', active: false },
  { label: 'Support', to: '#support', active: false },
  { label: 'News', to: 'https://blog.jabref.org/' },
]
</script>
