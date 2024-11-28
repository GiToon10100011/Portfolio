import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const Alert = ({ isShared }: { isShared: boolean }) => {
  const ErrorMessage = styled(motion.div)`
    position: fixed;
    top: 150px;
    right: 20px;
    background: #000;
    color: white;
    padding: 24px 32px;
    font-size: 20px;
    z-index: 2;
  `;

  const errorMessageVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  };

  return (
    <ErrorMessage
      initial="initial"
      animate="animate"
      exit="exit"
      variants={errorMessageVariants}
    >
      {isShared
        ? "✅ 링크가 복사되었습니다!"
        : "🚫 비밀번호가 일치하지 않습니다."}
    </ErrorMessage>
  );
};

export default React.memo(Alert);
