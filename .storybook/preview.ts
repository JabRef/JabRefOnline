import { withThemeByClassName } from '@storybook/addon-themes'
import { allModes } from './modes'

export default {
  tags: ['autodocs'],
  decorators: [
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
