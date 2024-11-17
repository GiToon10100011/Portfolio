import styled, { useTheme } from "styled-components";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import Button from "./Button";
import { BackIcon, HelpIcon, PlayIcon } from "../Icons";
import { useRef, useState } from "react";
import { cursorChangingStore } from "../stores";
import { useNavigate } from "react-router-dom";
import { IProject } from "../types";

interface IDetailModalProps extends IProject {
  setIsDetailModalOpen: (value: boolean) => void;
  onPlay: () => void;
}

const Wrapper = styled(motion.main)`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  backdrop-filter: blur(40px);
  z-index: 7;
  top: 0;
  left: 0;
  font-family: ${({ theme }) => theme.fonts.text};
  color: ${({ theme }) => theme.colors.text};
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Modal = styled.div`
  position: relative;
  width: 1520px;
  height: 880px;
  display: flex;
`;

const LeftArea = styled.div`
  background: ${({ theme }) => theme.colors.darkBackground};
  width: calc(100% - 440px);
  border-radius: 20px 0 0 20px;
  padding: 40px;
  overflow-y: scroll;
  scrollbar-width: none;
`;

const ModalHeader = styled.header`
  width: 650px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.text};
  margin-bottom: 60px;
`;

const GameTitle = styled.h1`
  font-size: 40px;
  font-weight: bold;
`;

const GameSubtitle = styled.h2`
  font-size: 30px;
  font-weight: normal;
`;

const ModalDesc = styled.section`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 850px;
  margin-bottom: 60px;
`;
const DescTitle = styled.h4`
  font-size: 32px;
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
`;
const DescContent = styled.p`
  font-size: 20px;
  line-height: 1.4;
`;

const Slider = styled(Swiper)`
  margin-bottom: 60px;
  .swiper-wrapper {
    position: relative;
    height: 340px;
  }
  .swiper-pagination {
    position: absolute;
    bottom: 0;
  }
  .swiper-pagination-bullet {
    background: rgba(255, 255, 255, 0.4);
    opacity: 1;
  }

  .swiper-pagination-bullet-active {
    background: ${({ theme }) => theme.colors.text};
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: ${({ theme }) => theme.colors.text};
    width: 30px;
    height: 30px;
  }
`;

const SliderItem = styled(SwiperSlide)`
  position: relative;
  width: 500px !important;
  height: 300px;
  video {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
    pointer-events: all;
  }
  &::before {
    content: attr(data-content);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s;
    width: 50px;
    height: 50px;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({ theme }) => theme.colors.darkBackground};
    border-radius: 50%;
    opacity: 0;
  }
  &:hover {
    &::before {
      opacity: 1;
    }
  }
`;

const Pager = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.text};
`;

const ModalTroubleshooting = styled.section`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const TroubleshootingTitle = styled.h4`
  font-size: 32px;
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
`;

const TroubleshootingContent = styled.div`
  counter-reset: paragraph;
  z-index: 2;
`;

const TroubleshootingItem = styled.p`
  font-size: 22px;
  line-height: 1.5;
  margin-bottom: 40px;
  display: flex;
  &::before {
    counter-increment: paragraph;
    content: counter(paragraph) ". ";
    margin-right: 8px;
  }
`;

const RightArea = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.darkerBackground};
  width: 440px;
  border-radius: 0 20px 20px 0;
`;

const ModalImg = styled.img`
  position: absolute;
  left: 50%;
  top: -40px;
  transform: translateX(-50%);
  width: 680px;
  height: 730px;
  object-fit: cover;
`;

const ButtonContainer = styled.div`
  width: 360px;
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 14px;
`;

const CloseModal = styled.button`
  position: absolute;
  bottom: -60px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 28px;
  font-family: ${({ theme }) => theme.fonts.text};
  right: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  svg {
    width: 30px;
    height: 30px;
    background: #000;
    border-radius: 50%;
  }
`;

