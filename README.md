# JabRefOnline

## Servers
- Production server: https://mango-pebble-0224c3803.1.azurestaticapps.net
  This server runs the last released version with data provided by the production database.
- Staging server: https://mango-pebble-0224c3803-staging.westeurope.1.azurestaticapps.net
  This server runs the latest version of the main branch with data provided by the production database.
  Usually, you do not want to target this server. Its main purpose is to test the main branch before a release.
- Test server: https://mango-pebble-0224c3803-dev.westeurope.1.azurestaticapps.net
  This server runs the latest version of the main branch with test data that is usually reset on redeployment.
  The main use of this server is for developers to test the latest version against their application without the fear to delete user data.
  In particular, you can log in using `alice@jabref.de / EBNPXY35TYkYXHs`.
- PR previews:
  Every pull request is deployed to a (temporary) server, which uses the same test data as the "Test server".

## Getting started
The simplest way to start is by [opening this project in Gitpod](https://gitpod.io/#https://github.com/JabRef/JabRefOnline/).

- Install [Node.js](https://nodejs.org/)
- Install [PostgreSQL](https://www.postgresql.org/)
- Checkout
- Create a `.env` file in the root containing the connection URL for the database, e.g. `DATABASE_URL="postgresql://user:password@localhost:5432/jabref?schema=public"`.
- Optional: Install and start [Redis](https://redis.io/).
  Perhaps the most straightforward way to do this is via Docker: `yarn docker:redis`.
  If you do not use this command, make sure that Redis is available through the port `6380` or, alternatively, add the configuration `REDIS_PORT=<your port>` to the `.env` file. 
- Run `yarn install` to install all dependencies.
- Run `yarn prisma:migrate:dev` to initialize the database. You may also want to use `yarn prisma:seed` to fill the database with some initial test data.

Now you can start the server by using `yarn dev`.

If you use Visual Studio Code, you might also want to activate automatic tasks which would then be run whenever you open the project and run the usual commands to get you running in no time.
For this, open the command palette (Shift + Cmd + P) and choose "Tasks: Manage Automatic Tasks in Folder".
Then accept "Allow Automatic Tasks in Folder".
Now close and re-open the workspace. 

## Commands

| Command | Description |
|---------|-------------|
| yarn install | Install project dependencies and generate code. |
| yarn dev | Start ExpressJS server in development with Nuxt.js in dev mode with hot reloading enabled. Listen on [http://localhost:3000](http://localhost:3000). The GraphQL API is then accessible at [http://localhost:3000/api](http://localhost:3000/api) |
| yarn test | Execute all tests. Pass `-u` to update all Jest snapshots.|
| yarn build | Build the nuxt.js web application for production. |
| yarn start | Start ExpressJS server (for testing purposes). |
| yarn prisma:studio | Explore data in the database using a visual editor. |
| yarn storybook | Start [Storybook](#ui-workflow-storybook) in your browser. |


### Workflow for editing the database schema

1. Prototype your new feature by making the necessary changes to `schema.prisma`.
2. Run `yarn prisma:push` to push the changes to the local database.
3. Iterate until feature is ready.
4. Run `yarn prisma:migrate:dev` to generate new migration based on the schema changes.

See [Prisma documentation](https://www.prisma.io/docs/guides/application-lifecycle/prototyping-schema-db-push) for more details.

### UI workflow: Storybook
As the primary UI development flow, we use Storybook which allows developing UI components in isolation without the need to start the whole application.
Storybook uses so-called stories.
Each story represents a single visual state of a component.
For each component its stories should be placed in the same directory, with the suffix `.stories.ts` appended.
For example, 
```
components
│   Button.vue
│   Button.stories.ts
```
To start developing with Storybook, simply run `yarn storybook`, which opens Storybook in the browser.

An up-to-date version of all Storybook components can be found [online](https://www.chromatic.com/library?appId=61142988527d34003b1e783d&branch=main).

## Backend: Overall Structure
- `Resolver` aggregates the data, and transforms in a representation suitable for the domain layer.
- `Service` performs input validation, authorization, sorting, and implements the business logic.
- Data layer is handled by Prisma.  

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
- [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar): Add syntax highlighting and other tooling for Vue. It is also recommended to activate the [takeover mode](https://vuejs.org/guide/typescript/overview.html#takeover-mode).
- [Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma): Add syntax highlighting, formatting, jump-to-definition and linting for Prisma Schema files. 
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode): Format code and enforces consistent style.
- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig): Override user/workspace VS Code settings with the provided settings in `.editorconfig`.
- [Tailwind CSS](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss): IntelliSense enhancement to support Tailwind.
- [Jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest): Add integration of Jest, e.g. easy debugging of tests.
- [GraphQL](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql): Add syntax highlighting and IntelliSense for GraphQL.
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
- [Storybook](https://storybook.js.org/): Visual testing

## Conventions
- Vue: Single File Components are used for all components, with a PascalCase name.
- Tests are placed next to the file containing the code-under-test, and have the same file name with a `.spec.ts` suffix added.
  For example, 
  ```
  api
  │   Resolver.ts
  │   Resolver.spec.ts
  ```

## References
- Prisma used in different contexts: https://github.com/prisma/prisma-examples
- Example application using Prisma and Apollo: https://github.com/poulainv/tottem
- Example application using Nuxt: https://github.com/gyarasu/nuxt-full-stack-template
- Example application for authentication using GraphQL Shield and Prisma: https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql-auth
- Example server using Prisma and GraphQL: https://github.com/prisma-labs/graphql-prisma-typescript
- Example application for vue-apollo: https://github.com/Akryum/vue-apollo-todos
- Example application using a similar stack as we (GraphQL, Vue): https://github.com/Akryum/guijs/tree/master/packages/@guijs
- Best practices: [Node](https://github.com/goldbergyoni/nodebestpractices)

## Sponsors
Thanks to [Chromatic](https://www.chromatic.com/) for providing the visual testing platform that helps us review UI changes and catch visual regressions.
