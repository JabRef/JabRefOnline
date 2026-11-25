import { UApp } from '#components'
import { withThemeByClassName } from '@storybook/addon-themes'
import { h, type Component } from 'vue'
import { allModes } from './modes'

export default {
  tags: ['autodocs'],
  decorators: [
    // Wraps every story in UApp (needed for tooltips, toasts etc)
    (story: () => Component) => ({
      render: () => h(UApp, () => h(story())),
    }),
    // Adds a light/dark switch to the toolbar
    withThemeByClassName({
      themes: { light: '', dark: 'dark' },
      defaultTheme: 'light',
    }),
  ],
  parameters: {
    chromatic: {
      // Snapshot every story in light and dark mode
      modes: {
        light: allModes.light,
        dark: allModes.dark,
      },
    },
  },
}
