// Provide custom type information for page metadata
// As described at https://v3.nuxtjs.org/guide/directory-structure/pages#typing-custom-metadata
declare module '#app' {
  interface PageMeta {
    requiresAuth?: boolean
  }
}

// It is always important to ensure you import/export something when augmenting a type
export {}
