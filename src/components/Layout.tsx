import { useEffect, useState } from "react";
import { isFullscreenStore } from "../stores";
import FullScreenGuide from "./FullScreenGuide";
import GlobalStyles from "../styles/globalstyles.styles";
import { AnimatePresence } from "framer-motion";
import Header from "./Header";
import Cursor from "./Cursor";
import AnimatedOutlet from "./AnimatedOutlet";

interface CursorPosition {
  x: number;
  y: number;
}

const Layout = () => {
  const [cursorPos, setCursorPos] = useState<CursorPosition>({
    x: 0,
    y: 0,
  });

  const handleMouseMove = (e: MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const { isFullscreen, setIsFullscreen } = isFullscreenStore();
  const handleFullScreenChange = () => {
    if (document.fullscreenElement) {
      setIsFullscreen(true);
    } else {
      setIsFullscreen(false);
    }
  };
  useEffect(() => {
    window.document.addEventListener(
      "fullscreenchange",
      handleFullScreenChange
    );
    return () => {
      window.document.removeEventListener(
        "fullscreenchange",
        handleFullScreenChange
      );
    };
  }, []);

  return (
    <>
      <GlobalStyles />
      <AnimatePresence mode="wait">
        {!isFullscreen && <FullScreenGuide key="fullscreen" />}
      </AnimatePresence>
      <Cursor {...cursorPos} />
      <Header />
      <AnimatePresence mode="wait">
        <AnimatedOutlet />
      </AnimatePresence>
    </>
  );
};

export default Layout;
