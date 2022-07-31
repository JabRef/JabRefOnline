import 'reflect-metadata' // Needed for tsyringe
import { configure as configureTsyringe } from './../tsyringe.config'
import { resolve } from './../tsyringe'

export default defineLazyEventHandler(async () => {
  await configureTsyringe()

  const passportInitializer = resolve('PassportInitializer')
  passportInitializer.initialize()
  return passportInitializer.createHandler()
})
