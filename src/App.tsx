import React from "react";
import Bootup from "./components/Bootup";
import GlobalStyles from "./styles/globalstyles.styles";
import { useRecoilValue } from "recoil";
import { triggerMain } from "./atoms";
import { AnimatePresence } from "framer-motion";
import Main from "./routes/Main";

const App = () => {
  const triggerMainValue = useRecoilValue(triggerMain);

  return (
    <>
      <GlobalStyles />
      <AnimatePresence mode="wait">
        {/* {!triggerMainValue && <Bootup key="bootup" />}
        {triggerMainValue && <Main key="main" />} */}
        <Main />
      </AnimatePresence>
    </>
  );
};

export default App;
