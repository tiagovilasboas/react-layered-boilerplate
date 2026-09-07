# React Layered Boilerplate

[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Webpack](https://img.shields.io/badge/Webpack-5-blue.svg)](https://webpack.js.org/)
[![Vitest](https://img.shields.io/badge/Vitest-Testing-orange.svg)](https://vitest.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Um boilerplate moderno, minimalista e escalável para aplicações React com TypeScript, Webpack, Styled-components, Vitest, ESLint e Prettier.

## 📋 Índice

- [🚀 Começando Rápido](#-começando-rápido)
- [✨ Tecnologias](#-tecnologias)
- [🏛️ Arquitetura em Camadas](#️-arquitetura-em-camadas)
- [🤖 AI-assisted](#-ai-assisted)
- [🛠️ Scripts](#️-scripts)
- [📁 Estrutura](#-estrutura)
- [🤝 Contribuindo](#-contribuindo)

## 🚀 Começando Rápido

```bash
# clone o repositório
git clone https://github.com/tiagovilasboas/react-layered-boilerplate.git

# entre na pasta
cd react-layered-boilerplate

# instale as dependências
npm install # ou pnpm install / yarn

# rode em modo desenvolvimento
npm run dev
```

## ✨ Tecnologias

| Tecnologia                                          | Versão | Descrição                  |
| --------------------------------------------------- | ------ | -------------------------- |
| [React](https://react.dev/)                         | 19     | Biblioteca para interfaces |
| [TypeScript](https://www.typescriptlang.org/)       | 5      | Tipagem estática           |
| [Webpack](https://webpack.js.org/)                  | 5      | Bundler e dev server       |
| [Styled-components](https://styled-components.com/) | 6      | CSS-in-JS                  |
| [Vitest](https://vitest.dev/)                       | 3      | Testes unitários           |
| [ESLint](https://eslint.org/)                       | 9      | Linter                     |
| [Prettier](https://prettier.io/)                    | 3      | Formatação                 |

## 🏛️ Arquitetura em Camadas

Este boilerplate segue o princípio **SRP (Single-Responsibility Principle)** e organiza o código em **camadas horizontais** que se comunicam de fora para dentro:

```
┌─────────────────────────────────────────────────────────────┐
│                        PAGES                                │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │   Home Page     │  │   User Page     │  │ About Page  │ │
│  │  (Composition)  │  │  (Composition)  │  │(Composition)│ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      MODULES                                │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │   User Module   │  │  Auth Module    │  │ Shop Module │ │
│  │ ┌─────────────┐ │  │ ┌─────────────┐ │  │┌───────────┐│ │
│  │ │ Components  │ │  │ │ Components  │ │  ││Components ││ │
│  │ │   Hooks     │ │  │ │   Hooks     │ │  ││  Hooks    ││ │
│  │ │  Services   │ │  │ │  Services   │ │  ││ Services  ││ │
│  │ │   Utils     │ │  │ │   Utils     │ │  ││  Utils    ││ │
│  │ └─────────────┘ │  │ └─────────────┘ │  │└───────────┘│ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      SHARED                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │   Components    │  │     Hooks       │  │    Utils    │ │
│  │   (Global)      │  │   (Global)      │  │  (Global)   │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Camadas e Responsabilidades

1. **Pages** – composition root. Responsáveis por roteamento e composição de módulos/ componentes. Sem lógica de negócio.
2. **Modules (features)** – pastas autocontidas que agrupam:
   - `components/` – widgets específicos da feature
   - `hooks/` – regras de UI / estado da feature
   - `service/` – camada _Repository_: integra a feature a APIs ou IndexedDB/localStorage, convertendo DTO ⇄ model
   - `utils/` – helpers puros
3. **Shared / Core** – utilitários, temas, tipos que podem ser usados por qualquer módulo.

➡️ A regra de ouro: **código interno nunca importa direto de uma camada externa**. Exemplo: `service` não importa de `components`.

### Exemplo de módulo

```
src/modules/user/
├── components/
│   ├── UserCard.tsx
│   └── UserList.tsx
├── hooks/
│   └── useUser.ts
├── service/
│   └── userRepository.ts    # fetch/<=>cache
├── utils/
│   └── userFormatters.ts
└── index.ts                 # re-export público
```

Cada módulo expõe apenas seu `index.ts`, mantendo implementação privada.

Essa segmentação permite escalar adicionando novas features sem criar pastas "god-objects".

### Dependency Rule (Clean Architecture)

Segundo a Clean Architecture, dependências devem sempre apontar **para dentro**, nunca para fora. No contexto deste boilerplate:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Components    │    │     Hooks       │    │    Services     │
│                 │    │                 │    │   (Repository)  │
│  ❌ Não importa │    │  ✅ Pode importar│    │  ❌ Não importa │
│     Services    │    │     Services    │    │     UI/Pages    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

**Fluxo de Dados Correto:**

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Component │───▶│    Hook     │───▶│ Repository  │───▶│    API      │
│             │    │             │    │             │    │             │
│  (UI Layer) │    │ (Logic Layer)│    │(Data Layer) │    │(External)   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

**Regras de Dependência:**

- **Components** → não importam Services diretamente
- **Hooks** → podem importar Services, nunca Pages
- **Services (Repositories)** → não importam nada de UI, apenas `fetch`/`axios` e tipos

Isso garante que detalhes (UI, frameworks, libs) dependam da regra de negócio — e não o inverso.

#### Exemplo Prático Implementado

**1. Repository (Data Layer):**

```ts
// src/modules/example-module/service/exampleService.ts
export interface ExampleRepository {
  fetchData(): Promise<ExampleData[]>;
  createData(data: Omit<ExampleData, 'id' | 'createdAt'>): Promise<ExampleData>;
}

export class ExampleRepositoryImpl implements ExampleRepository {
  async fetchData(): Promise<ExampleData[]> {
    const response = await fetch(`${this.baseUrl}/data`);
    return await response.json();
  }
}
```

**2. Hook (Logic Layer):**

```ts
// src/modules/example-module/hooks/useExampleHook.ts
import { exampleRepository } from '../service/exampleService';

export function useExampleHook() {
  const [data, setData] = useState<ExampleData[]>([]);

  const fetchData = useCallback(async () => {
    const result = await exampleRepository.fetchData(); // ✅ Hook usa Repository
    setData(result);
  }, []);

  return { data, fetchData };
}
```

**3. Component (UI Layer):**

```ts
// src/modules/example-module/components/ExampleComponent.tsx
import { useExampleHook } from '../hooks/useExampleHook';

export const ExampleComponent = () => {
  const { data, fetchData } = useExampleHook(); // ✅ Component usa Hook

  return (
    <div>
      {data.map(item => <div key={item.id}>{item.name}</div>)}
      <button onClick={fetchData}>Refresh</button>
    </div>
  );
};
```

**Benefícios desta Arquitetura:**

1. **Inversão de Dependência:** UI não conhece detalhes de como os dados são obtidos
2. **Testabilidade:** Cada camada pode ser testada isoladamente
3. **Flexibilidade:** Repository pode trocar `fetch` por GraphQL sem afetar UI
4. **Manutenibilidade:** Mudanças em uma camada não propagam para outras

**Exemplo de Mudança sem Impacto:**

```ts
// Se quisermos trocar fetch por GraphQL, só mudamos o Repository:
export class GraphQLExampleRepository implements ExampleRepository {
  async fetchData(): Promise<ExampleData[]> {
    const result = await graphqlClient.query(GET_DATA_QUERY);
    return result.data.items; // Mesma interface, implementação diferente
  }
}

// Hook e Component continuam funcionando sem mudanças! 🎉
```

## 🤖 AI-assisted

Este repositório inclui um pack para agentes de IA:

- **[`AGENTS.md`](AGENTS.md)** — stack, Dependency Rule, comandos, Do/Don't e prompts prontos
- **[`.cursor/rules/`](.cursor/rules/)** — regras Cursor (`architecture.mdc`, `safe-edits.mdc`) aplicadas em `src/**/*`

> Evolução ativa: [react-vite-boilerplate](https://github.com/tiagovilasboas/react-vite-boilerplate).

### Prompts prontos

1. Criar módulo `X` em `src/modules/X` (components/hooks/service/utils) + teste
2. Adicionar page `Y` só compondo o módulo (sem lógica de negócio)
3. Refatorar `Z` para cumprir a Dependency Rule (component→hook→service)

## 🛠️ Scripts

| Comando              | Descrição                            |
| -------------------- | ------------------------------------ |
| `npm run dev`        | Inicia o servidor de desenvolvimento |
| `npm run build`      | Gera o build de produção             |
| `npm test`           | Executa os testes com cobertura      |
| `npm run lint`       | Executa o lint                       |
| `npm run format`     | Formata o código com Prettier        |
| `npm run type-check` | Checa os tipos TypeScript            |

## 🏗️ Build de Produção

```bash
# gera artefatos em dist/
npm run build

# opcional: sirva o build localmente
npx serve ./dist
```

## 🔗 Alias de importação

Graças à configuração de `tsconfig.json` e `webpack`, você pode importar usando aliases, por exemplo:

```ts
import { Button } from '@/components/Button';
```

Isso evita caminhos relativos longos e facilita a refatoração.

## 📁 Estrutura

```
src/
├── components/          # Componentes compartilhados
├── hooks/              # Hooks compartilhados
├── modules/            # Módulos de features
│   └── example-module/
│       ├── components/
│       ├── hooks/
│       ├── service/
│       ├── utils/
│       └── index.ts
├── pages/              # Páginas (composition root)
├── assets/             # Imagens, ícones, etc.
├── types/              # Tipos TypeScript
└── setupTests.ts       # Setup dos testes

configs/
├── webpack/
│   ├── dev.js
│   ├── prod.js
│   └── common.js
├── vitest.config.ts
├── eslint.config.js
└── .prettierrc
```

## 🧪 Testes

- Os testes utilizam [Vitest](https://vitest.dev/) e [Testing Library](https://testing-library.com/).
- Arquivo de setup: `src/setupTests.ts` (mocks globais)

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature: `git checkout -b minha-feature`
3. Commit suas mudanças: `git commit -m 'feat: Minha nova feature'`
4. Faça push da sua branch: `git push origin minha-feature`
5. Abra um Pull Request

Contribuições são muito bem-vindas! 💜

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

---

## 💡 Observações

- O boilerplate é intencionalmente enxuto. Ferramentas como Docker, CI/CD, análise de bundle e deploy devem ser adicionadas conforme a necessidade do projeto.
- Sinta-se à vontade para adaptar a estrutura de pastas conforme o crescimento da aplicação.

---

Feito com 💙 por [Tiago Vilas Boas](https://github.com/tiagovilasboas)
