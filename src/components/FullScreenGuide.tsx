import styled from "styled-components";
import { FullScreenIcon } from "../Icons";
import { motion } from "framer-motion";
import { isFullscreenStore } from "../stores";

const Container = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.colors.subBackground};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const Guidance = styled.h1`
  position: absolute;
  bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  font-family: ${({ theme }) => theme.fonts.text};
  font-size: 28px;
  color: ${({ theme }) => theme.colors.text};
  span:last-child {
    font-size: 20px;
  }
`;

const IconContainer = styled(motion.div)`
  cursor: pointer;
`;

const FullScreenGuide = () => {
  const { setIsFullscreen } = isFullscreenStore();
  const setFullscreen = () => {
    document.documentElement.requestFullscreen();
    setIsFullscreen(true);
  };
  return (
    <Container
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 2 }}
      transition={{ duration: 0.6 }}
    >
      <IconContainer
        onClick={setFullscreen}
        whileHover={{
          opacity: 0.8,
          scale: 1.1,
          transition: { duration: 1, type: "spring" },
        }}
      >
        <FullScreenIcon />
      </IconContainer>
      <Guidance>
        <span>Press the Fullscreen Button to continue..</span>
      </Guidance>
    </Container>
  );
};

export default FullScreenGuide;
