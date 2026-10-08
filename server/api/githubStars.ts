/** JabRef desktop app repo — fixed to avoid open proxy / rate-limit abuse */
const JABREF_REPO = 'JabRef/jabref'

export default defineCachedEventHandler(
  async (event) => {
    event.node.res.setHeader(
      'Cache-Control',
      'public, s-maxage=300, stale-while-revalidate=600',
    )

    const config = useRuntimeConfig()
    const githubToken = config.githubRepoToken as string | undefined

    const headers: Record<string, string> = {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'jabref-online',
    }
    if (githubToken) {
      headers.Authorization = `Bearer ${githubToken}`
    }

    try {
      const response = await fetch(
        `https://api.github.com/repos/${JABREF_REPO}`,
        { headers },
      )

      if (!response.ok) {
        throw new Error(`GitHub API responded with ${response.status}`)
      }

      const data = (await response.json()) as { stargazers_count?: number }

      return {
        stars: data.stargazers_count ?? 0,
      }
    } catch (error) {
      console.debug('Failed to fetch GitHub stars for repo', JABREF_REPO, error)
      throw createError({
        statusCode: 500,
        message: 'Failed to fetch GitHub stars',
      })
    }
  },
  {
    name: 'github-stars-jabref',
    maxAge: 300,
  },
)
