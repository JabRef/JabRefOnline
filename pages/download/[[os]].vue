<script lang="ts" setup>
const route = useRoute()

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
