import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const IntroduceText = () => {
  const [introduceText, setIntroduceText] = useState("Jon Jinu");

  useEffect(() => {
    const textInterval = setInterval(() => {
      setIntroduceText("Frontend Developer");
      setTimeout(() => {
        setIntroduceText("Jon Jinu");
      }, 3000);
    }, 6000);
    return () => clearInterval(textInterval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={introduceText}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        {introduceText}
      </motion.span>
    </AnimatePresence>
  );
};

export default React.memo(IntroduceText);
