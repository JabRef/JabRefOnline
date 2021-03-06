import { Resolvers } from './graphql'
import { queryUserByID, userResolver } from './user/resolvers'

const resolvers: Resolvers = {
  Query: {
    user: queryUserByID
  },

  User: userResolver
}

export default resolvers
