/* export default defineEventHandler((event) => {
  console.log(event.req.url)
}) */

import { createAgent } from '@forestadmin/agent'
import { createSqlDataSource } from '@forestadmin/datasource-sql'
import Koa from 'koa'
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
    loggerLevel: 'Debug',
  }).addDataSource(createSqlDataSource(process.env.DATABASE_URL))
  let handler = null

  agent.onStart.push(async (driverRouter) => {
    const router = driverRouter

    /*
    if (nested) {
      router = new Router({ prefix: agent.completeMountPrefix }).use(router.routes());
    } */
    console.log(router.routes())

    handler = new Koa().use(router.routes()).callback()
  })
  console.log(agent)

  try {
    await agent.start()
  } catch (ex) {
    console.log(ex)
  }

  return defineEventHandler((event) => {
    const { req, res } = event.node
    console.log(req.url)
    if (handler) {
      handler(req, res)
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'Agent is not started' }))
    }
  })
  // return toEventHandler(callback)
})
