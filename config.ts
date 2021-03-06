export const config = {
  redis: {
    port: Number(process.env.REDIS_PORT) || 6380,
    host: process.env.REDIS_HOST || 'localhost',
    password: process.env.REDIS_PASSWORD || 'jabref',
  },
  session: {
    primarySecret: process.env.SESSION_SECRET_PRIMARY || 'session_secret',
    secondarySecret: process.env.SESSION_SECRET_SECONDARY || 'session_secret',
  },
}
