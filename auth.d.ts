declare module '#auth-utils' {
  /**
   * The public information about a user stored in the session
   */
  interface User {
    id: string
  }

  /**
   * The public information about the current session
   */
  interface UserSession {
    /**
     * The secure data associated with the session, only accessible on the server
     */
    server: ServerSessionData
  }

  /**
   * Private information about the current session, only accessible on the server
   * (exposed in an encrypted form to the client)
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface SecureSessionData {}

  /**
   * The data stored for the session on the server
   */
  interface ServerSessionData {
    lastActive: Date
  }
}

export {}
