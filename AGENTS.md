# AGENTS.md — React Layered Boilerplate

Contrato para qualquer agente de código (Cursor, Copilot, Claude Code, Kiro, etc.).
Este arquivo é a **fonte da verdade** do contrato AI-assisted do repositório — independente do harness.

> **Nota:** a evolução ativa deste stack é o [react-vite-boilerplate](https://github.com/tiagovilasboas/react-vite-boilerplate) (Vite + Mantine + Plop). Prefira-o para projetos novos.

## Stack

- **React 19** + **TypeScript** + **Webpack 5**
- **styled-components** · **Vitest** + Testing Library
- Camadas: `pages/` · `modules/` · shared em `src/components/` e `src/hooks/` (não há `src/shared/`)
- Módulo típico: `components/` · `hooks/` · `service/` · `utils/` · `index.ts`

## Dependency Rule

Dependências para dentro:

`Pages` → `Modules (components → hooks → service)` → `Shared`

- **Pages** — composition/roteamento; sem lógica de negócio pesada.
- **components** — UI; **não** importam `service/` direto.
- **hooks** — estado/UI; podem chamar `service/`.
- **service** — repository/API; **não** importam UI/pages.
- Expor módulo só via `index.ts`.

## Comandos

| Comando | Uso |
| --- | --- |
| `npm run dev` / `npm start` | Dev server |
| `npm run build` | Build produção |
| `npm test` / `npm run test` | Vitest (com coverage) |
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

## Prompts prontos

1. **Novo módulo:** "Crie o módulo `X` em `src/modules/X` (components, hooks, service, utils, index) seguindo UI→hooks→service + teste."
2. **Nova page:** "Adicione a page `Y` em `src/pages/` só compondo o módulo, sem lógica de negócio."
3. **Refator Dependency Rule:** "Refatore `Z` para component→hook→service, sem imports UI↔service."

## Adapters (opcional)

Harnesses podem ter adapters finos que apontam para este arquivo (ex.: `.cursor/rules/`, `.github/copilot-instructions.md`). Em caso de conflito, **prevalece `AGENTS.md`**.
