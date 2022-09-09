<template>
  <section
    id="download"
    class="bg-primary-50"
  >
    <div class="container mx-auto sm:px-4 md:py-16">
      <div class="flex flex-wrap flex-col content-center">
        <h1 class="text-center mb-3 text-5xl">Try it now</h1>
        <h3 class="text-center mb-12 text-3xl">
          JabRef is free and works across all your devices.
        </h3>
        <div class="text-center">
          <n-button
            type="primary"
            size="large"
          >
            <a
              class="text-2xl"
              :href="downloadUrl"
              >Download JabRef</a
            >
          </n-button>
        </div>

        <p class="text-center pt-2">
          <small>
            <span v-if="isWindows()">
              For Windows
              <br />
              Also available for
              <a
                class="text-highlight-500"
                href="https://downloads.jabref.org/"
                >mac OS X and Linux</a
              >
              <br />
            </span>
            <span v-if="isMac()">
              For mac OS X
              <br />
              Also available for
              <a
                class="text-highlight-500"
                href="https://downloads.jabref.org/"
                >Windows and Linux</a
              >
              <br />
            </span>
            <span v-if="isLinux()">
              For Linux
              <br />
              Also available for
              <a
                class="text-highlight-500"
                href="https://downloads.jabref.org/"
              >
                mac OS X and Windows
              </a>
              <br />
            </span>
            <a
              class="text-highlight-500"
              href="https://github.com/JabRef/jabref/blob/main/CHANGELOG.md"
            >
              Change Log
            </a>
            and
            <a
              class="text-highlight-500"
              href="https://builds.jabref.org/main/"
              >Development Builds</a
            >
          </small>
        </p>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { detectOs, isLinux, isMac, isWindows } from '~/composables/detectOs'

const os = detectOs()
let osSuffix = ''
if (os) {
  osSuffix =
    {
      windows: 'win',
      mac: 'mac',
      linux: 'linux',
    }[os] || ''
}
const downloadUrl = 'https://downloads.jabref.org/' + osSuffix
</script>
