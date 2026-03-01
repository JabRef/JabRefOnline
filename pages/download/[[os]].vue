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
const FALLBACK_DOWNLOAD_URL = `https://github.com/JabRef/jabref/releases/latest`
definePageMeta({
  layout: false,

  middleware: async (to) => {
    const os = to.params.os as string | undefined
    let downloadUrl = `https://github.com/JabRef/jabref/releases/download/`
    if (
      os &&
      [
        'win_msi',
        'win_zip',
        'mac_arm64_dmg',
        'mac_arm64_pkg',
        'mac_x86_64_dmg',
        'mac_x86_64_pkg',
        'linux_deb',
        'linux_rpm',
        'linux_tar_gz',
        'linux_arm64_deb',
        'linux_arm64_rpm',
        'linux_arm64_tar_gz',
      ].includes(os)
    ) {
      const { data } = await useFetch('/api/getLatestRelease')
      const latestRelease = data.value?.version
      if (latestRelease) {
        const majorVersion = parseInt(latestRelease.split('.')[0] || '0')
        downloadUrl += `v${latestRelease}`
        downloadUrl +=
          {
            win_msi: `/JabRef-${latestRelease}.msi`,
            win_zip: `/JabRef-${latestRelease}-portable_windows.zip`,
            mac_arm64_dmg:
              majorVersion >= 6
                ? `/JabRef-${latestRelease}_silicon.dmg`
                : `/JabRef-${latestRelease}-arm64.dmg`,
            mac_arm64_pkg:
              majorVersion >= 6
                ? `/JabRef-${latestRelease}_silicon.pkg`
                : `/JabRef-${latestRelease}-arm64.pkg`,
            mac_x86_64_dmg:
              majorVersion >= 6
                ? `/JabRef-${latestRelease}_intel.dmg`
                : `/JabRef-${latestRelease}.dmg`,
            mac_x86_64_pkg:
              majorVersion >= 6
                ? `/JabRef-${latestRelease}_intel.pkg`
                : `/JabRef-${latestRelease}.pkg`,
            linux_deb: `/jabref_${latestRelease}_amd64.deb`,
            linux_rpm: `/jabref-${latestRelease}-1.x86_64.rpm`,
            linux_tar_gz: `/JabRef-${latestRelease}-portable_linux.tar.gz`,
            linux_arm64_deb: `/jabref_${latestRelease}_arm64.deb`,
            linux_arm64_rpm: `/jabref-${latestRelease}_arm64-1.aarch64.rpm`,
            linux_arm64_tar_gz: `/JabRef-${latestRelease}-portable_linux_arm64.tar.gz`,
          }[os] ?? ''
      } else {
        downloadUrl = FALLBACK_DOWNLOAD_URL
      }
    } else {
      downloadUrl = FALLBACK_DOWNLOAD_URL
    }

    return await navigateTo(downloadUrl, { external: true })
  },
})
const downloadUrl = FALLBACK_DOWNLOAD_URL
</script>
