import { Resolvers } from './graphql'
import { queryUserByID, userResolver, getCurrentUser, logoutCurrentUser, login, signup } from './user/resolvers'

const resolvers: Resolvers = {
  Query: {
    user: queryUserByID,
    currentUser: getCurrentUser
  },

  Mutation: {
    logout: logoutCurrentUser,
    login,
    signup
  },

  User: userResolver
}

export default resolvers
