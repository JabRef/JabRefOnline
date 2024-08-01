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
let downloadUrl = 'https://www.fosshub.com/JabRef.html'
definePageMeta({
  layout: false,

  middleware: async (to) => {
    // Skip middleware on server
    if (import.meta.server) {
      return
    }

    const os = to.params.os as string | undefined
    if (os && ['win', 'mac', 'linux'].includes(os)) {
      const { version: latestRelease } = await useRequestFetch()(
        '/api/getLatestRelease',
      )
      if (latestRelease) {
        downloadUrl +=
          {
            win: `?dwl=JabRef-${latestRelease}.msi`,
            mac: `?dwl=JabRef-${latestRelease}.pkg`,
            linux: `?dwl=jabref_${latestRelease}_amd64.deb`,
          }[os] ?? ''
      }
    }

    return navigateTo(downloadUrl, { external: true })
  },
})
</script>
