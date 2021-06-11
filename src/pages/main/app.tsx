import * as React from 'react';
import { hot } from 'react-hot-loader';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from './styles';
import { Main } from './styles/app.style';
import FrontEndIcon from '@/assets/icons/front-end-icon.gif';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Main>
        <h2>Truth can only be found in one place: the code.</h2>
        <img src={FrontEndIcon} />
      </Main>
    </ThemeProvider>
  );
};

export default hot(module)(App);
