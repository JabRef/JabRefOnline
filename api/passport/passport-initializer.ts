import { Express } from 'express-serve-static-core'
import session from 'express-session'
import passport from 'passport'
import { injectable } from 'tsyringe'
import { AuthService } from './auth.service'
import LocalStrategy from './local.strategy'

@injectable()
export default class PassportInitializer {
  constructor(private accountService: AuthService) {}

  initialize(): void {
    passport.use(new LocalStrategy(this.accountService))
    passport.serializeUser<string>((user, done) =>
      this.serializeUser(user, done)
    )
    passport.deserializeUser<string>((id, done) =>
      this.deserializeUser(id as string, done)
    )
  }

  install(app: Express): void {
    // Add middleware that sends and receives the session ID using cookies
    // See https://github.com/expressjs/session#readme
    app.use(
      session({
        // The secret used to sign the session cookie
        secret: 'TODO: CHANGE THIS TO ENVIRONMENT VARIABLE',
        // Don't force session to be saved back to the session store unless it was modified
        resave: false,
        saveUninitialized: false,
        name: 'session',
        cookie: {
          // Serve secure cookies (requires HTTPS, so only in production)
          secure: app.get('env') === 'production',
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

  private serializeUser(user: any, done: (err: any, id?: string) => void) {
    done(null, user.id)
  }

  private async deserializeUser(
    id: string,
    done: (err: any, user?: any) => void
  ) {
    const user = await this.accountService.getUserById(id)
    if (user === undefined) {
      done("account doesn't exist", undefined)
    } else {
      done(null, user)
    }
  }
}
