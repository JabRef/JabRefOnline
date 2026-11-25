/** JabRef desktop app repo — fixed to avoid open proxy / rate-limit abuse */
const JABREF_REPO = 'JabRef/jabref'

interface GitHubRepositoryResponse {
  stargazers_count: number
}

export default defineCachedEventHandler(
  async () => {
    const { githubRepoToken } = useRuntimeConfig()

    const headers: Record<string, string> = {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'jabref-online',
    }
    if (githubRepoToken) {
      headers.Authorization = `Bearer ${githubRepoToken}`
    }

    const repo = await $fetch<GitHubRepositoryResponse>(
      `https://api.github.com/repos/${JABREF_REPO}`,
      { headers },
    )

    return { stars: repo.stargazers_count }
  },
  {
    name: 'github-stars',
    getKey: () => JABREF_REPO,
    swr: true,
    maxAge: 60 * 60,
  },
)
