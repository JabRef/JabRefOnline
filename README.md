# JabRefOnline

## Getting started
- Install [Node.js](https://nodejs.org/)
- Checkout
- Run `yarn install`

## Commands

| Command | Description |
|---------|-------------|
| yarn dev | Start ExpressJS server in development with Nuxt.js in dev mode with hot reloading enabled. Listen on [http://localhost:3000](http://localhost:3000). |
| yarn build | Build the nuxt.js web application for production. |
| yarn start | Start ExpressJS server in production. |


## Directories

`api`
- `assets` contains uncompiled assets such as styles, images, or fonts.
- `components` is where we put all our Vue.js components which are then imported into the pages.
- `layouts` contains the layouts that determine the look and feel. [Nuxt documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).
- `middleware` defines custom functions that are run before rendering either a page or a group of pages. [Nuxt documentation](https://nuxtjs.org/docs/2.x/directory-structure/middleware).
- `pages` contains the application's views and routes. Nuxt reads all the `*.vue` files inside this directory and creates the router of your application. 
- `plugins` contains Javascript plugins that are run before mounting the root Vue.js application. [Nuxt documentation](https://nuxtjs.org/guide/plugins).
- `static` is directly mapped to the server root and contains files that have to keep their names (e.g. robots.txt) or likely won't change (e.g. the favicon).
- `store` contains Vuex Store files. [Nuxt documentation](https://nuxtjs.org/guide/vuex-store).

