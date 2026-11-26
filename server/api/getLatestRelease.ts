const config = useRuntimeConfig()

interface Release {
  tagName: string
  isPrerelease: boolean
  url: string
}

export default defineCachedEventHandler(
  async () => {
    const response = (await fetch('https://api.github.com/graphql', {
      headers: { Authorization: `Bearer ${config.githubRepoToken}` },
      body: JSON.stringify({
        query: `
        query LatestRelease {
          # eslint-disable-next-line @graphql-eslint/fields-on-correct-type
          repository(owner: "JabRef", name: "jabref") {
            # The latest stable release
            latestRelease {
              tagName
            }
            releases(
              first: 1
              orderBy: { field: CREATED_AT, direction: DESC }
            ) {
              nodes {
                tagName
                isPrerelease
                url
              }
            }
          }
        }
      `,
      }),
      method: 'POST',
    }).then((res) => res.json())) as {
      data?: {
        repository?: {
          latestRelease?: Pick<Release, 'tagName'> | null
          releases?: {
            nodes: Release[]
          }
        }
      }
    }
    const repository = response.data?.repository
    const version = repository?.latestRelease?.tagName.replace('v', '') // something like 5.7
    if (!version) {
      // TODO: Setup proper logging
      // eslint-disable-next-line no-console
      console.debug(response)
      throw createError({
        statusCode: 500,
        message: 'Failed to fetch latest release from GitHub',
      })
    }
    // A prerelease (alpha, beta, ...) that is newer than the latest stable release
    const newest = repository?.releases?.nodes[0]
    const prerelease = newest?.isPrerelease
      ? { version: newest.tagName.replace('v', ''), url: newest.url }
      : undefined
    return { version, prerelease }
  },
  {
    name: 'latest-release',
    getKey: () => 'JabRef/jabref',
    swr: true,
    maxAge: 60 * 60,
  },
)
