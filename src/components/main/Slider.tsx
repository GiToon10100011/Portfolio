import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import SliderItem from "./SliderItem";

const Container = styled(motion.div)`
  overflow: visible;
  display: flex;
  gap: 40px;
  width: fit-content;
  height: 400px;
  align-items: flex-end;
`;

const Slider = () => {
  return (
    <Container
      initial={{ x: -3000 }}
      transition={{ duration: 2, ease: [0.68, -0.6, 0.32, 1.6] }}
      animate={{ x: 0 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
    >
      <SliderItem isActive="active" />
      <SliderItem />
      <SliderItem />
      <SliderItem />
      <SliderItem />
      <SliderItem />
      <SliderItem />
      <SliderItem />
      <SliderItem />
      <SliderItem />
    </Container>
  );
};

export default Slider;
