import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.8),
      rgba(0, 0, 0, 0.3) 88%,
      #0000
    ),
    url("/images/TotkBg.jpeg") center/cover no-repeat;
`;

const SliderMenu = styled(motion.section)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 540px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), #000);
  backdrop-filter: blur(20px);
  border-radius: 40px 40px 0 0;
`;

const Main = () => {
  return (
    <Container>
      <SliderMenu
        initial={{ y: 540 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: "easeIn" }}
      />
    </Container>
  );
};

export default Main;
