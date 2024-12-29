import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  commentsProjectStore,
  cursorChangingStore,
  triggerMainStore,
} from "../../stores";
import projects from "../../projects.json";
import { useSearchParams } from "react-router-dom";

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

const ProjectItem = styled(motion.div)<{ $backgroundPic: string }>`
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
    padding-top: 20px;
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

  @media screen and (max-width: 768px) {
    background: ${({ $backgroundPic }) =>
      `linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${$backgroundPic}) center/cover no-repeat`};
    &.active {
      background: ${({ $backgroundPic }) =>
        `linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${$backgroundPic}) center/cover no-repeat`};
      padding: 0;
      border: none;
      border-radius: 0;
    }
  }
`;

const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
  @media screen and (max-width: 768px) {
    padding: 0 20px;
    ${ProjectItem} {
      border-radius: 14px;
      height: 180px;
      padding: 20px;
      ${ProjectPic} {
        display: none;
      }
      ${ProjectContent} {
        height: 100%;
        ${ProjectTitle} {
          font-size: 24px;
          width: 100%;
          text-align: left;
          line-height: 1.2;
          ${ProjectDate} {
            font-size: 16px;
          }
        }
      }
    }
  }
`;

const projectListVariants = {
  initial: { opacity: 1 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      type: "tween",
      staggerChildren: 0.06,
    },
  },
};

const projectItemVariants = {
  initial: { opacity: 0, x: -50 },
  animate: {
    opacity: 1,
    x: 0,
  },
};

const tapAnimation = {
  scale: 0.9,
  transition: {
    duration: 0.3,
  },
};

const ProjectList = () => {
  const { setCursorChanging } = cursorChangingStore();
  const { setTriggerMain } = triggerMainStore();
  const { commentsProject, setCommentsProject } = commentsProjectStore();
  const [searchParams] = useSearchParams();

  const handleProjectClick = (projectId: string) => {
    if (projectId === commentsProject) return;

    setCommentsProject(projectId);
    window.history.pushState(null, "", `#${projectId}`);

    const element = document.getElementById(projectId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const projectId = window.location.hash.split("?")[0].replace("#", "");
    const commentId = searchParams.get("comment");

    if (!projectId && !commentId) {
      setCommentsProject(projects[0].id);
    }

    if (commentId) {
      setCommentsProject(projectId);
      setTimeout(() => {
        const element = document.getElementById(projectId);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else if (projectId) {
      setCommentsProject(projectId);
      setTimeout(() => {
        const element = document.getElementById(projectId);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }

    return () => {
      setTriggerMain(true);
    };
  }, [searchParams]);

  useEffect(() => {}, [commentsProject]);

  useEffect(() => {
    const handleHashChange = () => {
      const projectId = window.location.hash.replace("#", "");
      if (projectId && projectId !== commentsProject) {
        setCommentsProject(projectId);
        const element = document.getElementById(projectId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [commentsProject]);

  return (
    <Container
      initial="initial"
      animate="animate"
      variants={projectListVariants}
    >
      {projects.map((project, index) => (
        <ProjectItem
          id={project.id}
          key={index}
          variants={projectItemVariants}
          onMouseEnter={() => setCursorChanging(true)}
          onMouseLeave={() => setCursorChanging(false)}
          whileTap={tapAnimation}
          onClick={() => handleProjectClick(project.id)}
          className={commentsProject === project.id ? "active" : undefined}
          $backgroundPic={project.mainBg}
        >
          <ProjectPic />
          <ProjectContent>
            <ProjectTitle>
              {project.title + " " + project.subtitle}
              <ProjectDate>{project.date}</ProjectDate>
            </ProjectTitle>
          </ProjectContent>
        </ProjectItem>
      ))}
    </Container>
  );
};

export default ProjectList;
