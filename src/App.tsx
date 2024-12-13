import { triggerMainStore, isFullscreenStore, responsiveStore } from "./stores";
import { AnimatePresence } from "framer-motion";
import Main from "./routes/Main";
import Bootup from "./components/Bootup";
import { useEffect } from "react";

const App = () => {
  const { triggerMain } = triggerMainStore();
  const { isFullscreen, setIsFullscreen } = isFullscreenStore();
  const { isResponsive } = responsiveStore();

  useEffect(() => {
    setIsFullscreen(isResponsive);
  }, [isResponsive]);

  return (
    <>
      <AnimatePresence mode="wait">
        {!triggerMain && isFullscreen && <Bootup key="bootup" />}
        {triggerMain && <Main key="main" />}
        {/* <Main /> */}
      </AnimatePresence>
    </>
  );
};

export default App;
