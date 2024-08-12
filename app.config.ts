import theme from '#tailwind-config/theme.mjs'

export default defineAppConfig({
  naiveui: {
    themeConfig: {
      shared: {
        common: {
          fontFamily: theme.fontFamily.sans.join(', '),
          lineHeight: theme.lineHeight.normal,
        },
      },
      light: {
        common: {
          primaryColor: theme.colors.primary[500],
          primaryColorHover: theme.colors.primary[600],
          primaryColorPressed: theme.colors.primary[700],
          primaryColorSuppl: theme.colors.primary[600],
        },
      },
      dark: {
        common: {
          primaryColor: theme.colors.primary[500],
          primaryColorHover: theme.colors.primary[400],
          primaryColorPressed: theme.colors.primary[600],
        },
      },
    },
  },
})
