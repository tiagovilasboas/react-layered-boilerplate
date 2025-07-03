import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      orange: string;
      black: string;
      grey: string;
      white: string;
    };
    fonts: {
      proximaNova: string;
      proximaNovaBold: string;
    };
    fontSizes: {
      tiny: string;
      small: string;
      medium: string;
      large: string;
    };
    breakpoints: {
      mobileS: string;
      mobileM: string;
      mobileL: string;
      tablet: string;
      tabletL: string;
      desktop: string;
    };
  }
}
