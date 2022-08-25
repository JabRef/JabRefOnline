import connectRedis from 'connect-redis'
import session from 'express-session'
import { EventHandler } from 'h3'
import passport from 'passport'
import { RedisClientType } from 'redis'
import { Environment } from '~/config'
import { inject, injectable } from './../tsyringe'
import EmailStrategy from './auth.email.strategy'
import { AuthService } from './auth.service'

@injectable()
export default class PassportInitializer {
  constructor(
    @inject('AuthService') private accountService: AuthService,
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

  createHandler(): EventHandler {
    const config = useRuntimeConfig()

    // TODO: Use redis store also for development as soon as https://github.com/tj/connect-redis/issues/336 is fixed (and mock-redis is compatible with redis v4)
    let store: session.Store
    if (config.public.environment === Environment.Production) {
      const RedisStore = connectRedis(session)
      store = new RedisStore({
        client: this.redisClient,
        disableTouch: true,
      })
    } else {
      store = new session.MemoryStore()
    }

    const sessionMiddleware = session({
      store,
      // The secret used to sign the session cookie
      secret: [config.session.primarySecret, config.session.secondarySecret],
      // Don't force session to be saved back to the session store unless it was modified
      resave: false,
      saveUninitialized: false,
      name: 'session',
      cookie: {
        // Serve secure cookies (requires HTTPS, so only in production)
        secure: config.public.environment === Environment.Production,
        // Blocks the access cookie from javascript, preventing XSS attacks
        httpOnly: true,
        // Blocks sending a cookie in a cross-origin request, protects somewhat against CORS attacks
        sameSite: true,
        // Expires after half a year
        maxAge: 0.5 * 31556952 * 1000,
      },
    })
    const passportMiddleware = passport.initialize()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const passportSessionMiddleware = passport.session()

    return defineEventHandler(async (event) => {
      // Add middleware that sends and receives the session ID using cookies
      // @ts-ignore: https://github.com/unjs/h3/issues/146
      await callHandler(sessionMiddleware, event.req, event.res)

      // Add passport as middleware (this more or less only adds the _passport variable to the request)
      // @ts-ignore: https://github.com/unjs/h3/issues/146
      await callHandler(passportMiddleware, event.req, event.res)

      // Add middleware that authenticates request based on the current session state (i.e. we alter the request to contain the hydrated user object instead of only the session ID)
      // @ts-ignore: https://github.com/unjs/h3/issues/146
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await callHandler(passportSessionMiddleware, event.req, event.res)
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private serializeUser(user: any, done: (err: unknown, id?: string) => void) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
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
