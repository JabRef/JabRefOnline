<template>
  <section
    id="download"
    class="bg-primary-50 bg-opacity-50"
  >
    <div class="container mx-auto px-4 pt-6 pb-4 md:py-16">
      <div class="flex flex-wrap flex-col content-center">
        <h1 class="text-center mb-3 text-5xl">Try it now</h1>
        <h3 class="text-center mb-12 text-3xl">
          JabRef is free and works across all your devices.
        </h3>
        <div class="text-center">
          <n-button
            type="primary"
            size="large"
            style="height: 3.2em"
          >
            <a
              class="text-2xl"
              :href="downloadUrl"
              >Download JabRef</a
            >
          </n-button>
        </div>

        <div class="text-center pt-8 text-sm">
          <span v-if="isWindows()">
            For Windows
            <br />
            Also available for
            <t-nuxtlink
              class="text-primary-500"
              href="download"
              >mac OS X and Linux</t-nuxtlink
            >
            <br />
          </span>
          <span v-if="isMac()">
            For mac OS X
            <br />
            Also available for
            <t-nuxtlink
              class="text-primary-500"
              href="download"
              >Windows and Linux</t-nuxtlink
            >
            <br />
          </span>
          <span v-if="isLinux()">
            For Linux
            <br />
            Also available for
            <t-nuxtlink
              class="text-primary-500"
              href="download"
            >
              mac OS X and Windows
            </t-nuxtlink>
            <br />
          </span>
          <a
            class="text-primary-500"
            href="https://github.com/JabRef/jabref/blob/main/CHANGELOG.md"
          >
            Change Log
          </a>
          and
          <a
            class="text-primary-500"
            href="https://builds.jabref.org/main/"
            >Development Builds</a
          >
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { isLinux, isMac, isWindows } from '~/composables/detectOs'

const downloadUrl = constructDownloadUrl()
</script>
