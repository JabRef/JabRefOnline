const config = useRuntimeConfig()

export default defineEventHandler(async () => {
  const response = (await fetch('https://api.github.com/graphql', {
    headers: { Authorization: `Bearer ${config.githubRepoToken}` },
    body: JSON.stringify({
      query: `
        query LatestRelease {
          # eslint-disable-next-line @graphql-eslint/fields-on-correct-type
          repository(owner: "JabRef", name: "jabref") {
            releases(
              first: 10
              orderBy: { field: CREATED_AT, direction: DESC }
            ) {
              nodes {
                tagName
                isPrerelease
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
        releases?: {
          nodes: {
            tagName: string
            isPrerelease: boolean
          }[]
        }
      }
    }
  }
  if (!response.data) {
    // TODO: Setup proper logging
    console.debug(response)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch latest release from GitHub',
    })
  }
  return {
    version: response.data?.repository?.releases?.nodes
      .find((release) => !release.isPrerelease)
      ?.tagName.replace('v', ''), // something like 5.7
  }
})
