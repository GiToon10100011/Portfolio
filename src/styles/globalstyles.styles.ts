import { createGlobalStyle } from "styled-components";
import logoFont from "../fonts/UniversNextProBold.ttf";
import nintendoFont from "../fonts/UniversNextProBold.ttf";

const GlobalStyles = createGlobalStyle`
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

  :root{
    --font-logo: "UniversNextProBold";
    --font-nintendo: "CoutureBold";
    --font-text: "Montserrat";
    --font-kr-text: "Noto Sans KR";
    --point-color: #6800C3;
    --text-point-color: #af53ff;
    --icons-color: #7c1bd0;
    --text-color: #fff;
    --sub-text-color: #ccc;
    --background-color: #1a1a1a;
    --sub-background-color: #333;
    --dark-background-color: #222;
    --darker-background-color: #111;
    --alert-color: #ff3a3a;  
    --light-border-color: #aaa;
    --items-border-color: #444;
    --opacity-value: 0.8;
    --light-opacity-value: 0.3;
    --light-border-radius: 4px;
    --sub-border-radius: 10px;
    --main-border-radius: 20px;
    --light-bg-filter: 0.2;
    --dark-bg-filter: 0.6;
  }
`;

export default GlobalStyles;
