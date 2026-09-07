---
name: jabref-nuxt-structure
description: Use when changing JabRef Online Nuxt pages, Vue components, composables, stores, plugins, middleware, or server API entry points.
---

# JabRef Online Nuxt Structure

Follow the project structure already used in this Nuxt 3 / Vue 3 codebase.

## Frontend Directories

1. Put route views in `pages/`.
   - Auth-gated pages use `definePageMeta({ requiresAuth: true })`.
   - Dynamic routes use Nuxt filename conventions such as `pages/change-password/[token].vue` and catch-all routes such as `pages/codeprojects/[...slug].vue`.
2. Put reusable Vue single-file components in `components/`.
   - Use PascalCase filenames for Vue SFCs, for example `DocumentView.vue`, `PasswordInput.vue`, and `LandingPageFooter.vue`.
   - Keep stories colocated beside components as `ComponentName.stories.vue`.
3. Put shared Composition API helpers in `composables/`.
   - Import with Nuxt aliases when used across the app, for example `~/composables/util`.
4. Put Pinia stores in `store/`.
   - Existing code imports stores with `~/store`.
5. Put Nuxt plugins in `plugins/`.
   - `plugins/apollo.ts` provides the Apollo client through Nuxt.
   - `plugins/vue.directives.ts` contains app-wide Vue directives.
6. Put route middleware in `middleware/`.
   - Global middleware follows Nuxt naming such as `authenticated.global.ts`.

## Server Directories

1. Keep GraphQL over HTTP wired through `server/api/index.ts`.
2. Keep server context construction in `server/context.ts`.
3. Keep executable GraphQL schema loading in `server/schema.ts`.
4. Add domain backend code under `server/<domain>/`.
   - Common domain files are `schema.graphql`, `schema.prisma`, `resolvers.ts`, and `*.service.ts`.
   - Existing domains include `documents`, `groups`, `journals`, and `user`.
5. Register injectable classes in `server/tsyringe.config.ts` when adding services or resolvers.

## Implementation Notes

- Prefer `<script setup lang="ts">` in Vue SFCs.
- Use existing aliases such as `~/...` and generated imports such as `#graphql/resolver`.
- Keep Nuxt app configuration changes in `nuxt.config.ts` or `app.config.ts`; avoid scattering global behavior in component files.
- Do not add application logic to `app.vue`; it intentionally stays minimal.
