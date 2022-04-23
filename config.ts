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
   * Pre-production environment, usually from the main branch with production data.
   */
  Staging = 'staging',

  /**
   * Published public state with production data.
   */
  Production = 'production',
}

function getEnvironment(): Environment {
  // Github always sets CI variable https://docs.github.com/en/actions/learn-github-actions/environment-variables
  if (process.env.CI) {
    return Environment.CI
  }

  return process.env.NODE_ENV === 'production'
    ? Environment.Production
    : Environment.LocalDevelopment
}

export interface Config {
  redis: {
    port: number
    host: string
    password: string
  }
  session: {
    primarySecret: string
    secondarySecret: string
  }
  public: {
    environment: Environment
  }
}

export function constructConfig(): Config {
  return {
    redis: {
      port: Number(process.env.REDIS_PORT) || 6380,
      host: process.env.REDIS_HOST || 'localhost',
      password: process.env.REDIS_PASSWORD || 'jabref',
    },
    session: {
      primarySecret: process.env.SESSION_SECRET_PRIMARY || 'session_secret',
      secondarySecret: process.env.SESSION_SECRET_SECONDARY || 'session_secret',
    },
    public: {
      environment: getEnvironment(),
    },
  }
}
