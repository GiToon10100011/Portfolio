import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  commentsProjectStore,
  cursorChangingStore,
  responsiveStore,
  triggerMainStore,
} from "../../stores";
import projects from "../../projects.json";
import { useSearchParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const ProjectPic = styled.div`
  position: relative;
  aspect-ratio: 1;
  width: 154px;
  border-radius: ${({ theme }) => theme.borderRadius.main};
  border: 1px solid ${({ theme }) => theme.colors.itemsBorder};
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
// const ProjectCategories = styled.div`
//   display: flex;
//   gap: 6px;
//   color: ${({ theme }) => theme.colors.text} !important;
//   background: none !important;
//   .bg-primary {
//     padding: 4px 10px;
//     border: 1px solid ${({ theme }) => theme.colors.text} !important;
//     border-radius: ${({ theme }) => theme.borderRadius.main} !important;
//     background: none !important;
//     font-family: ${({ theme }) => theme.fonts.text} !important;
//     font-size: 14px !important;
//     font-weight: ${({ theme }) => theme.fontWeight.regular} !important;
//   }
// `;

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
  ${ProjectPic} {
    background: url(${({ $backgroundPic }) => $backgroundPic}) center top/cover
      no-repeat;
  }
  &.active {
    padding-top: 20px;
    background: ${({ theme }) => theme.colors.darkerBackground};
    border: 4px solid ${({ theme }) => theme.colors.textPoint};
    border-radius: ${({ theme }) => theme.borderRadius.sub};
    ${ProjectPic} {
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
        url(${({ $backgroundPic }) => $backgroundPic}) center top/cover
          no-repeat;
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
    height: fit-content;
    margin-bottom: 20px;
    background: ${({ $backgroundPic }) =>
      `linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${$backgroundPic}) center/cover no-repeat`};
    min-height: 140px;
    ${ProjectPic} {
      display: none;
    }
    &.active {
      background: ${({ $backgroundPic }) =>
        `linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${$backgroundPic}) center/cover no-repeat`};
      padding: 0;
      border: none;
      border-radius: 0;
    }
    &:hover:not(.active) {
      ${ProjectTitle} {
        color: ${({ theme }) => theme.colors.text};
      }
      border: none;
    }
  }
`;

const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
  @media screen and (max-width: 768px) {
    .swiper-wrapper {
      height: 210px;
    }
    .swiper-pagination-bullet {
      width: 6px;
      height: 6px;
      background: ${({ theme }) => theme.colors.text};
    }
    .swiper-pagination-bullet-active {
      background: ${({ theme }) => theme.colors.textPoint};
    }
    ${ProjectItem} {
      border: none;
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
  const { isResponsive } = responsiveStore();
  const [searchParams] = useSearchParams();
  const [currentIdx, setCurrentIdx] = useState(0);

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
    if (!isResponsive) {
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
    }
  }, [searchParams, isResponsive]);

  useEffect(() => {
    if (!isResponsive) {
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
    }
  }, [commentsProject, isResponsive]);

  useEffect(() => {
    return;
  }, [currentIdx]);

  return (
    <Container
      initial="initial"
      animate="animate"
      variants={projectListVariants}
    >
      {!isResponsive ? (
        projects.map((project, index) => (
          <ProjectItem
            id={project.id}
            key={index}
            variants={projectItemVariants}
            onMouseEnter={() => setCursorChanging(true)}
            onMouseLeave={() => setCursorChanging(false)}
            whileTap={tapAnimation}
            onClick={() => handleProjectClick(project.id)}
            className={commentsProject === project.id ? "active" : undefined}
            $backgroundPic={project.thumbnailImg}
          >
            <ProjectPic />
            <ProjectContent>
              <ProjectTitle>
                {project.title + " " + project.subtitle}
                <ProjectDate>{project.date}</ProjectDate>
              </ProjectTitle>
            </ProjectContent>
          </ProjectItem>
        ))
      ) : (
        <Swiper
          slidesPerView={1}
          slidesPerGroup={1}
          spaceBetween={20}
          modules={[Pagination]}
          pagination={{ clickable: true }}
          onSwiper={(swiper) => {
            const projectIndex = projects.findIndex(
              (project) => project.id === commentsProject
            );
            setCurrentIdx(projectIndex);
            swiper.slideTo(projectIndex);
          }}
          onSlideChange={(swiper) => {
            setCurrentIdx(swiper.realIndex);
            const currentProject = projects[swiper.realIndex];
            setCommentsProject(currentProject.id);
            window.history.pushState(null, "", `#${currentProject.id}`);
          }}
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index}>
              <ProjectItem
                key={index}
                className={
                  commentsProject === project.id ? "active" : undefined
                }
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
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Container>
  );
};

export default ProjectList;
