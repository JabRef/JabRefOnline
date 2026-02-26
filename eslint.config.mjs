// @ts-check
import graphqlPlugin from '@graphql-eslint/eslint-plugin'
import vitest from '@vitest/eslint-plugin'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import oxlint from 'eslint-plugin-oxlint'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  languageOptions: {
    parserOptions: {
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
  // Activate ts rules only for ts files, otherwise they also apply to graphql -- which the parser doesn't understand
  .override('nuxt/vue/setup', {
    files: ['**/*.{vue,ts}'],
  })
  .override('nuxt/typescript/setup', {
    files: ['**/*.{vue,ts}'],
  })
  .prepend(
    // Activate ts rules that require type information
    // https://github.com/vuejs/eslint-config-typescript
    // https://typescript-eslint.io/getting-started/typed-linting
    // @ts-expect-error: @vue/eslint-config-typescript has problems with the type
    defineConfigWithVueTs(vueTsConfigs.stylisticTypeChecked, vueTsConfigs.strictTypeChecked).map(
      (config) => ({
        ...config,
        // Activate ts rules only for ts files, otherwise they also apply to graphql -- which the parser doesn't understand
        files: ['**/*.ts'],
      }),
    ),
  )
  .append({
    // TS-specific rules
    files: ['**/*.ts'],
    rules: {
      // Allow any type (for now)
      '@typescript-eslint/no-explicit-any': 'warn',
      // TODO: Remove this once all errors are fixed
      '@typescript-eslint/no-unsafe-call': 'warn',
      // TODO: Remove this once all errors are fixed
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      // TODO: Remove this once all errors are fixed
      '@typescript-eslint/no-unsafe-argument': 'warn',
      // TODO: Remove this once all errors are fixed
      '@typescript-eslint/no-unsafe-return': 'warn',
      // TODO: Remove this once all errors are fixed
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      // TODO: Remove this once all errors are fixed
      '@typescript-eslint/no-redundant-type-constituents': 'warn',
      // Allow numbers in templates without explicit casting
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
      // Use { type xyz } instead of type { xyz } for imports
      // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/consistent-type-specifier-style.md
      // Disabled due to https://github.com/import-js/eslint-plugin-import/issues/2675
      'import/consistent-type-specifier-style': 'off',
      // Don't allow duplicate imports
      // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-duplicates.md
      'import/no-duplicates': [
        'error',
        {
          'prefer-inline': true,
        },
      ],
    },
  })
  .append([
    // Enable graphql-specific rules
    // https://the-guild.dev/graphql/eslint/docs
    {
      files: ['**/*.{js,ts}'],
      processor: graphqlPlugin.processor,
    },
    {
      files: ['**/*.graphql'],
      languageOptions: {
        parser: graphqlPlugin.parser,
      },
      plugins: {
        // @ts-expect-error: graphqlPlugin is not typed correctly
        '@graphql-eslint': graphqlPlugin,
      },
    },
    {
      files: ['server/**/*.graphql'],
      rules: {
        ...graphqlPlugin.configs['flat/schema-recommended'].rules,
        // Having an id for a type makes sense (for caching), but the rule is too strict in some cases
        '@graphql-eslint/strict-id-in-types': 'warn',
        // Make sure that mutations returns not a scalar type (best practice: have special return type for each mutation)
        '@graphql-eslint/no-scalar-result-type-on-mutation': 'error',
        // Enforces descriptions in your type definitions (reduce to warn since there are too many issues right now)
        '@graphql-eslint/require-description': [
          'warn',
          {
            types: true,
            FieldDefinition: true,
            ObjectTypeDefinition: true,
            DirectiveDefinition: true,
          },
        ],
        // Requires mutation argument to be always called "input" and input type to be called Mutation name + "Input".
        '@graphql-eslint/input-name': [
          'error',
          {
            checkInputType: true,
            // Types name should be pascal case, but mutation names be camel case
            caseSensitiveInputType: false,
          },
        ],
      },
    },
    {
      files: ['{pages,test}/**/*.graphql'],
      rules: graphqlPlugin.configs['flat/operations-recommended'].rules,
    },
  ])
  .append({
    files: ['layouts/**/*.vue', 'pages/**/*.vue'],
    rules: {
      // Layouts and pages cannot be confused with HTML components as they are used differently, so no need to worry about single-word names
      'vue/multi-word-component-names': 'off',
    },
  })
  .append({
    rules: {
      // Ensure void operator is not used, except for variable assignment or function return (might be handy for promises)
      'no-void': ['error', { allowAsStatement: true }],
      // Disallow the use of `console`
      'no-console': 'error',
    },
  })
  .append({
    files: ['**/*.vue'],
    rules: {
      // Conflicts with prettier
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'any',
          },
        },
      ],
    },
  })
  // @ts-expect-error: eslint-vitest has problems with the type: https://github.com/vitest-dev/eslint-plugin-vitest/issues/814
  .append({
    // Test files
    // https://github.com/vitest-dev/eslint-plugin-vitest
    files: ['**/*.test.ts', '**/*.spec.ts'],
    ...vitest.configs.recommended,
    rules: {
      // Disable typescript rule for unbound methods (false positives in spies/mocks)
      // TODO: Should enable special rule for vitest once this is implemented
      // https://github.com/veritem/eslint-plugin-vitest/issues/2
      '@typescript-eslint/unbound-method': 'off',
      // Test title must be lowercase
      'vitest/prefer-lowercase-title': 'error',
    },
  })
  .append(
    // Disable eslint rules that are covered by oxlint (should be the last config)
    // https://github.com/oxc-project/eslint-plugin-oxlint
    oxlint.configs['flat/recommended'],
  )
