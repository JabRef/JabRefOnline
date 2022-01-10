module.exports = {
  apps: [
    {
      name: 'JabRefOnline',
      // https://pm2.keymetrics.io/docs/usage/cluster-mode/
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
    },
  ],
}
