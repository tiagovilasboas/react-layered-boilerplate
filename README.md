# React Layered Boilerplate

Um boilerplate moderno, minimalista e escalável para aplicações React com TypeScript, Webpack, Styled-components, Vitest, ESLint e Prettier.

## ✨ Tecnologias

- [React 19](https://react.dev/)
- [TypeScript 5](https://www.typescriptlang.org/)
- [Webpack 5](https://webpack.js.org/)
- [Styled-components 6](https://styled-components.com/)
- [Vitest](https://vitest.dev/) (testes)
- [ESLint](https://eslint.org/) (lint)
- [Prettier](https://prettier.io/) (formatação)

## 🚀 Requisitos

- Node.js 20+ (use `.nvmrc` para garantir a versão)
- npm 8+

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

## 🏗️ Build de Produção

```bash
# gera artefatos em dist/
npm run build

# opcional: sirva o build localmente
npx serve ./dist
```

## ⚡ Instalação

```bash
npm install
```

## 🛠️ Scripts principais

```bash
npm run dev       # Inicia o servidor de desenvolvimento
npm run build     # Gera o build de produção
npm test          # Executa os testes com cobertura
npm run lint      # Executa o lint
npm run format    # Formata o código com Prettier
npm run type-check # Checa os tipos TypeScript
```

## 🔗 Alias de importação

Graças à configuração de `tsconfig.json` e `webpack`, você pode importar usando aliases, por exemplo:

```ts
import { Button } from '@/components/Button';
```

Isso evita caminhos relativos longos e facilita a refatoração.

## 📁 Estrutura mínima

```
src/
  components/
  hooks/
  modules/
  pages/
  assets/
  setupTests.ts
  ...
configs/
  webpack/
    dev.js
    prod.js
    common.js
vitest.config.ts
webpack.config.js
eslint.config.js
.prettierrc
package.json
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature: `git checkout -b minha-feature`
3. Commit suas mudanças: `git commit -m 'feat: Minha nova feature'`
4. Faça push da sua branch: `git push origin minha-feature`
5. Abra um Pull Request

Contribuições são muito bem-vindas! 💜

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

## 🧪 Testes

- Os testes utilizam [Vitest](https://vitest.dev/) e [Testing Library](https://testing-library.com/).
- Arquivo de setup: `src/setupTests.ts` (mocks globais)

## 💡 Observações

- O boilerplate é intencionalmente enxuto. Ferramentas como Docker, CI/CD, análise de bundle e deploy devem ser adicionadas conforme a necessidade do projeto.
- Sinta-se à vontade para adaptar a estrutura de pastas conforme o crescimento da aplicação.

---

Feito com 💙 por [Tiago Vilas Boas](https://github.com/tiagovilasboas)
