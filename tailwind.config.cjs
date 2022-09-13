// This needs to be a cjs instead of typescript file for now because of
// https://github.com/tailwindlabs/tailwindcss/pull/7327
/* eslint-disable @typescript-eslint/no-var-requires */
// const { Config } = require('tailwindcss')
const forms = require('@tailwindcss/forms')
const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')
// @ts-ignore: has no type info;
const lineClamp = require('@tailwindcss/line-clamp')
const typography = require('@tailwindcss/typography')

// Flip object horizontally or vertically
// Adapted from https://github.com/tailwindlabs/tailwindcss/discussions/2146
const flip = plugin(({ addUtilities }) => {
  addUtilities({
    '.flip-horizontal': {
      '--tw-scale-x': '-1',
    },
    '.flip-vertical': {
      '--tw-scale-y': '-1',
    },
  })
})

// export default <Config>{
module.exports = {
  content: [`components/**/*.{vue,js}`, `layouts/**/*.vue`, `pages/**/*.vue`],
  plugins: [lineClamp, forms, flip, typography],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.neutral,
      primary: colors.indigo,
      secondary: colors.rose,
      highlight: colors.indigo,
      info: colors.black,
      success: colors.green,
      warning: colors.amber,
      error: colors.red,
    },
  },
}
