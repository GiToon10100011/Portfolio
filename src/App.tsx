import { triggerMainStore, isFullscreenStore } from "./stores";
import { AnimatePresence } from "framer-motion";
import Main from "./routes/Main";
import Bootup from "./components/Bootup";

const App = () => {
  const triggerMain = triggerMainStore((state) => state.triggerMain);
  const isFullscreen = isFullscreenStore((state) => state.isFullscreen);

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
