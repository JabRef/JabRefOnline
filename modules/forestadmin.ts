import { createAgent } from '@forestadmin/agent'
import { createSqlDataSource } from '@forestadmin/datasource-sql'
import Router from '@koa/router'
import { addDevServerHandler, defineNuxtModule, useLogger } from '@nuxt/kit'
import Koa from 'koa'
// import { Environment } from '~/config'
// import { useRuntimeConfig } from '#internal/nitro'
import { RuntimeConfig } from '@nuxt/schema'
import { defineEventHandler, EventHandler } from 'h3'
type KoaHandler = ReturnType<Koa['callback']>

async function startForestAdminServer(config: RuntimeConfig) {
  const logger = useLogger('forestadmin')
  // Create your Forest Admin agent
  const agent = createAgent({
    // These process.env variables should be provided in the onboarding
    authSecret: config.forestAdmin.authSecret, // 'd6746eed59164eff30872857ff703043a65da3f4a56986d6', // process.env.FOREST_AUTH_SECRET,
    envSecret: config.forestAdmin.envSecret, // 'a4e47c2af50f0ca42d01b5d5bea6bccddf2f4a1b3f7a3ee56ba17d3c556aabfe', // process.env.FOREST_ENV_SECRET,
    isProduction: config.public.environment === 'Production',
    prefix: '_admin/forest',
    // loggerLevel: 'Debug',
  }).addDataSource(createSqlDataSource(config.databaseUrl))

  const handlerPromise = new Promise<KoaHandler>((resolve) => {
    // @ts-expect-error: agent.onStart is private
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    agent.onStart.push((driverRouter) => {
      const router = new Router({ prefix: '/forest' }).use(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        driverRouter.routes()
      )
      logger.debug('Routes', router)
      resolve(new Koa().use(router.routes()).callback())
    })
  }).then((handler) => {
    logger.debug('handler started')
    return defineEventHandler((event) => {
      const { req, res } = event.node
      return handler(req, res)
    })
  })
  logger.debug(agent)

  return Promise.all([
    agent.start().then((_agent) => logger.debug('Agent started')),
    handlerPromise,
  ])
    .then(([, handler]) => {
      logger.debug('Agent and handler started')
      return handler
    })
    .catch((err) => logger.error(err))
}

export default defineNuxtModule({
  setup(_moduleOptions, nuxt) {
    const promiseHandler = new Promise<EventHandler<unknown>>(
      (resolve, reject) => {
        nuxt.hook('listen', async (_, _listener) => {
          const handler = await startForestAdminServer(
            nuxt.options.runtimeConfig
          )
          if (handler) {
            resolve(handler)
          } else {
            reject(new Error('Failed to start forest admin server'))
          }
        })
      }
    )
    /* nuxt.options.runtimeConfig.forestAdmin = {
      handler: promiseHandler,
    } */
    addDevServerHandler({
      route: '/_admin',
      handler: defineEventHandler(async (event) => {
        return (await promiseHandler)(event)
      }),
    })
  },
})
