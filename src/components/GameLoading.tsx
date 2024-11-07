import styled from "styled-components";
import nintendoLogo from "../svgs/NintendoLogo.svg";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #000;
  font-family: ${({ theme }) => theme.fonts.nintendo};
  color: ${({ theme }) => theme.colors.text};
`;

const NintendoLogo = styled.img`
  position: absolute;
  top: 50px;
  left: 50px;
`;

const NintendoSwitchLogo = styled.div`
  display: flex;
`;

const LoadingContainer = styled.div`
  position: absolute;
  bottom: 50px;
  right: 50px;
  display: flex;
  align-items: center;
  gap: 14px;
`;
const LeftPart = styled.img``;
const RightPart = styled.img``;
const LoadingText = styled.div``;
const UpperText = styled.span`
  font-size: 40px;
  letter-spacing: 0.35em;
`;
const LowerText = styled.p`
  font-size: 72px;
  letter-spacing: 0.06em;
`;
const CopyRight = styled.span`
  font-size: 16px;
  letter-spacing: 0;
`;

const GameLoading = () => {
  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <NintendoLogo src={nintendoLogo} />
      <LoadingContainer>
        <NintendoSwitchLogo>
          <LeftPart src={"/images/ogLeftSwitchLogo.png"} />
          <RightPart src={"/images/ogRightSwitchLogo.png"} />
        </NintendoSwitchLogo>
        <LoadingText>
          <UpperText>NINTENDO</UpperText>
          <LowerText>
            <span>S</span>
            <span>W</span>
            <span>I</span>
            <span>T</span>
            <span>C</span>
            <span>H</span>
            <CopyRight>TM</CopyRight>
          </LowerText>
        </LoadingText>
      </LoadingContainer>
    </Container>
  );
};

export default GameLoading;
