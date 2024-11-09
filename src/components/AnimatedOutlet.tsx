import { AnimatePresence } from "framer-motion";
import React from "react";
import { useOutlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

const AnimatedOutlet = (): React.JSX.Element => {
  const location = useLocation();
  const element = useOutlet();

  return (
    <AnimatePresence mode="wait">
      {element && React.cloneElement(element, { key: location.pathname })}
    </AnimatePresence>
  );
};

export default AnimatedOutlet;
