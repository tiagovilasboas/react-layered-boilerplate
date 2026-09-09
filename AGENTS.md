# AGENTS.md — React Layered Boilerplate

Contrato para qualquer agente de código (Cursor, Copilot, Claude Code, Kiro, etc.).
Este arquivo é a **fonte da verdade** do contrato AI-assisted do repositório — independente do harness.

> **Nota:** este é o starter **Webpack-era**. A evolução ativa é o [react-vite-boilerplate](https://github.com/tiagovilasboas/react-vite-boilerplate) (Vite + Mantine + Plop). Prefira-o para projetos novos. Não tente feature-parity com o sibling Vite.

## Stack

- **React 19** + **TypeScript** (`strict`) + **Webpack 5** (React é bundled; sem CDN/UMD)
- **styled-components** · **Vitest** + Testing Library · **Node 20+**
- Camadas: `pages/` · `modules/` · shared em `src/components/` e `src/hooks/` (não há `src/shared/`)
- Módulo típico: `components/` · `hooks/` · `service/` · `utils/` · `index.ts`
- Referência viva: `src/modules/example-module` (UI → hook → `createExampleRepository()`)

## Dependency Rule

Dependências para dentro:

`Pages` → `Modules (components → hooks → service)` → `Shared`

- **Pages** — composition/roteamento; sem lógica de negócio pesada.
- **components** — UI; **não** importam `service/` direto.
- **hooks** — estado/UI; podem chamar `service/` (aceitar o repositório por parâmetro).
- **service** — repository/API (DTO ⇄ model); **não** importam UI/pages.
- Expor módulo só via `index.ts`.
- Alias único `@/` → `src/`. Não inventar `@/shared`, `@/contexts`, `@/services`.

## Comandos

| Comando | Uso |
| --- | --- |
| `npm run dev` / `npm start` | Dev server (http://localhost:8080) |
| `npm run build` | Build produção |
| `npm test` / `npm run test:ci` | Vitest uma vez, com coverage |
| `npm run lint` | ESLint |
| `npm run type-check` | TypeScript |
| `npm run format` | Prettier |

## Do

- Novas features em `src/modules/<nome>/` com as pastas padrão.
- Pages só compostas; lógica no módulo.
- Alias `@/` quando existir; manter tipagem e testes.
- Rodar `test` / `lint` / `type-check` antes de concluir.

## Don't

- Não inventar camadas fora de `pages/`, `modules/` e shared (`src/components`, `src/hooks`).
- Não acoplar UI a fetch/API direto.
- Não commitar secrets.
- Não quebrar a Dependency Rule.
- Não portar Mantine / Plop / i18n / PWA do sibling Vite para cá.

## Prompts prontos

1. **Novo módulo:** "Crie o módulo `X` em `src/modules/X` (components, hooks, service, utils, index) seguindo UI→hooks→service + teste."
2. **Nova page:** "Adicione a page `Y` em `src/pages/` só compondo o módulo, sem lógica de negócio."
3. **Refator Dependency Rule:** "Refatore `Z` para component→hook→service, sem imports UI↔service."

## Adapters (opcional)

Harnesses podem ter adapters finos que apontam para este arquivo (ex.: `.cursor/rules/`, `.github/copilot-instructions.md`). Em caso de conflito, **prevalece `AGENTS.md`**.
