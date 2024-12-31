import styled from "styled-components";
import { sliderAnimations } from "../../styles/animations";
import { motion } from "framer-motion";
import {
  cursorChangingStore,
  isPlayingStore,
  projectIdStore,
} from "../../stores";
import { IProject } from "../../types";

interface ISliderProps extends IProject {
  isActive?: string;
}

interface IItemProps {
  $thumbnailImg: string;
  $id: string;
}

const Item = styled(motion.div)<IItemProps>`
  overflow: hidden;
  width: 260px;
  height: 346px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  cursor: pointer;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)),
    url(${({ $thumbnailImg }) => $thumbnailImg}) no-repeat center/cover;
  transition: all 0.3s ease-in-out;
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
      url(${({ $thumbnailImg }) => $thumbnailImg}) no-repeat center/cover;
    transition: all 0.3s ease-in-out;
    cursor: default;
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
  @media (max-width: 768px) {
    width: 130px;
    height: 200px;
    &.active {
      width: 150px;
      height: 230px;
      &::before {
        width: 150px;
        height: 60px;
        font-size: 12px;
        padding-left: 10px;
        line-height: 18px;
      }
    }
  }
`;

const SliderItem = ({ thumbnailContent, thumbnailImg, id }: ISliderProps) => {
  const { isPlaying } = isPlayingStore();
  const { projectId, setProjectId } = projectIdStore();
  const { setCursorChanging } = cursorChangingStore();
  const idMatch = id === projectId;
  return (
    <Item
      className={idMatch ? "active" : ""}
      data-content={thumbnailContent}
      animate={{
        scale: isPlaying && idMatch ? [0.5, 1] : 1,
      }}
      transition={{
        duration: 0.3,
      }}
      onMouseEnter={!idMatch ? () => setCursorChanging(true) : undefined}
      onMouseLeave={!idMatch ? () => setCursorChanging(false) : undefined}
      onClick={() => {
        setProjectId(id as string);
      }}
      $thumbnailImg={thumbnailImg}
      $id={id}
    />
  );
};

export default SliderItem;
