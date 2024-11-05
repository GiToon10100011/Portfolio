import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Main from "./Main";

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
`;

const Modal = styled.div`
  width: 1520px;
  height: 880px;
  display: flex;
`;

const LeftArea = styled.div`
  width: calc(100% - 440px);
`;

const ModalHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 10px;
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
          </LeftArea>
          <RightArea></RightArea>
        </Modal>
      </Wrapper>
      <Main />
    </>
  );
};

export default Detail;
