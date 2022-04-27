import { JSDOM } from 'jsdom'

const myGlobal = globalThis
const dom = new JSDOM()
myGlobal.window = dom.window as any as Window & typeof globalThis
myGlobal.document = dom.window.document
myGlobal.location = dom.window.location
// Needed for storybook
// @ts-ignore -- this is a workaround
myGlobal.PREVIEW_URL = '_storybook/external-iframe'
export default myGlobal
export const window = myGlobal
