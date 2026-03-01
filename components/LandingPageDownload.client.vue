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
            <div class="flex justify-center gap-4">
              <DownloadButton
                text="Download for Windows"
                href="/download/win_msi"
                :show-icon="false"
              />
            </div>
          </span>

          <span v-if="isLinux()">
            <div class="flex justify-center gap-4">
              <DownloadButton
                text=".deb (Ubuntu, Debian)"
                href="/download/linux_deb"
              />
              <DownloadButton
                text=".rpm (Fedora, RedHat)"
                href="/download/linux_rpm"
              />
            </div>
          </span>
          <span v-if="isMac()">
            <div class="flex justify-center gap-4">
              <DownloadButton
                text="Apple Silicon (Arm)"
                href="/download/mac_arm64_pkg"
              />
              <DownloadButton
                text="macOS Intel (x64)"
                href="/download/mac_x86_64_pkg"
              />
            </div>
          </span>
        </div>
        <div class="text-center pt-8 text-sm">
          <span v-if="isWindows()">
            <t-nuxtlink
              class="text-primary-500"
              href="/download/win_zip"
              >Windows Portable</t-nuxtlink
            >
            <br />
            Also available for
            <t-nuxtlink
              class="text-primary-500"
              href="https://github.com/JabRef/jabref/releases/latest"
              >mac OS X and Linux</t-nuxtlink
            >
            <br />
          </span>
          <span v-if="isMac()">
            <t-nuxtlink
              class="text-primary-500"
              href="/download/mac_arm64_dmg"
              >Apple Silicon Portable (.dmg)</t-nuxtlink
            >
            or
            <t-nuxtlink
              class="text-primary-500"
              href="/download/mac_x86_64_dmg"
              >macOS Intel Portable (.dmg)</t-nuxtlink
            >
            <br />
            <div class="text-xs text-wrap max-w-sm mx-auto pt-2">
              Unsure about your Mac type? Click the Apple icon, select "About
              This Mac". If it shows "Chip", you have Apple Silicon. Otherwise,
              it's Intel.
            </div>
            <br />
            Also available for
            <t-nuxtlink
              class="text-primary-500"
              href="https://github.com/JabRef/jabref/releases/latest"
              >Windows and Linux</t-nuxtlink
            >
            <br />
          </span>
          <span v-if="isLinux()">
            <t-nuxtlink
              class="text-primary-500"
              href="/download/linux_tar_gz"
              >Linux Portable</t-nuxtlink
            >
            <br />
            Also available for
            <t-nuxtlink
              class="text-primary-500"
              href="https://github.com/JabRef/jabref/releases/latest"
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
</script>
