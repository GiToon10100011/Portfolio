import styled, { useTheme } from "styled-components";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import Button from "./Button";
import { HelpIcon, PlayIcon } from "../Icons";

const Wrapper = styled(motion.main)`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  backdrop-filter: blur(40px);
  z-index: 9;
  top: 0;
  left: 0;
  font-family: ${({ theme }) => theme.fonts.text};
  color: ${({ theme }) => theme.colors.text};
`;

const Modal = styled.div`
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
  font-size: 22px;
  line-height: 1.2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
  text-overflow: ellipsis;
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
`;

const SliderItem = styled(SwiperSlide)`
  border: 1px solid;
  width: 500px !important;
  height: 300px;
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

const TroubleshootingContent = styled.p`
  counter-reset: paragraph;
`;

const TroubleshootingItem = styled.p`
  font-size: 22px;
  line-height: 1.2;
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

const Detail = () => {
  const theme = useTheme();
  const pagers = {
    clickable: true,
    renderBullet: (index: number, className: string) => {
      return `<Pager class="${className}"></Pager>`;
    },
  };
  return (
    <>
      <Wrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Modal>
          <LeftArea>
            <ModalHeader>
              <GameTitle>The Legend of Zelda:</GameTitle>
              <GameSubtitle>Tears of the Kingdom</GameSubtitle>
            </ModalHeader>
            <ModalDesc>
              <DescTitle>Subtitle</DescTitle>
              <DescContent>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam soluta blanditiis mollitia atque officiis. Distinctio
                officia ea eveniet quibusdam pariatur, earum natus dolorem
                exercitationem, voluptatibus quos temporibus aperiam? Qui, aut.
                Ullam aut iusto autem tempore quos, dignissimos sint odio
                molestias atque quod debitis nihil in cupiditate nam enim
              </DescContent>
            </ModalDesc>
            <Slider
              effect="coverflow"
              spaceBetween={30}
              slidesPerView={"auto"}
              modules={[EffectCoverflow, Pagination]}
              coverflowEffect={{
                stretch: -20,
                rotate: 0,
              }}
              pagination={pagers}
              grabCursor={true}
              loop={true}
              centeredSlides={true}
            >
              <SliderItem>Slide1</SliderItem>
              <SliderItem>Slide2</SliderItem>
              <SliderItem>Slide3</SliderItem>
              <SliderItem>Slide4</SliderItem>
              <SliderItem>Slide4</SliderItem>
              <SliderItem>Slide4</SliderItem>
              <SliderItem>Slide4</SliderItem>
              <SliderItem>Slide4</SliderItem>
            </Slider>
            <ModalTroubleshooting>
              <TroubleshootingTitle>Troubleshooting</TroubleshootingTitle>
              <TroubleshootingContent>
                <TroubleshootingItem>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Blanditiis deserunt aperiam aliquam similique accusantium id
                  dolores tenetur sunt ad perspiciatis dolor modi, debitis
                  veniam explicabo rem. Laudantium alias id earum!
                </TroubleshootingItem>
                <TroubleshootingItem>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Blanditiis deserunt aperiam aliquam similique accusantium id
                  dolores tenetur sunt ad perspiciatis dolor modi, debitis
                  veniam explicabo rem. Laudantium alias id earum!
                </TroubleshootingItem>
                <TroubleshootingItem>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Blanditiis deserunt aperiam aliquam similique accusantium id
                  dolores tenetur sunt ad perspiciatis dolor modi, debitis
                  veniam explicabo rem. Laudantium alias id earum!
                </TroubleshootingItem>
              </TroubleshootingContent>
            </ModalTroubleshooting>
          </LeftArea>
          <RightArea>
            <ModalImg src="/images/zeldaProjectModal.png" />
            <ButtonContainer>
              <Button
                icon={<PlayIcon />}
                text="Play Now"
                $width="100%"
                $bgColor={theme.colors.point}
              />
              <Button
                icon={<HelpIcon />}
                text="Review"
                $width="100%"
                $order="2"
                $borderColor={theme.colors.text}
                $bgFilter="4px"
              />
            </ButtonContainer>
          </RightArea>
        </Modal>
      </Wrapper>
    </>
  );
};

export default Detail;
