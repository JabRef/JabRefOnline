import { join } from 'path'
import { Module } from '@nuxt/types'

const apolloVue: Module = function (_moduleOptions) {
    this.addPlugin({
        src: join(__dirname, '../apollo/client.js'),
        fileName: 'apollo-module.js',
    })
}
export default apolloVue
