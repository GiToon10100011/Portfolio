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
  color: var(--text-color);
  font-family: var(--font-text);
  font-size: 20px;
  border: 1px solid ${({ borderColor }) => borderColor};
  cursor: pointer;
  ${({ bgFilter }) => bgFilter}
`;

const Button = ({
  text,
  icon,
  bgColor,
  borderColor,
  bgFilter,
  onClick,
}: IButtonProps) => {
  return (
    <Container
      onClick={onClick ?? undefined}
      icon={icon ?? undefined}
      bgColor={bgColor ?? "var(--point-color)"}
      borderColor={borderColor ?? "transparent"}
      bgFilter={bgFilter ?? "0px"}
      text={text}
    >
      {icon}
      {text}
    </Container>
  );
};

export default Button;
