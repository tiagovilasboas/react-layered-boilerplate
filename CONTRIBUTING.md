# Contributing

Thanks for helping improve this boilerplate. Changes should stay documentation-accurate and respect the layered architecture — do not invent extra layers or couple UI to fetch/API.

This repo is the Webpack-era layered-architecture reference. For greenfield work, prefer [react-vite-boilerplate](https://github.com/tiagovilasboas/react-vite-boilerplate). Do not chase feature-parity with that sibling.

## Prerequisites

- Node.js 20+ (`.nvmrc` is `v20.12.0`; CI matrix is 20.x and 22.x)
- npm 10+ (`package.json` engines)

```bash
git clone https://github.com/tiagovilasboas/react-layered-boilerplate.git
cd react-layered-boilerplate
npm install
```

## Default branch

The repository default is **`develop`**. Open pull requests against `develop`.

A `master` branch exists (protected). There is no `main` branch today. GitHub Actions runs on `develop` and `master`.

## Architecture contract

Read [`AGENTS.md`](AGENTS.md) before changing `src/`.

- Direction: `pages` → `modules` (`components` → `hooks` → `service`) → shared (`src/components`, `src/hooks`)
- Pages compose only
- Components must not import `service/` or call `fetch` / HTTP clients
- Hooks may call `service/` (prefer injecting the repository)
- Services (repositories) must not import UI or pages
- Expose a module only via its `index.ts`
- Do not commit secrets

New features belong in `src/modules/<name>/` with `components/`, `hooks/`, `service/`, `utils/`, and `index.ts`.

The canonical example is `src/modules/example-module`, composed from `src/pages/main/app.tsx`.

## Local checks

Run these before opening or updating a PR (same scripts as `package.json`):

```bash
npm run lint
npm run type-check
npm test
```

Optionally:

```bash
npm run build
npm run format
```

`npm test` and `npm run test:ci` both run Vitest once with coverage. Use `npm run test:watch` for watch mode.

CI (`.github/workflows/ci.yml`) runs lint, type-check, tests, and build.

## Pull requests

1. Branch from the latest `develop`.
2. Keep the diff scoped. Docs/template hygiene and app/architecture rewrites do not belong in the same PR.
3. Fill in the PR template.
4. Include tests for behavior changes under `src/`.
5. Use Conventional Commits when practical (`feat:`, `fix:`, `docs:`, `chore:`).

### Suggested branch names

`docs/<topic>`, `fix/<topic>`, `feat/<topic>` — short and lowercase.

## Issues

Use the issue templates under `.github/ISSUE_TEMPLATE/` (bug or feature). Search existing issues first.

## License

By contributing, you agree that your contributions are licensed under the [MIT License](LICENSE).
