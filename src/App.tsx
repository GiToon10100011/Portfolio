import { useRecoilState, useRecoilValue } from "recoil";
import { isFullscreenAtom, triggerMainAtom } from "./atoms";
import { AnimatePresence } from "framer-motion";
import Main from "./routes/Main";
import Bootup from "./components/Bootup";

const App = () => {
  const triggerMain = useRecoilValue(triggerMainAtom);
  const isFullscreen = useRecoilValue(isFullscreenAtom);

  return (
    <>
      <AnimatePresence mode="wait">
        {!triggerMain && isFullscreen && <Bootup key="bootup" />}
        {triggerMain && <Main key="main" />}
      </AnimatePresence>
    </>
  );
};

export default App;
