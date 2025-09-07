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
    port: string
    host: string
    password: string
  }
  databaseUrl: string
  emailClient?: string
  session: {
    secret: string
  }
  githubRepoToken?: string
  public: {
    environment: Environment
  }
}

export function constructConfig() {
  return {
    redis: {
      port: '6380',
      host: 'localhost',
      password: 'jabref',
    },
    databaseUrl: 'postgresql://localhost/jabref',
    emailClient: undefined,
    session: {
      secret: 'session_secret',
    },
    githubRepoToken: undefined,
    public: {
      environment: getEnvironment(),
    },
  } satisfies Config
}
