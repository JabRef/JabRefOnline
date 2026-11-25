/** Star count of the JabRef GitHub repository, loaded by `plugins/githubStars.ts` */
export const useGitHubStars = () =>
  useState<number | null>('github-stars', () => null)
