module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['unused-imports'],
  rules: {
    // Workaround for bug https://github.com/nuxt/eslint-config/issues/147
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-ignore': 'allow-with-description',
      },
    ],
    // Report unused imports
    'unused-imports/no-unused-imports': 'error',
    // Report unused variables (except the ones prefixed with an underscore)
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  overrides: [
    {
      files: ['*.graphql'],
      parser: '@graphql-eslint/eslint-plugin',
      parserOptions: {
        operations: ['./middleware/**/*.graphql'],
      },
      plugins: ['@graphql-eslint'],
      rules: {
        // Workaround for for bug in prettier, can be removed after https://github.com/prettier/eslint-plugin-prettier/pull/413
        'prettier/prettier': [
          2,
          {
            parser: 'graphql',
          },
        ],
        // Make sure to not prefix id names with typename, i.e. 'id' instead of 'userId'.
        '@graphql-eslint/avoid-typename-prefix': 'error',
        // Requires all types to be reachable at some level by root level fields.
        '@graphql-eslint/no-unreachable-types': 'error',
        // Enforces that deprecated fields or enum values are not in use by operations.
        // TODO: Set this to error once we follow this convention
        '@graphql-eslint/no-deprecated': 'warn',
        // Enforces unique fragment name.
        '@graphql-eslint/unique-fragment-name': 'error',
        // Enforces unique operation names.
        // TODO: Does not work yet
        // '@graphql-eslint/unique-operation-name': 'error',
        // Requires to use """ or " for adding a GraphQL description instead of #.
        // TODO: Does not work yet, so set to warn
        '@graphql-eslint/no-hashtag-description': 'warn',
        // Requires sname for your GraphQL operations.
        '@graphql-eslint/no-anonymous-operations': 'error',
        // Make sure to not add the operation type to the name of the operation, e.g. 'user' instead of 'userQuery'.
        '@graphql-eslint/no-operation-name-suffix': 'error',
        // Requires all deprecation directives to specify a reason
        '@graphql-eslint/require-deprecation-reason': ['error'],
        // Enforces descriptions in your type definitions
        '@graphql-eslint/require-description': [
          'warn',
          { on: ['ObjectTypeDefinition', 'FieldDefinition'] },
        ],
        // Checks for duplicate fields in selection set, variables in operation definition, or in arguments set of a field.
        '@graphql-eslint/avoid-duplicate-fields': ['error'],
        // Requires mutation argument to be always called "input" and input type to be called Mutation name + "Input".
        // TODO: Set this to error once we follow this convention
        '@graphql-eslint/input-name': ['warn', { checkInputType: true }],
      },
    },
    {
      files: ['*.tsx', '*.ts', '*.jsx', '*.js'],
      processor: '@graphql-eslint/graphql',
      rules: {
        // Workaround for for bug in prettier, can be removed after https://github.com/prettier/eslint-plugin-prettier/pull/415
        'prettier/prettier': 0,
      },
    },
  ],
}
