import { Config } from 'tailwindcss'

import forms from '@tailwindcss/forms'
import colors from 'tailwindcss/colors'
import plugin from 'tailwindcss/plugin'
// @ts-ignore: has no type info
import lineClamp from '@tailwindcss/line-clamp'
// @ts-ignore: has no type info
import typography from '@tailwindcss/typography'

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

export default <Config>{
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
