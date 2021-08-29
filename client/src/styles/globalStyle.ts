import { createGlobalStyle } from "styled-components";
import theme from "./theme";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

  * {
    font-family: ${() => theme.fontFamilies.body};
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body, #root {
    height: 100vh;
  }

  body {
    background: ${() => theme.colors.background};
    color: ${() => theme.colors.primary};
  }

  h1,h2,h3,h4,h5,h6 {
    font-family: ${() => theme.fontFamilies.heading};

  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;
