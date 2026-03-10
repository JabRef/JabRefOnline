export default defineAppConfig({
  /**
   * Nuxt UI configuration
   * https://ui.nuxt.com/docs/getting-started/theme/components#global-config
   * https://ui.nuxt.com/docs/getting-started/theme/design-system#runtime-configuration
   */
  ui: {
    // Colors are defined in assets\css\main.css
    // Map to actual Tailwind color names so that Nuxt UI generates the full color palette.
    // Custom color shades (like --color-success-*) are only generated for referenced utility
    // classes, but standard Tailwind colors (green, red, etc.) are always available.
    colors: {
      primary: 'primary',
      secondary: 'rose',
      success: 'green',
      info: 'sky',
      warning: 'amber',
      error: 'red',
      neutral: 'neutral',
    },
  },
})
