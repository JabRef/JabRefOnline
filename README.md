# JabRefOnline

## Getting started
- Install [Node.js](https://nodejs.org/)
- Install [PostgreSQL](https://www.postgresql.org/)
- Checkout
- Create a `.env` file in the root containing the connection URL for the database, e.g. `DATABASE_URL="postgresql://user:password@localhost:5432/jabref?schema=public"`.
- Run `yarn install`.

## Commands

| Command | Description |
|---------|-------------|
| yarn dev | Start ExpressJS server in development with Nuxt.js in dev mode with hot reloading enabled. Listen on [http://localhost:3000](http://localhost:3000). The GraphQL API is then accessible at [http://localhost:3000/api](http://localhost:3000/api) |
| yarn build | Build the nuxt.js web application for production. |
| yarn start | Start ExpressJS server in production. |
| yarn prisma:studio | Explore data in the database using a visual editor. |

### Workflow for editing the database schema

1. Prototype your new feature by making the necessary changes to `schema.prisma`.
2. Run `yarn prisma:push` to push the changes to the local database.
3. Iterate until feature is ready.
4. Run `yarn prisma:migrate:dev` to generate new migration based on the schema changes.

See [Prisma documentation](https://www.prisma.io/docs/guides/application-lifecycle/prototyping-schema-db-push) for more details.

## Directories

- `api` contains the backend.
- `assets` contains uncompiled assets such as styles, images, or fonts. The content of this folder will be processed by webpack, e.g. CSS has pre-processor applied.
- `components` is where we put all our Vue.js components which are then imported into the pages.
- `layouts` contains the layouts that determine the look and feel. [Nuxt documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).
- `middleware` defines custom functions that are run before rendering either a page or a group of pages. [Nuxt documentation](https://nuxtjs.org/docs/2.x/directory-structure/middleware).
- `pages` contains the application's views and routes. Nuxt reads all the `*.vue` files inside this directory and creates the router of your application. 
- `plugins` contains Javascript plugins that are run before mounting the root Vue.js application. [Nuxt documentation](https://nuxtjs.org/guide/plugins).
- `static` is directly mapped to the server root and contains files that have to keep their names (e.g. robots.txt) or likely won't change (e.g. the favicon). Files in this folder are not processed by webpack.
- `store` contains Vuex Store files. [Nuxt documentation](https://nuxtjs.org/guide/vuex-store).

## Recommended VS Code and Browser extensions
- [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur): Add syntax highlighting and other tooling for Vue. 
- [Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma): Add syntax highlighting, formatting, jump-to-definition and linting for Prisma Schema files. 
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode): Format code and enforces consistent style.
- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig): Override user/workspace VS Code settings with the provided settings in `.editorconfig`.
- [Tailwind CSS](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss): IntelliSense enhancement to support Tailwind.
- [Jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest): Add integration of Jest, e.g. easy debugging of tests.
- Debugger for [Firefox](https://marketplace.visualstudio.com/items?itemName=firefox-devtools.vscode-firefox-debug) or [Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome): Allow debugging web applications from within VS Code. 
- Vue.js devtools: Browser integration for debugging and investigation for [Firefox](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
- Apollo Client Devtools: Debug and analyze GraphQL on the client side for [Firefox](https://addons.mozilla.org/en-US/firefox/addon/apollo-developer-tools/) 

## Technologies used
- [Vue.js](https://vuejs.org/): UI framework [Documentation](https://vuejs.org/v2/guide/)
- [NuxtJS](https://nuxtjs.org/): Vue framework [Documentation](https://nuxtjs.org/docs/2.x/get-started/installation)
- [Prisma](https://www.prisma.io/): [Documentation](https://www.prisma.io/docs/)
- Graphql:
   - [GraphQL code generator](https://graphql-code-generator.com/): [Documentation](https://graphql-code-generator.com/docs/getting-started/index)
   - [Vue Apollo](https://apollo.vuejs.org/): Graphql integration for Vue [Documentation](https://v4.apollo.vuejs.org/guide-option/)
- [Tailwind CSS](https://tailwindcss.com/): CSS framework [Documentation](https://tailwindcss.com/docs), including [Vue Tailwind](https://www.vue-tailwind.com/docs/installation) to extract reusable components 
- [Font Awesome](https://fontawesome.com/icons?d=gallery&p=2): Font-based icons

## References
- Prisma used in different contexts: https://github.com/prisma/prisma-examples
- Example application using Prisma and Apollo: https://github.com/poulainv/tottem
- Example application using Nuxt: https://github.com/gyarasu/nuxt-full-stack-template
- Example application for authentication using GraphQL Shield and Prisma: https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql-auth
- Example server using Prisma and GraphQL: https://github.com/prisma-labs/graphql-prisma-typescript
- Example application for vue-apollo: https://github.com/Akryum/vue-apollo-todos
- Best practices: [Node](https://github.com/goldbergyoni/nodebestpractices)
