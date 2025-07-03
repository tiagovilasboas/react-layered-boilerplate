import React from 'react';
import { ThemeProvider } from 'styled-components';

import FrontEndIcon from '@/assets/icons/front-end-icon.gif';

import { GlobalStyle, theme } from './styles';
import { Main } from './styles/app.style';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Main>
        <h1>React Layered Architecture Boilerplate</h1>
        <p>Feito de dev para dev, com carinho ❤️</p>
        <img src={FrontEndIcon} alt="Front-end Icon" />
      </Main>
    </ThemeProvider>
  );
};

export default App;
