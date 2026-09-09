# React Layered Boilerplate

[![Node.js](https://img.shields.io/badge/Node.js-20-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Enterprise-oriented **Webpack-era** React starter for teams that want **layered architecture**, **repository-style dependency inversion**, **TypeScript `strict`**, **Vitest**, and **GitHub Actions CI** — without a kitchen-sink framework dump.

This is the older sibling. **New products should start from** [react-vite-boilerplate](https://github.com/tiagovilasboas/react-vite-boilerplate) (Vite + Mantine + Plop). Keep this repo when you need the Webpack 5 + `pages/` + `modules/` reference.

**Who it is for:** frontend squads that treat pages as composition roots, isolate features in modules (`components → hooks → service`), and keep shared UI/hooks reusable.

<details>
<summary>Português</summary>

Starter React (era Webpack) com arquitetura em camadas, inversão de dependência via repositório, TypeScript strict, testes e CI. Páginas só compostas; features em módulos. Para projetos novos, prefira o [react-vite-boilerplate](https://github.com/tiagovilasboas/react-vite-boilerplate).

</details>

## Start

Requires [Node.js](https://nodejs.org/) **20+** (`.nvmrc` is `v20.12.0`; CI also runs 22). `package.json` engines: `node >=20`, `npm >=10`.

```bash
git clone https://github.com/tiagovilasboas/react-layered-boilerplate.git
cd react-layered-boilerplate
npm install
npm run dev
```

Dev server: [http://localhost:8080](http://localhost:8080). React 19 is **bundled** by Webpack (React 19 has no UMD build — do not load it from a CDN).

| Command | What it does |
| --- | --- |
| `npm run dev` / `npm start` | Webpack 5 dev server |
| `npm run build` | Production bundle (`dist/`) |
| `npm test` / `npm run test:ci` | Vitest once, with coverage |
| `npm run test:watch` | Vitest watch + coverage |
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

- **Pages** — routing and composition. No heavy business logic. `src/pages/main/app.tsx` composes `ExampleComponent` from the module public API.
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

`createExampleRepository()` is the seam. Default is **in-memory** so the demo runs without a backend. Swap to HTTP (or your own impl) without changing hooks or UI:

```ts
import { createExampleRepository } from '@/modules/example-module';

const demo = createExampleRepository(); // kind: 'memory'
const api = createExampleRepository({
  kind: 'http',
  baseUrl: 'https://api.example.com',
});
```

Inject the port into `useExampleHook(repository)` in tests. The running page uses the module default.

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
eslint.config.mjs          # ESLint 9 flat config
```

Import alias `@/` maps to `src/` (TypeScript + Webpack + Vitest). There are no extra aliases for layers that do not exist.

```ts
import { Button } from '@/components/Button';
import { ExampleComponent } from '@/modules/example-module';
```

## AI-assisted development

Coding agents (Cursor, Copilot, and others) should read [`AGENTS.md`](AGENTS.md) first. That file is the contract: stack, Dependency Rule, commands, and ready-made prompts. Thin harness adapters (`.cursor/rules/`, `.github/copilot-instructions.md`) defer to it.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Default branch today is `develop`.

## License

MIT. See [LICENSE](LICENSE).
