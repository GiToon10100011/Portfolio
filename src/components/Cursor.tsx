import styled from "styled-components";
import { cursorChangingStore, hideCursorStore } from "../stores";
import { motion } from "framer-motion";

interface ICursor {
  x: number;
  y: number;
}

interface ICursorElement {
  $cursorChanging: boolean;
  $hideCursor: boolean;
}

const CursorElement = styled(motion.div)<ICursorElement>`
  display: ${({ $hideCursor }) => ($hideCursor ? "none" : "block")};
  position: fixed;
  top: 0;
  left: 0;
  background: ${({ $cursorChanging }) =>
    $cursorChanging ? "none" : "rgba(104, 0, 195, 0.6)"};
  border-radius: 50%;
  width: ${({ $cursorChanging }) => ($cursorChanging ? "60px" : "30px")};
  height: ${({ $cursorChanging }) => ($cursorChanging ? "60px" : "30px")};
  border: ${({ $cursorChanging, theme }) =>
    !$cursorChanging ? "none" : `2px solid ${theme.colors.textPoint}`};
  z-index: 8;
  transform-origin: center;
  pointer-events: none;
  transition: background 0.3s, border 0.3s, width 0.3s, height 0.3s;
`;

const Cursor = ({ x, y }: ICursor) => {
  const { cursorChanging } = cursorChangingStore();
  const { hideCursor } = hideCursorStore();

  const cursorVariants = {
    default: {
      x: x - 16,
      y: y - 16,
      transition: {
        type: "tween",
        ease: "circOut",
        duration: 0.6,
      },
    },
  };

  return (
    <CursorElement
      $cursorChanging={cursorChanging}
      $hideCursor={hideCursor}
      animate="default"
      variants={cursorVariants}
    ></CursorElement>
  );
};

export default Cursor;
