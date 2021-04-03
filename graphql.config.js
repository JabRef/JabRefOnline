// TODO: Convert this file to typescript as soon as https://github.com/dotansimha/graphql-code-generator/issues/5762 is fixed
// import type { IGraphQLConfig } from 'graphql-config'
// import { Types } from '@graphql-codegen/plugin-helpers'

// const codegen: Types.Config = {
const codegen = {
  overwrite: true,
  schema: 'api/**/*.graphql',
  generates: {
    'api/graphql.ts': {
      config: {
        useIndexSignature: true,
        mapperTypeSuffix: 'Model',
        contextType: './context#Context',
        mappers: {
          User: '@prisma/client/index.d#User',
        },
        scalars: {
          DateTime: 'Date',
        },
      },
      plugins: ['typescript', 'typescript-resolvers'],
    },
    'apollo/graphql.ts': {
      documents: './pages/**/*.vue',
      plugins: ['typescript', 'typescript-operations', 'typescript-vue-apollo'],
    },
  },
}

// const config: IGraphQLConfig = {
const config = {
  schema: ['api/**/*.graphql'],
  extensions: {
    codegen,
  },
}

// export default config
module.exports = config
