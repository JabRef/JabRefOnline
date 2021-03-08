import { Express } from 'express-serve-static-core'
import passport from 'passport'
import AuthService from './auth.service'
import LocalStrategy from './local.strategy'

export default class PassportInitializer {
  constructor (private readonly accountService: AuthService) {}

  initialize (): void {
    passport.use(new LocalStrategy(this.accountService))
    passport.serializeUser(this.serializeUser)
    passport.deserializeUser(this.deserializeUser)
  }

  install (app: Express): void {
    app.use(passport.initialize())
    app.use(passport.session())
  }

  private serializeUser (user: any, done: (err: any, id?: any) => void) {
    done(null, user.id)
  }

  private async deserializeUser (id: string, done: (err: any, user?: any) => void) {
    const user = await this.accountService.getUserById(id)
    if (user === undefined) {
      done('account doesn\'t exist', undefined)
    } else {
      done(null, user)
    }
  }
}
