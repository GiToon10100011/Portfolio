import React, { useEffect } from "react";
import styled from "styled-components";
import { Badge } from "react-bootstrap";
import { motion } from "framer-motion";
import { triggerMainStore } from "../../stores";

const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

const ProjectPic = styled.div`
  position: relative;
  aspect-ratio: 1;
  width: 154px;
  border-radius: ${({ theme }) => theme.borderRadius.main};
  border: 1px solid ${({ theme }) => theme.colors.itemsBorder};
  background: url("/images/zeldaProjectThumbnail.png") center top/cover
    no-repeat;
`;

const ProjectContent = styled.div`
  height: 154px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const ProjectTitle = styled.h2`
  font-size: 28px;
  width: 360px;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition: all 0.3s ease;
`;
const ProjectDate = styled.span`
  display: block;
  color: ${({ theme }) => theme.colors.lightBorder};
  font-size: 16px;
`;
const ProjectCategories = styled.div`
  display: flex;
  gap: 6px;
  color: ${({ theme }) => theme.colors.text} !important;
  background: none !important;
  .bg-primary {
    padding: 4px 10px;
    border: 1px solid ${({ theme }) => theme.colors.text} !important;
    border-radius: ${({ theme }) => theme.borderRadius.main} !important;
    background: none !important;
    font-family: ${({ theme }) => theme.fonts.text} !important;
    font-size: 14px !important;
    font-weight: ${({ theme }) => theme.fontWeight.regular} !important;
  }
`;

const ProjectItem = styled(motion.div)`
  width: 100%;
  height: 190px;
  padding: 20px;
  padding-top: 0;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  border: 4px solid transparent;
  border-bottom: 1px solid ${({ theme }) => theme.colors.itemsBorder};
  border-radius: 0;
  transition: all 0.3s ease;
  cursor: pointer;
  &.active {
    background: ${({ theme }) => theme.colors.darkerBackground};
    border: 4px solid ${({ theme }) => theme.colors.textPoint};
    border-radius: ${({ theme }) => theme.borderRadius.sub};
    ${ProjectPic} {
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
        url("/images/zeldaProjectThumbnail.png") center top/cover no-repeat;
      &::before {
        content: "선택됨";
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        font-family: ${({ theme }) => theme.fonts.krText};
        color: ${({ theme }) => theme.colors.text};
        font-size: 18px;
      }
    }
  }
  &:first-child {
    padding-top: 20px;
  }
  &:hover:not(.active) {
    border-left: 4px solid ${({ theme }) => theme.colors.textPoint};
    ${ProjectTitle} {
      color: ${({ theme }) => theme.colors.textPoint};
    }
  }
`;

const projectListVariants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      type: "spring",
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const projectItemVariants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
  },
  tap: {
    scale: 0.9,
    transition: {
      duration: 0.3,
    },
  },
};

const ProjectList = () => {
  const { setTriggerMain } = triggerMainStore();
  useEffect(() => {
    return () => {
      setTriggerMain(true);
    };
  }, []);
  return (
    <Container
      initial="initial"
      animate="animate"
      variants={projectListVariants}
    >
      <ProjectItem
        className="active"
        variants={projectItemVariants}
        whileTap="tap"
      >
        <ProjectPic></ProjectPic>
        <ProjectContent>
          <ProjectTitle>
            The Legend of Zelda: Tears of the Kingdom
            <ProjectDate>2024.11.10</ProjectDate>
          </ProjectTitle>
          <ProjectCategories>
            <Badge>TypeScript</Badge>
            <Badge>React</Badge>
          </ProjectCategories>
        </ProjectContent>
      </ProjectItem>
      {Array.from({ length: 20 }).map((_, index) => (
        <ProjectItem key={index} variants={projectItemVariants} whileTap="tap">
          <ProjectPic></ProjectPic>
          <ProjectContent>
            <ProjectTitle>
              The Legend of Zelda: Tears of the Kingdom
              <ProjectDate>2024.11.10</ProjectDate>
            </ProjectTitle>
            <ProjectCategories>
              <Badge>TypeScript</Badge>
              <Badge>React</Badge>
            </ProjectCategories>
          </ProjectContent>
        </ProjectItem>
      ))}
    </Container>
  );
};

export default ProjectList;
