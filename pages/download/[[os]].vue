<template>
    <NuxtLayout name="bare">
        <template #side>
            <img class="w-11/12 mx-auto" src="~/assets/undraw_right_direction_tge8.svg" />
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
definePageMeta({
    layout: false,

    middleware: async (to) => {
        const os = to.params.os as string | undefined
        let downloadUrl = `https://github.com/JabRef/jabref/releases/download/`
        if (os && ['win_msi', 'win_zip', 'mac_arm64_dmg', 'mac_arm64_pkg', 'mac_x86_64_dmg', 'mac_x86_64_pkg', 'linux_deb', 'linux_rpm', 'linux_tar_gz'].includes(os)) {
            const { data } = await useFetch('/api/getLatestRelease')
            const latestRelease = data.value?.version
            downloadUrl += `v${latestRelease}`
            if (latestRelease) {
                downloadUrl +=
                    {
                        win_msi: `/JabRef-${latestRelease}.msi`,
                        win_zip: `/JabRef-${latestRelease}-portable_windows.zip`,
                        mac_arm64_dmg: `/JabRef-${latestRelease}-arm64.dmg`,
                        mac_arm64_pkg: `/JabRef-${latestRelease}-arm64.pkg`,
                        mac_x86_64_dmg: `/JabRef-${latestRelease}.dmg`,
                        mac_x86_64_pkg: `/JabRef-${latestRelease}.pkg`,
                        linux_deb: `/jabref_${latestRelease}_amd64.deb`,
                        linux_rpm: `/jabref-${latestRelease}-1.x86_64.rpm`,
                        linux_tar_gz: `/JabRef-${latestRelease}-portable_linux.tar.gz`,
                    }[os] ?? ''
            }
        }

        return await navigateTo(downloadUrl, { external: true })
    },
})
const downloadUrl = `https://github.com/JabRef/jabref/releases/download/`
</script>
