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
              first: 1
              orderBy: { field: CREATED_AT, direction: DESC }
            ) {
              nodes {
                tagName
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
          }[]
        }
      }
    }
  }
  return {
    version: response.data?.repository?.releases?.nodes[0].tagName.replace(
      'v',
      '',
    ), // something like 5.7
  }
})
