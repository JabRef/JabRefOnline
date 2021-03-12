import { Express } from 'express-serve-static-core'
import session from 'express-session'
import passport from 'passport'
import { AuthService } from './auth.service'
import LocalStrategy from './local.strategy'

export default class PassportInitializer {
  constructor(private accountService: AuthService) {}

  initialize(): void {
    passport.use(new LocalStrategy(this.accountService))
    passport.serializeUser(this.serializeUser)
    passport.deserializeUser(this.deserializeUser)
  }

  install(app: Express): void {
    // Add middleware that sends and receives the session ID using cookies
    app.use(
      session({
        secret: 'TODO: CHANGE THIS TO ENVIRONMENT VARIABLE',
        resave: false,
        saveUninitialized: false,
        cookie: {
          // Serve secure cookies
          secure: app.get('env') === 'production',
        },
      })
    )
    // Add passport as middleware (this more or less only adds the _passport variable to the request)
    app.use(passport.initialize())
    // Add middleware that authenticates request based on the current session state (i.e. we alter the request to contain the hydrated user object instead of only the session ID)
    app.use(passport.session())
  }

  private serializeUser(user: any, done: (err: any, id?: any) => void) {
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
