export enum Environment {
  /**
   * Locally, on the developers machine.
   */
  LocalDevelopment = 'development',

  /**
   * During continuous integration (Github Action) run.
   */
  CI = 'ci',

  /**
   * During the build for deployment to Azure.
   */
  AzureBuild = 'build',

  /**
   * Pre-production environment, usually from the main branch with production data.
   */
  Staging = 'staging',

  /**
   * Published public state with production data.
   */
  Production = 'production',
}

/**
 * Taken from https://stackoverflow.com/a/41548441
 */
function enumFromStringValue<T>(
  enm: Record<string, T>,
  value: string,
): T | undefined {
  return (Object.values(enm) as unknown as string[]).includes(value)
    ? (value as unknown as T)
    : undefined
}

function getEnvironment(): Environment {
  if (process.env.INPUT_AZURE_STATIC_WEB_APPS_API_TOKEN) {
    return Environment.AzureBuild
  }

  // Github always sets CI variable https://docs.github.com/en/actions/learn-github-actions/environment-variables
  if (process.env.CI) {
    return Environment.CI
  }

  if (process.env.NODE_ENV === undefined) return Environment.LocalDevelopment

  return (
    enumFromStringValue(Environment, process.env.NODE_ENV) ??
    Environment.LocalDevelopment
  )
}

export interface Config {
  redis: {
    port: number
    host: string
    password: string
  }
  emailClient?: string
  session: {
    secret: string
  }
  githubRepoToken: string
  public: {
    environment: Environment
    // Only here to fix typescript error in @nuxtjs/mdc/dist/runtime/components/prose/ProseImg.vue
    mdc: {
      useNuxtImage: boolean
    }
  }
}

export function constructConfig() {
  return {
    redis: {
      port: Number(process.env.REDIS_PORT) || 6380,
      host: process.env.REDIS_HOST ?? 'localhost',
      password: process.env.REDIS_PASSWORD ?? 'jabref',
    },
    emailClient: process.env.EMAIL_CLIENT,
    session: {
      secret: process.env.NUXT_SESSION_PASSWORD ?? 'session_secret',
    },
    githubRepoToken: process.env.GITHUB_REPO_TOKEN ?? 'UNDEFINED',
    public: {
      environment: getEnvironment(),
      mdc: {
        useNuxtImage: false,
      },
    },
  } satisfies Config
}
