export function useGitHubStars(repo: string) {
  const stars = ref<string | null>(null)

  if (import.meta.client) {
    fetch(`https://api.github.com/repos/${repo}`)
      .then((res) => res.json())
      .then((data: { stargazers_count?: number }) => {
        if (data.stargazers_count !== undefined) {
          stars.value = formatStarCount(data.stargazers_count)
        }
      })
      .catch(() => {})
  }

  return { stars }
}

function formatStarCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace(/\.0$/, '')}K`
  }
  return count.toString()
}
