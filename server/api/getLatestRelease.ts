const config = useRuntimeConfig()

export default defineEventHandler(async () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const response = await fetch('https://api.github.com/graphql', {
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
  }).then((res) => res.json())
  return {
    version:
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (response.data.repository.releases.nodes[0].tagName as string).replace(
        'v',
        ''
      ), // something like 5.7
  }
})
