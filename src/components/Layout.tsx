import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { isFullscreenStore } from "../stores";
import FullScreenGuide from "./FullScreenGuide";
import GlobalStyles from "../styles/globalstyles.styles";
import { AnimatePresence } from "framer-motion";
import Header from "./Header";
import Cursor from "./Cursor";

interface CursorPosition {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
}

const Layout = () => {
  const [cursorPos, setCursorPos] = useState<CursorPosition>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });
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

  const speed = 0.1;
  const size = 10;

  const handleMouseMove = (e: MouseEvent) => {
    setCursorPos((prev) => ({
      ...prev,
      x: e.pageX,
      y: e.pageY,
    }));
  };

  useEffect(() => {
    const loop = () => {
      setCursorPos((prev) => ({
        ...prev,
        targetX: prev.targetX + (prev.x - prev.targetX) * speed,
        targetY: prev.targetY + (prev.y - prev.targetY) * speed,
      }));
      requestAnimationFrame(loop);
    };

    const animationId = requestAnimationFrame(loop);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const cursorStyle = {
    transform: `translate(${cursorPos.targetX - size / 2}px, ${
      cursorPos.targetY - size / 1.4
    }px)`,
  };

  const location = useLocation();
  return (
    <>
      <GlobalStyles />
      <AnimatePresence mode="wait">
        {!isFullscreen && <FullScreenGuide key="fullscreen" />}
      </AnimatePresence>
      {/* <Cursor {...cursorStyle} /> */}
      <Header />
      <AnimatePresence mode="wait">
        <Outlet key={location.pathname} />
      </AnimatePresence>
    </>
  );
};

export default Layout;