const Detail = ({
  setIsDetailModalOpen,
  onPlay,
  modalImg,
  modalTroubleshooting,
  pages,
  title,
  subtitle,
}: IDetailModalProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { setCursorChanging } = cursorChangingStore();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isPlaying, setIsPlaying] = useState("||");
  const videoRefs = [
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
  ];
  const pagers = {
    clickable: true,
    renderBullet: (_: number, className: string) => {
      return `<Pager class="${className}"></Pager>`;
    },
  };
  const whileHoverInfo = () => {
    setIsHovering(true);
  };
  const whileHoverExit = () => {
    setIsHovering(false);
  };
  const navigateComments = () => {
    navigate("/comments");
  };
  console.log(isPlaying);
  return (
    <>
      <Wrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Overlay onClick={() => setIsDetailModalOpen(false)} />
        <Modal>
          <LeftArea>
            <ModalHeader>
              <GameTitle>{title}</GameTitle>
              <GameSubtitle>{subtitle}</GameSubtitle>
            </ModalHeader>
            <ModalDesc>
              <DescTitle>{pages[currentIdx]?.title}</DescTitle>
              <DescContent>{pages[currentIdx]?.content}</DescContent>
            </ModalDesc>
            <Slider
              onMouseOver={() => {
                console.log("over");
                setCursorChanging(true);
              }}
              onMouseOut={() => setCursorChanging(false)}
              effect="coverflow"
              spaceBetween={30}
              slidesPerView={"auto"}
              modules={[EffectCoverflow, Pagination, Navigation]}
              navigation={true}
              coverflowEffect={{
                stretch: -20,
                rotate: 0,
              }}
              pagination={pagers}
              grabCursor={true}
              loop={true}
              centeredSlides={true}
              onSlideChange={(swiper) => {
                console.log(swiper);
                setCurrentIdx(swiper.realIndex);
                if (currentIdx === swiper.realIndex) {
                  videoRefs.forEach((ref) => {
                    ref.current?.pause();
                  });
                  videoRefs[currentIdx].current?.play();
                  setIsPlaying("||");
                }
              }}
            >
              {pages.map((page, idx) => (
                <SliderItem
                  key={idx}
                  data-content={isPlaying}
                  onDoubleClick={() => {
                    videoRefs[idx].current?.requestFullscreen();
                  }}
                  onClick={
                    currentIdx === idx
                      ? () => {
                          const video = videoRefs[idx].current;
                          if (!video) return;

                          if (video.paused) {
                            video.play();
                            setIsPlaying("||");
                          } else {
                            video.pause();
                            setIsPlaying("\u25B6");
                          }
                        }
                      : undefined
                  }
                >
                  <video
                    ref={videoRefs[idx]}
                    src={page.video}
                    loop
                    muted
                    poster={page.poster}
                  />
                </SliderItem>
              ))}
            </Slider>
            <ModalTroubleshooting>
              <TroubleshootingTitle>Troubleshooting</TroubleshootingTitle>
              <TroubleshootingContent>
                {modalTroubleshooting.map((content, idx) => (
                  <TroubleshootingItem key={idx}>{content}</TroubleshootingItem>
                ))}
              </TroubleshootingContent>
            </ModalTroubleshooting>
          </LeftArea>
          <RightArea>
            <ModalImg src={modalImg} />
            <ButtonContainer>
              <Button
                icon={<PlayIcon />}
                text="Play Now"
                $width="100%"
                $bgColor={theme.colors.point}
                onClick={onPlay}
              />
              <Button
                icon={
                  <HelpIcon
                    onHover={whileHoverInfo}
                    onExit={whileHoverExit}
                    content="방명록을 통해 피드백 등을 
                  남기실 수 있습니다. "
                    $isHovering={isHovering}
                  />
                }
                text="Review"
                $width="100%"
                $order="-1"
                $borderColor={theme.colors.text}
                $bgFilter="4px"
                $scale="1"
                $brightness="1"
                $customHover={`background: white; color: black; path{stroke: black;}`}
                onClick={navigateComments}
              />
            </ButtonContainer>
          </RightArea>
          <CloseModal
            onClick={() => setIsDetailModalOpen(false)}
            onMouseEnter={() => setCursorChanging(true)}
            onMouseLeave={() => setCursorChanging(false)}
          >
            <BackIcon />
            <span>Back</span>
          </CloseModal>
        </Modal>
      </Wrapper>
    </>
  );
};

export default Detail;
