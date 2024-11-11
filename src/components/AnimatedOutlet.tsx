import { AnimatePresence } from "framer-motion";
import React from "react";
import {
  useOutlet,
  useRouteError,
  isRouteErrorResponse,
} from "react-router-dom";
import { useLocation } from "react-router-dom";
import NotFound from "../routes/NotFound";

const AnimatedOutlet = (): React.JSX.Element => {
  const location = useLocation();
  const element = useOutlet();
  const error = useRouteError();

  return (
    <AnimatePresence mode="wait">
      {isRouteErrorResponse(error) ? (
        <NotFound key="error" />
      ) : (
        element && React.cloneElement(element, { key: location.pathname })
      )}
    </AnimatePresence>
  );
};

export default AnimatedOutlet;
