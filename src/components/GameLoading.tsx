import styled from "styled-components";
import nintendoLogo from "/svgs/NintendoLogo.svg";
import { motion } from "framer-motion";
import { projectIdStore } from "../stores";
import projects from "../projects.json";
import { useNavigate } from "react-router-dom";

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
const LeftPart = styled(motion.img)``;
const RightPart = styled(motion.img)``;
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

const Container = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #000;
  font-family: ${({ theme }) => theme.fonts.nintendo};
  color: ${({ theme }) => theme.colors.text};
  z-index: 9;
  @media (max-width: 768px) {
    ${NintendoLogo} {
      width: 140px;
      object-fit: cover;
      top: 20px;
      left: 20px;
    }
    ${LoadingContainer} {
      bottom: 20px;
      right: 20px;
      ${LeftPart} {
        width: 25px;
      }
      ${RightPart} {
        width: 25px;
      }
    }
    ${LoadingText} {
      ${UpperText} {
        font-size: 20px;
      }
      ${LowerText} {
        font-size: 32px;
        ${CopyRight} {
          font-size: 12px;
        }
      }
    }
  }
`;

const moveVariants = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 1.2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 2,
    },
  },
};

const letterVariants = {
  initial: { rotateY: 0 },
  animate: { rotateY: 720 },
};

const GameLoading = () => {
  const { projectId } = projectIdStore();
  const navigate = useNavigate();
  const idMatchData = projects.find((project) => project.id === projectId);
  setTimeout(() => {
    window.open(idMatchData?.deploymentUrl ?? "/", "_blank");
    navigate("/");
  }, 6000);
  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      <NintendoLogo src={nintendoLogo} alt="nintendo logo" />
      <LoadingContainer>
        <NintendoSwitchLogo>
          <LeftPart src={"/images/ogLeftSwitchLogo.png"} />
          <RightPart
            src={"/images/ogRightSwitchLogo.png"}
            variants={moveVariants}
            initial={{ y: 0 }}
            animate="animate"
            transition={{
              duration: 0.6,
              ease: "easeOut",
              type: "spring",
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 2,
            }}
          />
        </NintendoSwitchLogo>
        <LoadingText>
          <UpperText>NINTENDO</UpperText>
          <LowerText>
            {["S", "W", "I", "T", "C", "H"].map((letter, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                initial="initial"
                animate="animate"
                transition={{
                  duration: 0.6,
                  delay: index * 0.1 + 1.2,
                  type: "spring",
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
                style={{ display: "inline-block" }}
              >
                {letter}
              </motion.span>
            ))}
            <CopyRight>TM</CopyRight>
          </LowerText>
        </LoadingText>
      </LoadingContainer>
    </Container>
  );
};

export default GameLoading;
