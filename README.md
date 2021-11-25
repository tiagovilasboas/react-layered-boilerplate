## React Layered Architecture Boilerplate

Arquitetura client-side escalável, distribuída em camadas, com o objetivo de promover uma arquitetura front-end que favoreça a reusabilidade de código, coesão, independência de tecnologia e testabilidade. .

## Stacks

---

- [React](https://facebook.github.io/react/) (17.x)
- [Webpack](https://webpack.js.org/) (5.x)
- [Typescript](https://www.typescriptlang.org/) (4.x)
- [Hot Module Replacement (HMR)](https://webpack.js.org/concepts/hot-module-replacement/) ([React Hot Loader](https://github.com/gaearon/react-hot-loader))
- Build p/ produção (Webpack)
- [Styled-components](https://styled-components.com/docs/) (com autoprefixer p/ cross-browser)
- Estabilização de código com ([ESLint](https://github.com/eslint/eslint)) e formatação com ([Prettier](https://github.com/prettier/prettier))
- Testes unitários com ([Jest](https://facebook.github.io/jest/)) e testes em componentes com [DOM Test Library](https://testing-library.com/docs/)
- Análise de commits ([Husky](https://typicode.github.io/husky/#/))
- Servidor Web ([Express](https://expressjs.com/pt-br/))

## Regra de dependência

---

![img](https://i.imgur.com/nkpyvgT.png)

## Proposta de Arquitetura

---

Pensando na escalabilidade do projeto, sem trazer complicações e Over engineering, pensei em trazer um modelo de arquitetura para o frontend do boilerplate.
Indo direto ao ponto, esse é o modelo:

```javascript
src
├── components  # Componentes globais de uso geral do projeto.
├── layout      # Wrappers padrões para componentes ou páginas.
├── hooks       # Hooks globais de uso geral do projeto.
├── contexts    # Contexts para gerenciamento de estado global do projeto.
├── modules     # Módulos. Um para cada página, com a lógica de negócio.
│    └─ example-module
│         ├──  index.js/ts  # Ponto de partida desse módulo.
│         ├──  hooks        # Hooks globais de uso exclusivo desse módulo.
│         ├──  components   # Componentes de uso exclusivo desse módulo.
│         ├──  service      # Funções e lógicas de utilização geral e genérica
│         └──  utils        # Componentes de uso exclusivo desse módulo.
├── pages       # Cada página associada com uma rota e um módulo.
├── services    # Lógica de comunicação com o backend.
├── shared      # Tudo que for compartilhável. Sendo configuração de temas, etc.
└── utils       # Funções e lógicas de utilização geral e genérica.
```

Obs: Essa estrutura interna aos Módulos é opcional e pode ser criada mediante necessidade, precisando inicialmente só do index.js/ts§

## Instalação

---

1. Clone/download do repositório
2. `npm install typescript -g` (p/ desenvolvimento)
3. `npm install`

## Como usar

---

**Desenvolvimento**

`npm run start`

- "Build" do app (HMR habilitado)
- @ `http://localhost:8080`

**Produção**

`npm run prod`

- "Build" do app (HMR desabilitado) em `/dist/`
- @ `http://localhost:8888`

---

**Comandos**

| Comando            | Descrição                                                                       |
| ------------------ | ------------------------------------------------------------------------------- |
| `npm run dev`      | Sobe a "app" com hot reload e serve em @ `http://localhost:8080`                |
| `npm run prod`     | Empacota a "app" para produção em `/dist/` e serve em @ `http://localhost:8888` |
| `npm run build`    | Empacota a "app" `/dist/`                                                       |
| `npm run test`     | Dispara a rotina de testes                                                      |
| `npm run test:dev` | Dispara a rotina de testes com "watch reload"                                   |
| `npm run lint`     | Roda o analisador de código (eslint)                                            |
| `npm run lint:fix` | Roda o analisador de código e corrige as "issues"                               |
| `npm run start`    | ("alias" para `npm run dev`)                                                    |

---

**Nota**: caso tenha preferência em usar o `yarn`, substituía o `npm` para `yarn` no `package.json`, .
