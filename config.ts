export const config = {
  redis: {
    port: Number(process.env.REDIS_PORT) || 6380,
    host: process.env.REDIS_HOST || 'localhost',
    password: process.env.REDIS_PASSWORD || 'jabref',
  },
}
