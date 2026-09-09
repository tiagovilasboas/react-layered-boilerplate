import React from 'react';
import { ThemeProvider } from 'styled-components';

import ReactLogo from '@/assets/img/react_logo.svg';
import { ExampleComponent } from '@/modules/example-module';

import { GlobalStyle, theme } from './styles';
import { Main } from './styles/app.style';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Main>
        <h1>React Layered Architecture Boilerplate</h1>
        <p>Feito de dev para dev, com carinho ❤️</p>
        <img src={ReactLogo} alt="React logo" width={96} height={96} />
        <p>Page composition of example-module (UI → hook → repository).</p>
        <ExampleComponent title="example-module" onAction={() => undefined} />
      </Main>
    </ThemeProvider>
  );
};

export default App;
