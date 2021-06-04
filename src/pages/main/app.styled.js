import styled from 'styled-components';

// Create a Title component that'll render an <h1> tag with some styles
const Title = styled.h1`
  font-size: ${(props) => props.theme.fontSizes.large};
  font-family: ${(props) => props.theme.fonts[0]};
  text-align: center;
  color: #333;
`;

export default Title;
