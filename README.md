# React Layered Boilerplate

[![Node.js](https://img.shields.io/badge/Node.js-20-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Enterprise-oriented React starter for teams that want **layered architecture**, **repository-style dependency inversion**, **TypeScript `strict`**, **Vitest**, and **GitHub Actions CI** — without a kitchen-sink framework dump.

**Who it is for:** frontend squads that treat pages as composition roots, isolate features in modules (`components → hooks → service`), and keep shared UI/hooks reusable. If you are starting a new product today, prefer the actively evolved sibling [react-vite-boilerplate](https://github.com/tiagovilasboas/react-vite-boilerplate) (Vite + Mantine + Plop).

<details>
<summary>Português</summary>

Starter React com arquitetura em camadas, inversão de dependência via repositório, TypeScript strict, testes e CI. Páginas só compostas; features em módulos. Para projetos novos, prefira o [react-vite-boilerplate](https://github.com/tiagovilasboas/react-vite-boilerplate).

</details>

## Start

Requires [Node.js](https://nodejs.org/) 20 (see `.nvmrc`). `package.json` engines allow `>=16`, but 20 is the intended local version.

```bash
git clone https://github.com/tiagovilasboas/react-layered-boilerplate.git
cd react-layered-boilerplate
npm install
npm run dev
```

| Command | What it does |
| --- | --- |
| `npm run dev` / `npm start` | Webpack 5 dev server |
| `npm run build` | Production bundle (`dist/`) |
| `npm test` | Vitest with coverage |
| `npm run lint` | ESLint on `src/**/*.{js,ts,tsx}` |
| `npm run type-check` | `tsc --noEmit` |
| `npm run format` | Prettier write on `src/` |

## Architecture

Dependencies point inward:

`Pages` → `Modules (components → hooks → service)` → shared (`src/components`, `src/hooks`)

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│    Page     │───▶│  Component  │───▶│    Hook     │───▶│ Repository  │
│ composition │    │     UI      │    │  UI state   │    │  API / I/O  │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

- **Pages** — routing and composition. No heavy business logic.
- **Modules** — feature folders. UI does not import `service/` directly; hooks may. Services are repositories (DTO ⇄ model) and must not import UI or pages.
- **Shared** — reusable UI and hooks under `src/components/` and `src/hooks/` (there is no `src/shared/` directory).
- Each module exposes a public surface via `index.ts`.

Example module:

```
src/modules/example-module/
├── components/
├── hooks/
├── service/          # repository + factory (DI seam)
├── utils/
└── index.ts          # public re-exports
```

`ExampleRepository` / `createExampleRepository()` is the seam: swap the implementation (HTTP, mock, GraphQL) without changing hooks or UI.

### Layout

```
src/
├── pages/                 # composition root
├── modules/               # features
│   └── example-module/
├── components/            # shared UI
├── hooks/                 # shared hooks
├── assets/
├── types/
└── setupTests.ts
configs/webpack/           # common / dev / prod
vitest.config.ts
eslint.config.js
```

Import alias `@/` maps to `src/` (TypeScript + Webpack + Vitest).

```ts
import { Button } from '@/components/Button';
```

## AI-assisted development

Coding agents (Cursor, Copilot, and others) should read [`AGENTS.md`](AGENTS.md) first. That file is the contract: stack, Dependency Rule, commands, and ready-made prompts. Thin harness adapters (`.cursor/rules/`, `.github/copilot-instructions.md`) defer to it.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Default branch today is `develop`.

## License

MIT. See [LICENSE](LICENSE).
