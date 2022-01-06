import connectRedis from 'connect-redis'
import { Express } from 'express-serve-static-core'
import session from 'express-session'
import passport from 'passport'
import { RedisClientType } from 'redis'
import { inject, injectable } from 'tsyringe'
import { AuthService } from './auth.service'
import EmailStrategy from './auth.email.strategy'
import config from '#config'
import { Environment } from '~/config'

@injectable()
export default class PassportInitializer {
  constructor(
    private accountService: AuthService,
    @inject('RedisClient') private redisClient: RedisClientType
  ) {}

  initialize(): void {
    passport.use(new EmailStrategy(this.accountService))
    passport.serializeUser<string>((user, done) =>
      this.serializeUser(user, done)
    )
    passport.deserializeUser<string>((id, done) =>
      this.deserializeUser(id, done)
    )
  }

  install(app: Express): void {
    // Add middleware that sends and receives the session ID using cookies
    // See https://github.com/expressjs/session#readme
    const RedisStore = connectRedis(session)
    app.use(
      session({
        store: new RedisStore({
          client: this.redisClient,
          disableTouch: true,
        }),
        // The secret used to sign the session cookie
        secret: [config.session.primarySecret, config.session.secondarySecret],
        // Don't force session to be saved back to the session store unless it was modified
        resave: false,
        saveUninitialized: false,
        name: 'session',
        cookie: {
          // Serve secure cookies (requires HTTPS, so only in production)
          secure: config.environment === Environment.Production,
          // Blocks the access cooky from javascript, preventing XSS attacks
          httpOnly: true,
          // Blocks sending a cookie in a cross-origin request, protects somewhat against CORS attacks
          sameSite: true,
          // Expires after half a year
          maxAge: 0.5 * 31556952 * 1000,
        },
      })
    )
    // Add passport as middleware (this more or less only adds the _passport variable to the request)
    app.use(passport.initialize())
    // Add middleware that authenticates request based on the current session state (i.e. we alter the request to contain the hydrated user object instead of only the session ID)
    app.use(passport.session())
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private serializeUser(user: any, done: (err: unknown, id?: string) => void) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    done(null, user.id)
  }

  private deserializeUser(
    id: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    done: (err: unknown, user?: any) => void
  ) {
    this.accountService
      .getUserById(id)
      .then((user) => {
        if (user === undefined) {
          done("account doesn't exist", undefined)
        } else {
          done(null, user)
        }
      })
      .catch((error) => done(error, null))
  }
}
