import Bootup from "./components/Bootup";
import GlobalStyles from "./styles/globalstyles.styles";
import { useRecoilValue } from "recoil";
import { triggerMain } from "./atoms";
import { AnimatePresence } from "framer-motion";
import Main from "./routes/Main";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/theme";

const App = () => {
  const triggerMainValue = useRecoilValue(triggerMain);

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <AnimatePresence mode="wait">
        {!triggerMainValue && <Bootup key="bootup" />}
        {triggerMainValue && <Main key="main" />}
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default App;
