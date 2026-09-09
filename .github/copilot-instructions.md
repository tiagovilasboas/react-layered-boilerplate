# Adapter for GitHub coding agent

**Primary source:** [`AGENTS.md`](../AGENTS.md). Read it first. This file is a thin adapter.

## Stack (excerpt)

React 19 + TypeScript + Webpack 5 / styled-components / Vitest / `pages/` / `modules/` / shared. Webpack-era sibling of `react-vite-boilerplate`.

## Dependency Rule

`pages` -> `modules` (`components` -> `hooks` -> `service`) -> shared

- Pages compose only; no heavy business logic.
- UI must not import `service/` or call fetch/axios directly.
- Expose modules via `index.ts`.
- Alias `@/` → `src/` only.

## Do not

- Do not commit secrets.
- Do not break the Dependency Rule.
- Stay within pages/modules/shared.
- Do not port Vite-sibling features (Mantine, Plop, i18n, PWA) into this repo.

Note: active evolution is `react-vite-boilerplate`. Run test, lint, and type-check before finishing.
