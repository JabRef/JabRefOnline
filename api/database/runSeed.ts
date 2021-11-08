/* eslint-disable no-console */
import { seed } from './seed'

console.log(`Seeding database...`)
try {
  void seed()
} catch (e) {
  console.error(e)
  process.exit(1)
}
