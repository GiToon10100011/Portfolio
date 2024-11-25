import styled, { useTheme } from "styled-components";
import { motion, useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import Button from "../Button";
import { BackIcon, HelpIcon, PlayIcon } from "../../Icons";
import { useRef, useState } from "react";
import { cursorChangingStore } from "../../stores";
import { useNavigate } from "react-router-dom";
import { IProject } from "../../types";
import { modalAnimationVariants } from "./detailModalVariants";

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
  position: relative;
  background: ${({ theme }) => theme.colors.darkBackground};
  width: calc(100% - 440px);
  border-radius: 20px 0 0 20px;
  padding: 40px;
  overflow-y: scroll;
  scrollbar-color: ${({ theme }) =>
    `${theme.colors.itemsBorder} ${theme.colors.darkerBackground}`};
`;

const ModalHeader = styled(motion.header)`
  width: 650px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.text};
  margin-bottom: 40px;
`;

const MainTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const GameTitle = styled.h1`
  font-size: 40px;
  font-weight: bold;
  &::selection {
    color: ${({ theme }) => theme.colors.textPoint};
  }
`;

const GameSubtitle = styled.h2`
  font-size: 30px;
  font-weight: normal;
  &::selection {
    color: ${({ theme }) => theme.colors.textPoint};
  }
`;

const GithubLink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  transition: all 0.6s;
  &:hover {
    text-decoration: underline;
    img {
      transform: scale(1.1);
    }
  }
  img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    filter: grayscale(0);
    transition: all 0.6s;
  }
`;

const ModalDesc = styled.section`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 850px;
  margin-bottom: 60px;
`;
const HeaderBadge = styled.div`
  height: 1em;
  width: 6px;
  background: ${({ theme }) => theme.colors.dividerBorder};
`;
const StacksHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 28px;
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  color: ${({ theme }) => theme.colors.text};
  padding-bottom: 14px;
`;
const DescStacks = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
  margin-bottom: 40px;
`;
const StackItem = styled(motion.span)`
  padding: 6px 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.itemsBorder};
  border-radius: ${({ theme }) => theme.borderRadius.light};
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

const TroubleshootingContent = styled(motion.div)`
  counter-reset: paragraph;
  z-index: 2;
`;

const TroubleshootingItem = styled(motion.p)`
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

const ModalImg = styled(motion.img)`
  position: absolute;
  z-index: 1;
  left: 50%;
  top: -40px;
  width: 680px;
  height: 730px;
  object-fit: cover;
  pointer-events: none;
  opacity: 0.9;
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

const BlurIndicator = styled.div`
  z-index: 9;
  position: sticky;
  left: -40px;
  bottom: -40px;
  filter: blur(14px);
  background: linear-gradient(
    to bottom,
    transparent,
    ${({ theme }) => theme.colors.background}
  );
  width: 100%;
  height: 60px;
  pointer-events: none;
`;

const Detail = ({
  setIsDetailModalOpen,
  onPlay,
  modalImg,
  modalTroubleshooting,
  pages,
  title,
  subtitle,
  stacks,
  repoURL,
}: IDetailModalProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { setCursorChanging } = cursorChangingStore();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isPlaying, setIsPlaying] = useState("||");
  const troubleshootingRef = useRef<HTMLDivElement>(null);
  const isTroubleShootingInView = useInView(troubleshootingRef, {
    amount: 0.5,
  });
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
            <ModalHeader
              initial="hidden"
              animate="visible"
              variants={modalAnimationVariants.title}
            >
              <MainTitle>
                <GameTitle>{title}</GameTitle>
                <GameSubtitle>{subtitle}</GameSubtitle>
              </MainTitle>
              <GithubLink
                href={repoURL}
                target="_blank"
                onMouseEnter={() => setCursorChanging(true)}
                onMouseLeave={() => setCursorChanging(false)}
              >
                <img src="/images/icons/GithubIcon.png" alt="Github" />
                Repository
              </GithubLink>
            </ModalHeader>
            <ModalDesc>
              <StacksHeader>
                <HeaderBadge></HeaderBadge>
                Stacks
              </StacksHeader>
              <DescStacks
                initial="hidden"
                animate="visible"
                variants={modalAnimationVariants.stacks}
              >
                {stacks.map((stack, idx) => (
                  <StackItem
                    key={idx}
                    variants={modalAnimationVariants.stacksChildren}
                  >
                    {stack}
                  </StackItem>
                ))}
              </DescStacks>
              <DescTitle>{pages[currentIdx]?.title}</DescTitle>
              <DescContent>{pages[currentIdx]?.content}</DescContent>
            </ModalDesc>
            <div
              onMouseEnter={() => setCursorChanging(true)}
              onMouseLeave={() => setCursorChanging(false)}
            >
              <Slider
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
                onSwiper={(swiper) => {
                  videoRefs[swiper.realIndex].current?.play();
                  setIsPlaying("||");
                }}
                onSlideChange={(swiper) => {
                  setCurrentIdx(swiper.realIndex);
                }}
                onRealIndexChange={(swiper) => {
                  console.log(videoRefs[swiper.realIndex]);
                  videoRefs.forEach((ref) => {
                    ref.current?.pause();
                    videoRefs[swiper.realIndex].current?.play();
                    setIsPlaying("||");
                  });
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
            </div>
            <ModalTroubleshooting ref={troubleshootingRef}>
              <TroubleshootingTitle>Troubleshooting</TroubleshootingTitle>
              <TroubleshootingContent
                initial="hidden"
                animate={isTroubleShootingInView ? "visible" : undefined}
                variants={modalAnimationVariants.troubleshooting}
              >
                {modalTroubleshooting.map((content, idx) => (
                  <TroubleshootingItem
                    key={idx}
                    variants={modalAnimationVariants.troubleshootingChildren}
                  >
                    {content}
                  </TroubleshootingItem>
                ))}
              </TroubleshootingContent>
            </ModalTroubleshooting>
            <BlurIndicator />
          </LeftArea>
          <RightArea>
            <ModalImg
              initial="hidden"
              animate="visible"
              variants={modalAnimationVariants.img}
              src={modalImg}
            />
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
