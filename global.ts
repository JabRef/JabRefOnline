import { JSDOM } from 'jsdom'

const myGlobal = globalThis
const dom = new JSDOM()
myGlobal.window = dom.window
myGlobal.document = dom.window.document
myGlobal.location = dom.window.location
// Needed for storybook
myGlobal.PREVIEW_URL = '_storybook/external-iframe'
export default myGlobal
export const window = myGlobal
