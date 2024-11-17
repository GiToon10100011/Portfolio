import { motion } from "framer-motion";
import { useRef } from "react";
import styled from "styled-components";
import SliderItem from "./SliderItem";
import { data as projects } from "../../projects.json";

const Container = styled(motion.div)`
  overflow: visible;
  display: flex;
  gap: 40px;
  width: fit-content;
  height: 400px;
  align-items: flex-end;
`;

const Slider = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <Container
      ref={containerRef}
      initial={{ x: -3000 }}
      transition={{ duration: 2, ease: [0.68, -0.6, 0.32, 1.6] }}
      animate={{ x: 0 }}
      drag="x"
      dragConstraints={{
        right: 0,
        left: containerRef.current?.getBoundingClientRect().width,
      }}
    >
      {projects.map((project) => (
        <SliderItem key={project.id} {...project} />
      ))}
    </Container>
  );
};

export default Slider;
