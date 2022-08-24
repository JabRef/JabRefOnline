export function detectOs() {
  const platform = window.navigator.platform
  const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K']
  const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE']
  const iosPlatforms = ['iPhone', 'iPad', 'iPod']
  if (macosPlatforms.includes(platform) || iosPlatforms.includes(platform)) {
    return 'mac'
  } else if (windowsPlatforms.includes(platform)) {
    return 'windows'
  } else if (/Linux/.test(platform)) {
    return 'linux'
  }
}

export function isWindows(): boolean {
  return detectOs() === 'windows'
}
export function isLinux(): boolean {
  return detectOs() === 'linux'
}
export function isMac(): boolean {
  return detectOs() === 'mac'
}
