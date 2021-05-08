import type { IGraphQLConfig } from 'graphql-config'
import { Types } from '@graphql-codegen/plugin-helpers'

const codegen: Types.Config = {
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
          Group: './groups/resolvers#GroupMaybeResolved',
        },
        scalars: {
          DateTime: 'Date',
        },
      },
      plugins: ['typescript', 'typescript-resolvers'],
    },
    'apollo/graphql.ts': {
      documents: ['./pages/**/*.vue', './components/**/*.vue'],
      plugins: ['typescript', 'typescript-operations', 'typescript-vue-apollo'],
    },
  },
}

const config: IGraphQLConfig = {
  schema: ['api/**/*.graphql'],
  extensions: {
    codegen,
  },
}

export default config
