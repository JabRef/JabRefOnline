function fetchStars() {
  return $fetch('/api/githubStars')
    .then((response) => response.stars)
    .catch(() => null)
}

/**
 * Loads the GitHub star count
 * (rendered on the server, fetched on the client only when the server could not get it)
 */
export default defineNuxtPlugin(async () => {
  const stars = useGitHubStars()

  if (import.meta.server) {
    stars.value = await fetchStars()
  }
  onNuxtReady(async () => {
    if (stars.value === null) {
      stars.value = await fetchStars()
    }
  })
})
