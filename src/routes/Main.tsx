import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import Button from "../components/Button";
import Slider from "../components/main/Slider";
import { MoreInfoIcon, PlayIcon } from "../Icons";
import Header from "../components/Header";
import { useTheme } from "styled-components";
import { useNavigate } from "react-router-dom";
import DetailModal from "../components/DetailModal";
import { useState } from "react";
import { isPlayingStore } from "../stores";

const testKey = "tloztotk";

const Container = styled.div`
  position: relative;
  overflow: hidden;
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
  width: 675px;
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
  const theme = useTheme();
  const navigate = useNavigate();

  const onHandlePlay = () => {
    setIsPlaying(true);
    setTimeout(() => {
      navigate(`/redirect/${testKey}`);
      setIsPlaying(false);
    }, 300);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isDetailModalOpen && (
          <DetailModal
            key="detailModal"
            setIsDetailModalOpen={setIsDetailModalOpen}
          />
        )}
      </AnimatePresence>
      <Container>
        <Header />
        <InnerContainer>
          <GameTitle>The Legend of Zelda: Tears of the Kingdom</GameTitle>
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
