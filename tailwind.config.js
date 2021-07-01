// Need to be a CommonJS module for now
/* eslint-disable */
// TODO: Renable lint as soon as this file is converted to typescript
const colors = require('tailwindcss/colors')

module.exports = {
  plugins: [require('@tailwindcss/line-clamp'), require('@tailwindcss/forms')],
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
