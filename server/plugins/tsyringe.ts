import 'reflect-metadata' // Needed for tsyringe
import { configure as configureTsyringe } from './../tsyringe.config'

/**
 * This plugin configures the tsyringe dependency injection container.
 */
export default defineNitroPlugin(() => {
  configureTsyringe()
})
