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

## 🏛️ Arquitetura em Camadas

Este boilerplate segue o princípio **SRP (Single-Responsibility Principle)** e organiza o código em **camadas horizontais** que se comunicam de fora para dentro:

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
  components/
    UserCard.tsx
  hooks/
    useUser.ts
  service/
    userRepository.ts    # fetch/<=>cache
  utils/
    userFormatters.ts
  index.ts               # re-export público
```

Cada módulo expõe apenas seu `index.ts`, mantendo implementação privada.

Essa segmentação permite escalar adicionando novas features sem criar pastas "god-objects".

### Dependency Rule (Clean Architecture)

Segundo a Clean Architecture, dependências devem sempre apontar **para dentro**, nunca para fora. No contexto deste boilerplate:

- Components → não importam Services.
- Hooks → podem importar Services, nunca Pages.
- Services (Repositories) → não importam nada de UI, apenas `fetch`/`axios` e tipos.

Isso garante que detalhes (UI, frameworks, libs) dependam da regra de negócio — e não o inverso.

Exemplo prático:

```ts
// ❌ Errado – UI conhecendo detalhes de fetch
import { getUsers } from '@/modules/user/service/userRepository';

export const UserCard = () => {
  const users = await getUsers();
  // ...
};

// ✅ Correto – Hook abstrai a origem dos dados
import { useUsers } from '@/modules/user/hooks/useUser';

export const UserCard = () => {
  const { users } = useUsers();
  // ...
};
```

Dessa forma, se `userRepository` trocar `fetch` por GraphQL ou IndexedDB, **nenhum componente** precisará mudar.

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
