export function constructDownloadUrl(): string {
  const os = detectOs()
  let osSuffix = ''
  if (os) {
    osSuffix =
      {
        windows: 'win_msi',
        mac: 'mac_arm64_dmg',
        linux: 'linux_deb',
      }[os] || ''
  }
  return `/download/${osSuffix}`
}
