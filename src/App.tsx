import { useRecoilState, useRecoilValue } from "recoil";
import { isFullscreenAtom, triggerMainAtom } from "./atoms";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/theme";
import GlobalStyles from "./styles/globalstyles.styles";
import { AnimatePresence } from "framer-motion";
import Main from "./routes/Main";
import Bootup from "./components/Bootup";
import FullScreenGuide from "./components/FullScreenGuide";

const App = () => {
  const [isFullscreen, setIsFullscreen] = useRecoilState(isFullscreenAtom);
  const triggerMainValue = useRecoilValue(triggerMainAtom);

  window.document.addEventListener("fullscreenchange", () => {
    if (document.fullscreenElement) {
      setIsFullscreen(true);
    } else {
      setIsFullscreen(false);
    }
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <AnimatePresence mode="wait">
        {!triggerMainValue && <Bootup key="bootup" />}
        {triggerMainValue && <Main key="main" />}
        {!isFullscreen && <FullScreenGuide />}
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default App;
