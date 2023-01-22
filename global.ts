const myGlobal = globalThis
// TODO: Activate if ssr: true
// const dom = new JSDOM()
// myGlobal.window = dom.window as any as Window & typeof globalThis
// myGlobal.document = dom.window.document
// myGlobal.location = dom.window.location
// Needed for storybook
// @ts-expect-error: this is a workaround
myGlobal.PREVIEW_URL = '_storybook/external-iframe'
export default myGlobal
export const window = myGlobal
