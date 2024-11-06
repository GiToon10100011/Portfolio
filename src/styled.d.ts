import "styled-components";
import { Theme } from "./styles/theme";

declare module "styled-components" {
  export interface DefaultTheme {
    fonts: {
      logo: string;
      nintendo: string;
      text: string;
      krText: string;
    };
    colors: {
      point: string;
      textPoint: string;
      icons: string;
      text: string;
      subText: string;
      background: string;
      subBackground: string;
      darkBackground: string;
      darkerBackground: string;
      alert: string;
      lightBorder: string;
      itemsBorder: string;
    };
    opacity: {
      default: number;
      light: number;
    };
    borderRadius: {
      light: string;
      sub: string;
      main: string;
    };
    bgFilter: {
      light: number;
      dark: number;
    };
    fontWeight: {
      semiBold: number;
      bold: number;
      regular: string;
      extraBold: number;
    };
  }
}
