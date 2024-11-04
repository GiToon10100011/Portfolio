import React from "react";
import styled from "styled-components";

interface IButtonProps {
  text: string;
  icon?: React.ReactNode;
  bgColor?: string;
  borderColor?: string;
  bgFilter?: string;
  onClick?: () => void;
}

const Container = styled.button<IButtonProps>`
  width: 216px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 40px;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.text};
  font-size: 20px;
  border: 1px solid ${({ borderColor }) => borderColor};
  cursor: pointer;
  backdrop-filter: blur(${({ bgFilter }) => bgFilter});
  transition: all 0.3s;
  &:hover {
    filter: brightness(0.8);
    transform: scale(0.98);
  }
`;

const Button = ({
  text,
  icon,
  bgColor = "transparent",
  borderColor = "transparent",
  bgFilter = "0px",
  onClick,
}: IButtonProps) => {
  return (
    <Container
      onClick={onClick}
      icon={icon}
      bgColor={bgColor}
      borderColor={borderColor}
      bgFilter={bgFilter}
      text={text}
    >
      {icon}
      {text}
    </Container>
  );
};

export default Button;
