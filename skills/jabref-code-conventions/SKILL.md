---
name: jabref-code-conventions
description: Use when formatting, linting, naming files, preparing commits, or writing PR-ready changes in JabRef Online.
---

# JabRef Online Code Conventions

Apply these conventions before handing off changes.

## Formatting and Linting

- Use pnpm commands from `package.json`; do not swap in npm, yarn, or bun.
- Run:

  ```bash
  pnpm lint
  ```

- The lint command runs Oxlint and Prettier checks.
- Prettier conventions include no semicolons, single quotes, organized imports, and one Vue attribute per line.
- EditorConfig uses 2 spaces, LF line endings, UTF-8, trimmed trailing whitespace, and final newlines.

## Naming

- Use PascalCase for Vue SFC filenames and component names.
- Use `*.spec.ts` for colocated unit tests.
- Use `*.stories.vue` for colocated component stories.
- Use kebab-case for Agent Skill directory names and `SKILL.md` as the exact uppercase skill entry filename.

## Generated Files

- Regenerate generated artifacts with `pnpm generate` or the narrower generator command.
- Do not hand-edit generated GraphQL or Prisma output.
- Do not commit unrelated generated churn.

## Commits and PRs

Use Conventional Commits. The common types in this repo are:

- `feat:` for user-facing functionality.
- `fix:` for bug fixes.
- `refactor:` for behavior-preserving code restructuring.
- `test:` for test-only changes.
- `docs:` for documentation-only changes.
- `chore:` for tooling, dependency, or repository maintenance.

For developer-experience tooling or repository metadata, prefer `chore:` unless the change is strictly documentation.

## Scope Control

- Keep changes limited to the requested area.
- Do not touch `schema.prisma`, GraphQL SDL, generated files, or application logic for docs/tooling-only work.
- Preserve unrelated user changes in the working tree.
