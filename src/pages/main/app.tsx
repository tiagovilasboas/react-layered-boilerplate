import * as React from 'react';
import { hot } from 'react-hot-loader';
import { ThemeProvider } from 'styled-components';

import Title from './app.styled';
import { theme } from '../../assets/styles';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <Title>Olá mundo!</Title>
      </div>
    </ThemeProvider>
  );
};

export default hot(module)(App);
