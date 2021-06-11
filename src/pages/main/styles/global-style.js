import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
${normalize}

@font-face{
    font-family:"proximanova-bold";
    src: url("https://s3.glbimg.com/cdn/fonts/proximanova/bold.woff2") format("woff2"),
        url("https://s3.glbimg.com/cdn/fonts/proximanova/bold.woff") format("woff"),
        url("https://s3.glbimg.com/cdn/fonts/proximanova/bold.ttf") format("truetype");
        
    font-style:normal;
    font-weight:normal
}

@font-face{
    font-family:"proximanova-regular";
    src:url("https://s3.glbimg.com/cdn/fonts/proximanova/regular.woff2") 
    format("woff2"),url("https://s3.glbimg.com/cdn/fonts/proximanova/regular.woff") 
    format("woff"),url("https://s3.glbimg.com/cdn/fonts/proximanova/regular.ttf") 
    format("truetype");
    font-style:normal;
    font-weight:normal}


  body {
    font-family: ${(props) => props.theme.fonts.proximaNova};
    margin: 0;
  }
`;

export { GlobalStyle };
