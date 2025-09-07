// ESM-compatible exports for Prisma Client
// TODO: Once network restrictions are resolved, switch back to generated ESM client

// Use dynamic import to properly handle CommonJS
import PrismaModule from '@prisma/client'

// Extract the exports we need
const { 
  PrismaClient, 
  Prisma, 
  ContributorRole,
  EntityType,
  GroupType,
  GroupHierarchyType
} = PrismaModule

// Export the commonly used types and classes
export { 
  PrismaClient, 
  Prisma,
  ContributorRole,
  EntityType,
  GroupType,
  GroupHierarchyType
}

// For any other types, re-export the entire module
export default PrismaModule
