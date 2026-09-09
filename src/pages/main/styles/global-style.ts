import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  /* CSS Reset básico */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.proximaNova};
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.black};
    min-height: 100vh;
  }

  #root {
    height: 100%;
    min-height: 100vh;
  }

  /* Melhorias de acessibilidade */
  button, input, select, textarea {
    font-family: inherit;
    font-size: inherit;
  }

  /* Remove list styles */
  ul, ol {
    list-style: none;
  }

  /* Remove text decoration */
  a {
    text-decoration: none;
    color: inherit;
  }

  /* Remove button styles */
  button {
    border: none;
    background: none;
    cursor: pointer;
  }

  /* Remove input styles */
  input, textarea {
    border: none;
    outline: none;
  }
`;
