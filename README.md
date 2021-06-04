## React Layered Architecture Boilerplate

Arquitetura client-side escalável, distribuída em camadas, com o objetivo de promover uma arquitetura front-end que favoreça a reusabilidade de código, coesão, independência de tecnologia e testabilidade. .

## Stacks

---

- [React](https://facebook.github.io/react/) (17.x)
- [Webpack](https://webpack.js.org/) (5.x)
- [Typescript](https://www.typescriptlang.org/) (4.x)
- [Hot Module Replacement (HMR)](https://webpack.js.org/concepts/hot-module-replacement/) ([React Hot Loader](https://github.com/gaearon/react-hot-loader))
- Build p/ produção (Webpack)
- Otimização de imagens ([Image Webpack Loader](https://github.com/tcoopman/image-webpack-loader))
- Arquitetura de estilos modular (com autoprefixer p/ cross-browser) [Styled-components](https://styled-components.com/docs/)
- Estabilização de código com ([ESLint](https://github.com/eslint/eslint)) e formatação com ([Prettier](https://github.com/prettier/prettier))
- Testes unitários com ([Jest](https://facebook.github.io/jest/)) e testes em componentes com [DOM Test Library](https://testing-library.com/docs/)
- Análise de commits ([Husky](https://typicode.github.io/husky/#/))

## Instalação

---

1. Clone/download do repositório
2. `npm install`

## Como usar

---

**Desenvolvimento**

`npm run start`

- "Build" do app (HMR habilitado)
- @ `http://localhost:8080`

**Produção**

`npm run start`

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
