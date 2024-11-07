import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { isFullscreenStore } from "../stores";
import FullScreenGuide from "./FullScreenGuide";
import GlobalStyles from "../styles/globalstyles.styles";
import { AnimatePresence } from "framer-motion";
import Header from "./Header";

const Layout = () => {
  const { isFullscreen, setIsFullscreen } = isFullscreenStore();
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
      </AnimatePresence>
      <Header />
      <AnimatePresence mode="wait">
        <Outlet key={location.pathname} />
      </AnimatePresence>
    </>
  );
};

export default Layout;
