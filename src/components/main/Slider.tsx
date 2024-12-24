import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import SliderItem from "./SliderItem";
import projects from "../../projects.json";
import { responsiveStore } from "../../stores";

const Container = styled(motion.div)`
  overflow: visible;
  display: flex;
  gap: 40px;
  width: fit-content;
  height: 400px;
  align-items: flex-end;
  @media (max-width: 768px) {
    height: 100%;
    gap: 14px;
  }
`;

const MobileSliderContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: flex-end;
  p {
    width: 100%;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    z-index: 2;
    text-align: left;
  }
`;

const HeaderBadge = styled.div`
  height: 1em;
  width: 4px;
  background: ${({ theme }) => theme.colors.text};
`;

const ProjectsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: ${({ theme }) => theme.fonts.text};
  font-size: 18px;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.colors.text};
`;

const Slider = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = useState({ right: 0, left: 0 });
  const { isResponsive } = responsiveStore();

  useEffect(() => {
    const updateConstraints = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.scrollWidth;
        const windowWidth = window.innerWidth;
        setDragConstraints({
          right: 0,
          left: -(containerWidth - windowWidth) - (isResponsive ? 50 : 150),
        });
      }
    };

    // Initial update
    updateConstraints();

    // Add resize event listener
    window.addEventListener("resize", updateConstraints);

    // Cleanup
    return () => window.removeEventListener("resize", updateConstraints);
  }, [isResponsive]);

  return (
    <>
      {isResponsive ? (
        <MobileSliderContainer>
          <ProjectsHeader>
            <HeaderBadge />
            Projects
          </ProjectsHeader>
          <Container
            ref={containerRef}
            initial={{ x: -3000 }}
            transition={{ duration: 2, ease: [0.68, -0.6, 0.32, 1.6] }}
            animate={{ x: 0 }}
            drag="x"
            dragConstraints={dragConstraints}
          >
            {projects.map((project) => (
              <SliderItem key={project.id} {...project} />
            ))}
          </Container>
        </MobileSliderContainer>
      ) : (
        <Container
          ref={containerRef}
          initial={{ x: -3000 }}
          transition={{ duration: 2, ease: [0.68, -0.6, 0.32, 1.6] }}
          animate={{ x: 0 }}
          drag="x"
          dragConstraints={dragConstraints}
        >
          {projects.map((project) => (
            <SliderItem key={project.id} {...project} />
          ))}
        </Container>
      )}
    </>
  );
};

export default Slider;
