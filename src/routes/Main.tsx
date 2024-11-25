import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import Button from "../components/Button";
import Slider from "../components/main/Slider";
import { MoreInfoIcon, PlayIcon } from "../Icons";
import { useTheme } from "styled-components";
import { useNavigate } from "react-router-dom";
import DetailModal from "../components/main/DetailModal";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { isPlayingStore, projectIdStore } from "../stores";
import projects from "../projects.json";
import { IProject } from "../types";

const Container = styled.div<{ $mainBg?: string }>`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  padding-top: 190px;
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.8),
      rgba(0, 0, 0, 0.3) 12%,
      transparent
    ),
    url(${({ $mainBg }) => $mainBg}) center/cover no-repeat !important;
`;

const SliderMenu = styled(motion.section)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 540px;
  background: linear-gradient(to top, #000, rgba(0, 0, 0, 0.7));
  backdrop-filter: blur(10px);
  border-radius: 40px 40px 0 0;
  display: flex;
  align-items: center;
`;

const InnerContainer = styled.div`
  width: 1700px;
  margin: 0 auto;
`;

const SliderInnerContainer = styled(InnerContainer)`
  display: flex;
  height: 540px;
  align-items: center;
`;

const GameTitle = styled.h1`
  width: 720px;
  font-family: ${({ theme }) => theme.fonts.text};
  font-size: 60px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 30px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const Main = () => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const { setIsPlaying } = isPlayingStore();
  const { projectId, setProjectId } = projectIdStore();
  const theme = useTheme();
  const navigate = useNavigate();
  const idMatchData = projects.find((project) => project.id === projectId);
  console.log(idMatchData);
  const onHandlePlay = () => {
    setIsPlaying(true);
    setTimeout(() => {
      navigate(`/redirect/${idMatchData?.id}`);
      setIsPlaying(false);
    }, 600);
  };

  useEffect(() => {
    setProjectId(projects[0].id);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isDetailModalOpen && (
          <DetailModal
            key="detailModal"
            setIsDetailModalOpen={setIsDetailModalOpen}
            onPlay={onHandlePlay}
            {...(idMatchData as IProject)}
          />
        )}
      </AnimatePresence>
      <Container $mainBg={idMatchData?.mainBg}>
        <InnerContainer>
          <GameTitle>
            {idMatchData?.title + " " + idMatchData?.subtitle || <Skeleton />}
          </GameTitle>
          <ButtonsContainer>
            <Button
              text="Play"
              $bgColor={theme.colors.point}
              icon={<PlayIcon />}
              onClick={onHandlePlay}
            />
            <Button
              onClick={() => setIsDetailModalOpen(true)}
              text="More Info"
              $bgColor="transparent"
              $bgFilter="4px"
              $borderColor={theme.colors.text}
              icon={<MoreInfoIcon />}
            />
          </ButtonsContainer>
          <SliderMenu
            initial={{ y: 540 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.4, ease: "easeIn" }}
          >
            <SliderInnerContainer>
              <Slider />
            </SliderInnerContainer>
          </SliderMenu>
        </InnerContainer>
      </Container>
    </>
  );
};

export default Main;
