export function constructDownloadUrl(): string {
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
  return `/download/${osSuffix}`
}
