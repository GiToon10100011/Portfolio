import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { isFullscreenAtom, triggerMainAtom } from "../atoms";
import FullScreenGuide from "./FullScreenGuide";
import GlobalStyles from "../styles/globalstyles.styles";
import { AnimatePresence } from "framer-motion";

const Layout = () => {
  const [isFullscreen, setIsFullscreen] = useRecoilState(isFullscreenAtom);

  window.document.addEventListener("fullscreenchange", () => {
    if (document.fullscreenElement) {
      setIsFullscreen(true);
    } else {
      setIsFullscreen(false);
    }
  });
  const location = useLocation();
  return (
    <>
      <GlobalStyles />
      <AnimatePresence mode="wait">
        {!isFullscreen && <FullScreenGuide key="fullscreen" />}
        <Outlet key={location.pathname} />
      </AnimatePresence>
    </>
  );
};

export default Layout;
