module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  plugins: [
  ],
  rules: {
    // Workaround for bug https://github.com/nuxt/eslint-config/issues/147
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error'
  }
}
