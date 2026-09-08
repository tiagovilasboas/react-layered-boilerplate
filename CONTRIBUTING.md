# Contributing

Thanks for helping improve this boilerplate. Changes should stay documentation-accurate and respect the layered architecture — do not invent extra layers or couple UI to fetch/API.

## Prerequisites

- Node.js 20 (`.nvmrc`; `v20.12.0`)
- npm 8+ (`package.json` engines)

```bash
git clone https://github.com/tiagovilasboas/react-layered-boilerplate.git
cd react-layered-boilerplate
npm install
```

## Default branch

The repository default is **`develop`**. Open pull requests against `develop`.

A `master` branch exists (protected). There is no `main` branch today. GitHub Actions is configured for `main` and `develop`; do not assume `main` is the integration branch unless the default is changed.

## Architecture contract

Read [`AGENTS.md`](AGENTS.md) before changing `src/`.

- Direction: `pages` → `modules` (`components` → `hooks` → `service`) → shared (`src/components`, `src/hooks`)
- Pages compose only
- Components must not import `service/` or call `fetch` / HTTP clients
- Hooks may call `service/`
- Services (repositories) must not import UI or pages
- Expose a module only via its `index.ts`
- Do not commit secrets

New features belong in `src/modules/<name>/` with `components/`, `hooks/`, `service/`, `utils/`, and `index.ts`.

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

CI (`.github/workflows/ci.yml`) also targets lint, type-check, tests, and build. Prefer the scripts above locally — they are the ones defined in `package.json`.

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
