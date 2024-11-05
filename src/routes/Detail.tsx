import React from "react";
import styled from "styled-components";

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  backdrop-filter: blur(40px);
`;

const Modal = styled.div`
  width: 1520px;
  height: 880px;
`;

const LeftArea = styled.div`
  width: calc(100% - 440px);
`;

const GameTitle = styled.h1`
  font-size: 40px;
  font-weight: 600;
`;

const GameSubtitle = styled.h2`
  font-size: 30px;
  font-weight: normal;
`;

const RightArea = styled.div`
  width: 440px;
`;

const Detail = () => {
  return (
    <Wrapper>
      <Modal>
        <LeftArea>
          <GameTitle>The Legend of Zelda:</GameTitle>
          <GameSubtitle>Tears of the Kingdom</GameSubtitle>
        </LeftArea>
        <RightArea></RightArea>
      </Modal>
    </Wrapper>
  );
};

export default Detail;
