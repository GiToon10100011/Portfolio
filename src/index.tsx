import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./Router.tsx";
import { defaultTheme } from "./styles/theme.ts";
import { ThemeProvider } from "styled-components";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={defaultTheme}>
    <RouterProvider router={router} />
  </ThemeProvider>
);
