import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Slider from "../components/Slider";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.8),
      rgba(0, 0, 0, 0.3) 12%,
      transparent
    ),
    url("/images/TotkBg.jpeg") center/cover no-repeat;
`;

const SliderMenu = styled(motion.section)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 540px;
  background: linear-gradient(to bottom, #000, rgba(0, 0, 0, 0.7));
  backdrop-filter: blur(10px);
  border-radius: 40px 40px 0 0;
  display: flex;
  align-items: center;
`;

const InnerContainer = styled.div`
  width: 1700px;
  height: 100%;
  margin: 0 auto;
`;

const GameTitle = styled.h1`
  width: 675px;
  font-family: var(--font-text);
  font-size: 60px;
  font-weight: bold;
  color: var(--text-color);
  margin-bottom: 30px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const Main = () => {
  return (
    <Container>
      <InnerContainer>
        <GameTitle>The Legend of Zelda: Tears of the Kingdom</GameTitle>
        <ButtonsContainer>
          <Button text="Play" bgColor="var(--point-color)" />
          <Button
            text="More Info"
            bgColor="transparent"
            borderColor="var(--text-color)"
          />
        </ButtonsContainer>
        <SliderMenu
          initial={{ y: 540 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4, ease: "easeIn" }}
        >
          <Slider />
        </SliderMenu>
      </InnerContainer>
    </Container>
  );
};

export default Main;
