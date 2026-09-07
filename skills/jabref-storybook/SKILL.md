---
name: jabref-storybook
description: Use when adding, updating, or reviewing JabRef Online Storybook stories for Vue components.
---

# JabRef Online Storybook

JabRef Online keeps Storybook stories beside Vue components in `components/`.

## File Placement

- Add stories as `components/ComponentName.stories.vue`.
- Keep the component import local and explicit, for example `import DocumentEditor from './DocumentEditor.vue'`.
- Storybook is configured to load `../components/*.stories.vue` from `.storybook/main.ts`.

## Story Shape

Use the existing Vue SFC story format:

```vue
<script setup lang="ts">
import MyComponent from './MyComponent.vue'
</script>

<template>
  <Stories
    title="MyComponent"
    :component="MyComponent"
  >
    <Story title="Default">
      <MyComponent />
    </Story>
  </Stories>
</template>
```

## Conventions

- Cover meaningful component states with separate `<Story>` entries.
- Keep mock data local to the story unless a reusable test helper already exists.
- Prefer props and slots that mirror real app usage.
- Do not add stories for pages, server files, generated files, or purely nonvisual utilities.

## Commands

Run Storybook locally:

```bash
pnpm storybook
```

Build Storybook:

```bash
pnpm storybook:build
```
