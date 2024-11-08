import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { cursorChangingStore } from "../stores";

interface IButtonProps {
  text: string;
  icon?: React.ReactNode;
  $bgColor?: string;
  $borderColor?: string;
  $bgFilter?: string;
  onClick?: () => void;
  $width?: string;
  $order?: string;
  $scale?: string;
  $brightness?: string;
  $customHover?: string;
}

const Container = styled(motion.button)<IButtonProps>`
  width: ${({ $width }) => $width ?? "216px"};
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 40px;
  background-color: ${({ $bgColor }) => $bgColor};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.text};
  font-size: 20px;
  border: 1px solid ${({ $borderColor }) => $borderColor};
  cursor: pointer;
  backdrop-filter: blur(${({ $bgFilter }) => $bgFilter});
  transition: all 0.3s;
  &:hover {
    /* filter: brightness(${({ $brightness }) => $brightness});
    transform: scale(${({ $scale }) => $scale}); */
    ${({ $customHover }) => $customHover}
  }
  span {
    order: ${({ $order }) => $order};
  }
`;

const Button = ({
  text,
  icon,
  $bgColor = "transparent",
  $borderColor = "transparent",
  $bgFilter = "0px",
  onClick,
  $width,
  $order,
  $scale = "0.98",
  $brightness = "0.8",
  $customHover,
}: IButtonProps) => {
  const { setCursorChanging } = cursorChangingStore();
  return (
    <Container
      onClick={onClick}
      icon={icon}
      $borderColor={$borderColor}
      $bgColor={$bgColor}
      $bgFilter={$bgFilter}
      text={text}
      $width={$width}
      $order={$order}
      $scale={$scale}
      $brightness={$brightness}
      $customHover={$customHover}
      initial={{ scale: 1 }}
      whileTap={{
        scale: 0.9,
      }}
      whileHover={{
        scale: $scale,
        filter: `brightness(${$brightness})`,
      }}
      onMouseEnter={() => setCursorChanging(true)}
      onMouseLeave={() => setCursorChanging(false)}
    >
      {icon}
      <span>{text}</span>
    </Container>
  );
};

export default Button;
