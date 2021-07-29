// TODO: Convert this to typescript as soon as https://github.com/EndemolShineGroup/cosmiconfig-typescript-loader/pull/156 is merged, and used everywhere (in particular, in graphql-config and vscode extension)

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
          Document: './documents/user.document.service#UserDocument',
          Article: './documents/user.document.service#UserDocument',
          InProceedings: './documents/user.document.service#UserDocument',
          PhdThesis: './documents/user.document.service#UserDocument',
          Unknown: './documents/user.document.service#UserDocument',
          Group: './groups/resolvers#GroupMaybeResolved',
        },
        scalars: {
          DateTime: 'Date',
          EmailAddress: 'string',
        },
      },
      plugins: ['typescript', 'typescript-resolvers'],
    },
    'apollo/graphql.ts': {
      documents: [
        './pages/**/*.vue',
        './components/**/*.vue',
        './middleware/**/*.*',
      ],
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
      config: {
        scalars: {
          DateTime: 'Date',
          EmailAddress: 'string',
        },
      },
    },
    // Generate supertype-subtype relationships, needed for client-side caching
    'apollo/introspection.ts': {
      plugins: ['fragment-matcher'],
    },
  },
}

// const config: IGraphQLConfig = {
const config = {
  schema: 'api/**/*.graphql',
  extensions: {
    codegen,
  },
}

// export default config
module.exports = config
