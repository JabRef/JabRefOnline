import { Config } from 'tailwindcss'

import forms from '@tailwindcss/forms'
import lineClamp from '@tailwindcss/line-clamp'
import typography from '@tailwindcss/typography'
import colors from 'tailwindcss/colors'
import plugin from 'tailwindcss/plugin'

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
      primary: {
        // Generated with https://www.tailwindshades.com
        DEFAULT: '#4F5F8F',
        '50': '#D6DBE8',
        '100': '#C9CFE1',
        '200': '#AFB8D3',
        '300': '#94A0C4',
        '400': '#7A89B6',
        '500': '#6072A7',
        '600': '#4F5F8F',
        '700': '#3B476B',
        '800': '#272F47',
        '900': '#131723',
      },
      secondary: colors.rose,
      info: colors.black,
      success: colors.green,
      warning: colors.amber,
      error: colors.red,
    },
  },
}
