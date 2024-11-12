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
          <span v-if="isWindows()">
            <n-flex justify="center">
                <n-button
                  type="primary"
                  size="large"
                  style="height: 3.2em"
                >
                  <template #icon>
                    <n-icon><Icon name="material-symbols:download"/></n-icon>
                  </template>
                <a
                  class="text-2xl"
                  href="/download/win_msi"
                >.msi</a
                >
                </n-button>
              <n-button
                type="primary"
                size="large"
                style="height: 3.2em"
              >
                <template #icon>
                    <n-icon><Icon name="material-symbols:download"/></n-icon>
                  </template>
                <a
                  class="text-2xl"
                  href="/download/win_zip"
                >.zip</a
                >
                </n-button>
            </n-flex>
          </span>

          <span v-if="isLinux()">
            <n-flex justify="center">
              <n-button
                type="primary"
                size="large"
                style="height: 3.2em"
              >
                <template #icon>
                    <n-icon><Icon name="material-symbols:download"/></n-icon>
                  </template>
              <a
                class="text-2xl"
                href="/download/linux_deb"
              >.deb</a
              >
              </n-button>
              <n-button
                type="primary"
                size="large"
                style="height: 3.2em"
              >
                <template #icon>
                    <n-icon><Icon name="material-symbols:download"/></n-icon>
                  </template>
              <a
                class="text-2xl"
                href="/download/linux_rpm"
              >.rpm</a
              >
              </n-button>
              <n-button
                type="primary"
                size="large"
                style="height: 3.2em"
              >
                <template #icon>
                    <n-icon><Icon name="material-symbols:download"/></n-icon>
                  </template>
              <a
                class="text-2xl"
                href="/download/linux_tar_gz"
              >.tar.gz</a
              >
              </n-button>
            </n-flex>
          </span>
          <span v-if="isMac()">
            <n-flex justify="center">
              <n-button
                type="default"
                size="large"
                style="height: 3.2em"
              >
                <template #icon>
                    <n-icon><Icon name="material-symbols:download"/></n-icon>
                  </template>
              <a
                class="text-2xl"
                href="/download/mac_arm64_dmg"
              >arm64 dmg</a
              >
              </n-button>
              <n-button
                type="default"
                size="large"
                style="height: 3.2em"
              >
                <template #icon>
                    <n-icon><Icon name="material-symbols:download"/></n-icon>
                  </template>
              <a
                class="text-2xl"
                href="/download/mac_arm64_pkg"
              >arm64 pkg</a
              >
              </n-button>
              <n-button
                type="default"
                size="large"
                style="height: 3.2em"
              >
                <template #icon>
                    <n-icon><Icon name="material-symbols:download"/></n-icon>
                  </template>
              <a
                class="text-2xl"
                href="/download/mac_x86_64_dmg"
              >x86_64 dmg</a
              >
              </n-button>
              <n-button
                type="default"
                size="large"
                style="height: 3.2em"
              >
                <template #icon>
                    <n-icon><Icon name="material-symbols:download"/></n-icon>
                  </template>
              <a
                class="text-2xl"
                href="/download/mac_x86_64_pkg"
              >x86_64 pkg</a
              >
              </n-button>
            </n-flex>
          </span>
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
