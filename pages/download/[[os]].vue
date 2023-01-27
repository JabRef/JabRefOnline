<template>
  <NuxtLayout name="bare">
    <template #side>
      <img
        class="w-11/12 mx-auto"
        src="~/assets/undraw_right_direction_tge8.svg"
      />
    </template>
    <div class="text-lg">
      <Title>Download JabRef - The Free Reference Manager</Title>
      If you are not redirected automatically in a few seconds, then please
      <t-nuxtlink :href="downloadUrl">click here</t-nuxtlink>
      to download JabRef.
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
definePageMeta({ layout: false })

const route = useRoute()

// @ts-expect-error: https://github.com/nuxt/nuxt/issues/18570
const { version: latestRelease } = await $fetch('/api/getLatestRelease')

let downloadUrl = 'https://www.fosshub.com/JabRef.html'
const os = route.params.os as string
if (os) {
  downloadUrl +=
    {
      win: `?dwl=JabRef-${latestRelease}.msi`,
      mac: `?dwl=JabRef-${latestRelease}.pkg`,
      linux: `?dwl=jabref_${latestRelease}_amd64.deb`,
    }[os] || ''
}

await navigateTo(downloadUrl, { external: true })
</script>
