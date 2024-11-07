import React from "react";
import styled from "styled-components";
import { sliderAnimations } from "../../styles/animations";
import { AnimatePresence, motion } from "framer-motion";
import { isPlayingStore } from "../../stores";

// const text = "Fullpage.JS를 활용한\n사이드 프로젝트";

interface ISliderProps {
  isActive?: string;
}

const Item = styled(motion.div)`
  overflow: hidden;
  width: 260px;
  height: 346px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;

  &.active {
    position: relative;
    width: 300px;
    height: 400px;
    border: 4px solid white;
    background: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0.2)
      ),
      url("/images/zeldaProjectThumbnail.png") no-repeat center/cover;
    &::before {
      content: attr(data-content);
      position: absolute;
      bottom: 0;
      left: 0;
      width: 300px;
      height: 100px;
      transform: translateY(100%);
      padding-left: 20px;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      white-space: pre-wrap;
      font-size: 18px;
      line-height: 24px;
      color: ${({ theme }) => theme.colors.text};
      font-family: ${({ theme }) => theme.fonts.krText};
      animation: ${sliderAnimations.slideIn} 0.6s ease-in-out both;
    }
  }
`;

const SliderItem = ({ isActive }: ISliderProps) => {
  const { isPlaying } = isPlayingStore();
  return (
    <Item
      data-content={"Fullpage.JS를 활용한\n사이드 프로젝트"}
      className={isActive ?? ""}
      animate={{
        scale: isPlaying && isActive === "active" ? [0.9, 1] : 1,
      }}
      transition={{
        duration: 0.3,
      }}
    />
  );
};

export default SliderItem;
