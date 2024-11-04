import React from "react";
import styled from "styled-components";

interface ISliderProps {
  isActive?: string;
}

const Item = styled.div`
  width: 260px;
  height: 346px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  &.active {
    width: 300px;
    height: 400px;
    border: 4px solid white;
  }
`;

const SliderItem = ({ isActive }: ISliderProps) => {
  return <Item className={isActive ?? ""}>1</Item>;
};

export default SliderItem;
