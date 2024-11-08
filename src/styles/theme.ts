import { DefaultTheme } from "styled-components";

export const defaultTheme: DefaultTheme = {
  fonts: {
    logo: '"UniversNextProBold"',
    nintendo: '"CoutureBold"',
    text: '"Montserrat"',
    krText: '"Noto Sans KR"',
  },
  colors: {
    point: "#6800C3",
    textPoint: "#af53ff",
    icons: "#7c1bd0",
    text: "#fff",
    subText: "#ccc",
    background: "#1a1a1a",
    subBackground: "#333",
    darkBackground: "#222",
    darkerBackground: "#111",
    alert: "#ff3a3a",
    lightBorder: "#aaa",
    itemsBorder: "#444",
    dividerBorder: "#888",
  },
  opacity: {
    default: 0.8,
    light: 0.3,
  },
  borderRadius: {
    light: "4px",
    sub: "10px",
    main: "20px",
  },
  bgFilter: {
    light: 0.2,
    dark: 0.6,
  },
  fontWeight: {
    semiBold: 550,
    bold: 600,
    regular: "normal",
    extraBold: 800,
  },
};
