import 'reflect-metadata' // Needed for tsyringe
import { resolve } from './../tsyringe'
import { configure as configureTsyringe } from './../tsyringe.config'

export default defineLazyEventHandler(async () => {
  await configureTsyringe()

  const passportInitializer = resolve('PassportInitializer')
  passportInitializer.initialize()
  return passportInitializer.createHandler()
})
