import { createGlobalStyle } from "styled-components";
import logoFont from "../fonts/UniversNextProBold.ttf";
import nintendoFont from "../fonts/UniversNextProBold.ttf";
import { reset } from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: "UniversNextProBold";
    src: url(${logoFont});
  }

  @font-face {
    font-family: "CoutureBold";
    src: url(${nintendoFont});
  }

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  ul, li{
    list-style: none;
  }

  a{
    text-decoration: none;
    color: inherit;
  }

  body{
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

export default GlobalStyles;
