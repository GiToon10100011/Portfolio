import { triggerMainStore, isFullscreenStore, responsiveStore } from "./stores";
import { AnimatePresence } from "framer-motion";
import Main from "./routes/Main";
import Bootup from "./components/Bootup";
import { useEffect } from "react";

const App = () => {
  const { triggerMain } = triggerMainStore();
  const { isFullscreen } = isFullscreenStore();
  const { isResponsive } = responsiveStore();

  return (
    <>
      <AnimatePresence mode="wait">
        {(isResponsive && !triggerMain || (!triggerMain && isFullscreen)) && (
          <Bootup key="bootup" />
        )}
        {triggerMain && <Main key="main" />}
        {/* <Main /> */}
      </AnimatePresence>
    </>
  );
};

export default App;
