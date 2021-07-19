// Need to be a CommonJS module for now
/* eslint-disable */
// TODO: Renable lint as soon as this file is converted to typescript
const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

// Flip object horizontally or vertically
// Adapted from https://github.com/tailwindlabs/tailwindcss/discussions/2146
const flip = plugin(({ addUtilities, theme, variants }) => {
  const newUtilities = {
    '.flip-horizontal': {
      '--tw-scale-x': '-1',
    },
    '.flip-vertical': {
      '--tw-scale-y': '-1',
    },
  }
  addUtilities(newUtilities, variants('flip'))
})

module.exports = {
  plugins: [require('@tailwindcss/line-clamp'), require('@tailwindcss/forms'), flip],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
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
