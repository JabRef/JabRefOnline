export function useGitHubStars() {
  const stars = ref<string | null>(null)

  if (import.meta.client) {
    fetch('/api/githubStars')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch GitHub stars: ${res.statusText}`)
        }
        return res.json()
      })
      .then((data: { stars?: number }) => {
        if (data.stars !== undefined) {
          stars.value = formatStarCount(data.stars)
        }
      })
      .catch((error) => {
        console.debug('Failed to fetch GitHub stars:', error)
      })
  }

  return { stars }
}

function formatStarCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace(/\.0$/, '')}K`
  }
  return count.toString()
}
