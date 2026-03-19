export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const repo = query.repo as string

  if (!repo) {
    throw createError({
      statusCode: 400,
      message: 'Missing repo parameter',
    })
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`)

    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}`)
    }

    const data = (await response.json()) as { stargazers_count?: number }

    return {
      stars: data.stargazers_count ?? 0,
    }
  } catch (error) {
    console.debug('Failed to fetch GitHub stars for repo', repo, error)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch GitHub stars',
    })
  }
})
