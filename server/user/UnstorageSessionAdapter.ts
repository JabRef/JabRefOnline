import type { PrismaClient } from '@prisma/client'
import { type Adapter, type DatabaseSession, type DatabaseUser } from 'lucia'
import type { Storage } from 'unstorage'
import { prefixStorage } from 'unstorage'

export class UnstorageSessionAdapter implements Adapter {
  sessionStorage: Storage<DatabaseSession>
  userSessionStorage: Storage<string[]>
  constructor(
    storage: Storage,
    private userAdapter: UserAdapter,
  ) {
    this.sessionStorage = prefixStorage<DatabaseSession>(storage, 'session')
    this.userSessionStorage = prefixStorage<string[]>(storage, 'user-session')
  }

  async getUserSessions(userId: string): Promise<DatabaseSession[]> {
    const sessionIds = await this.userSessionStorage.getItem(userId)
    if (!sessionIds) {
      return []
    }
    const sessions = await Promise.all(
      sessionIds.map((id) => this.sessionStorage.getItem(id)),
    )
    return sessions.filter(
      (session): session is DatabaseSession => session !== null,
    )
  }

  async setSession(session: DatabaseSession): Promise<void> {
    const ttl = calculateExpiration(session.expiresAt)
    await this.sessionStorage.setItem(session.id, session, { ttl })
    await this.userSessionStorage.setItem(
      session.userId,
      ((await this.userSessionStorage.getItem(session.userId)) ?? []).concat(
        session.id,
      ),
      // We assume that all sessions have the same expiration time,
      // so we can simply let the session-user connection expire at the same time as the session
      { ttl },
    )
  }

  async updateSessionExpiration(
    sessionId: string,
    expiresAt: Date,
  ): Promise<void> {
    const session = await this.sessionStorage.getItem(sessionId)
    if (!session) {
      throw new Error('Session not found')
    }
    await this.sessionStorage.setItem(
      sessionId,
      {
        ...session,
        expiresAt,
      },
      { ttl: calculateExpiration(expiresAt) },
    )
  }

  async deleteSession(sessionId: string): Promise<void> {
    const session = await this.sessionStorage.getItem(sessionId)
    if (!session) {
      return
    }
    await this.sessionStorage.removeItem(sessionId)
    const sessionIds = await this.userSessionStorage.getItem(session.userId)
    if (!sessionIds) {
      return
    }
    await this.userSessionStorage.setItem(
      session.userId,
      sessionIds.filter((id) => id !== sessionId),
    )
  }

  async deleteUserSessions(userId: string): Promise<void> {
    const sessionIds = await this.userSessionStorage.getItem(userId)
    if (!sessionIds) {
      return
    }
    await Promise.all(
      sessionIds.map((id) => this.sessionStorage.removeItem(id)),
    )
    await this.userSessionStorage.removeItem(userId)
  }

  deleteExpiredSessions(): Promise<void> {
    throw new Error(
      'Method not implemented, sessions are deleted automatically',
    )
  }

  async getSessionAndUser(
    sessionId: string,
  ): Promise<[session: DatabaseSession | null, user: DatabaseUser | null]> {
    const session = await this.sessionStorage.getItem(sessionId)
    if (!session) {
      return [null, null]
    }
    const user = await this.userAdapter.getUserById(session.userId)
    if (!user) {
      return [session, null]
    }
    return [session, { attributes: { ...user }, id: user.id }]
  }
}
export function calculateExpiration(expiresAt: Date) {
  return Math.floor((expiresAt.getTime() - Date.now()) / 1000)
}
export class UserAdapter {
  constructor(private prisma: PrismaClient) {}

  async getUserById(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    })
  }
}
