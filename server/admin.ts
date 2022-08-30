/* export default defineEventHandler((event) => {
  console.log(event.req.url)
}) */

import { createAgent } from '@forestadmin/agent'
import { createSqlDataSource } from '@forestadmin/datasource-sql'
import { Environment } from '~/config'

export default defineLazyEventHandler(async () => {
  const config = useRuntimeConfig()
  // Create your Forest Admin agent
  const agent = createAgent({
    // These process.env variables should be provided in the onboarding
    authSecret: 'd6746eed59164eff30872857ff703043a65da3f4a56986d6', // process.env.FOREST_AUTH_SECRET,
    agentUrl: 'http://localhost:3000/_admin/', // process.env.FOREST_AGENT_URL,
    envSecret:
      'a4e47c2af50f0ca42d01b5d5bea6bccddf2f4a1b3f7a3ee56ba17d3c556aabfe', // process.env.FOREST_ENV_SECRET,
    isProduction: config.public.environment === Environment.Production,
    prefix: '_admin',
  }).addDataSource(createSqlDataSource(process.env.DATABASE_URL))
  const callback = agent.getConnectCallback(true)
  await agent.start()

  /*return defineEventHandler((event) => {
    console.log(event.req.url)
  })*/
  return toEventHandler(callback)
})
