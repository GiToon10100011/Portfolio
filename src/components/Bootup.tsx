import styled, { css } from "styled-components";
import { bootupAnimations } from "../styles/animations";
import React, { useState } from "react";
import { triggerMain } from "../atoms";
import { useSetRecoilState } from "recoil";
import { motion } from "framer-motion";

const Container = styled.main`
  position: fixed;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 40px;
  justify-content: center;
  align-items: center;
  /* background: linear-gradient(to bottom, #000, rgba(0, 0, 0, 0.3) 88%, transparent);
   */
  background: #000;
  animation: ${bootupAnimations["initial"]} 0.6s linear;
  font-family: ${({ theme }) => theme.fonts.logo};
`;

const Loading = styled.main<{ $progress: number }>`
  width: 100px;
  aspect-ratio: 1;
  display: flex;

  animation: ${({ $progress }) =>
    $progress === 100
      ? css`
          ${bootupAnimations["bootupFinish"]} 0.6s 0.8s ease-out
        `
      : css`
          ${bootupAnimations["containerRotate"]} 2s 0.8s infinite steps(1)
        `};
  opacity: 0.9;
  filter: invert(1);
  &::before {
    content: "";
    flex: 1;
    background: url("/logo/left_logo.png") center/cover no-repeat;
    animation: ${({ $progress }) =>
      $progress !== 100
        ? css`
            ${bootupAnimations["logoFlip"]} 1s 0.8s infinite linear alternate,
            ${bootupAnimations["leftLogoReveal"]} 2s infinite steps(1) -0.5s
          `
        : ""};
  }
  &::after {
    content: "";
    flex: 1;
    transform: scaleX(-1);
    background: url("/logo/right_logo.png") center/cover no-repeat;
    animation: ${({ $progress }) =>
      $progress !== 100
        ? css`
            ${bootupAnimations["logoFlip"]} 1s 0.8s infinite linear alternate,
            ${bootupAnimations["rightLogoReveal"]} 2s infinite steps(1) -0.5s
          `
        : ""};
  }
  &::after {
    --s: -1, -1;
  }
`;

const ProgressBarContainer = styled.div`
  position: relative;
  width: 200px;
  height: 4px;
`;

const ProgressBar = styled.div`
  position: absolute;
  left: 50%;
  width: 100%;
  height: 4px;
  background: #eee;
  transform: translateX(-50%);
  transform-origin: center;
`;

const Title = styled.h4`
  margin: 0;
  color: #eee;
`;

const CircleContainer = styled.div`
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const FirstCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 30px;
  background-color: #d7d7d7;
  border-radius: 50%;
  z-index: 1;
  animation: ${bootupAnimations["expansionFirst"]} 1s forwards;
  transform-origin: center;
`;

const SecondCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 30px;
  background-color: #000;
  border-radius: 50%;
  animation: ${bootupAnimations["expansionSecond"]} 1s forwards 0.2s;
  transform-origin: center;
`;

const ThirdCircle = styled(SecondCircle)`
  animation: ${bootupAnimations["expansionThird"]} 1s forwards 0.6s;
  background-color: #d7d7d7;
`;

function Bootup() {
  const [init, setInit] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isBootingEnded, setIsBootingEnded] = useState(false);
  const [progressWidth, setProgressWidth] = useState(100);
  const setTriggerMain = useSetRecoilState(triggerMain);

  const handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    if (e.animationName === bootupAnimations["initial"].getName()) {
      setTimeout(() => {
        setInit(true);
        let velocity = 0.6; // Slightly increased initial velocity
        let acceleration = 0.05; // Reduced acceleration
        const interval = setInterval(() => {
          setProgressWidth((prev) => prev - Math.ceil(velocity));
          setProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              return 100; // Force it to stay at 100
            }
            velocity += acceleration;
            velocity = Math.min(velocity, 3); // Reduced max velocity
            const nextProgress = prev + Math.ceil(velocity);
            return Math.min(nextProgress, 100); // Ensure it doesn't exceed 100
          });
        }, 50); // Increased interval time
      }, 200);
    }
  };

  const handleBootupEnded = (e: React.AnimationEvent<HTMLDivElement>) => {
    if (e.animationName === bootupAnimations["bootupFinish"].getName()) {
      setIsBootingEnded(true);
    }
  };

  const handleLoadingEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    if (e.animationName === bootupAnimations["expansionThird"].getName()) {
      setTriggerMain(() => true);
    }
  };

  return (
    <motion.div
      key="bootup"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {isBootingEnded && (
        <CircleContainer>
          <FirstCircle />
          <SecondCircle />
          <ThirdCircle onAnimationEnd={handleLoadingEnd} />
        </CircleContainer>
      )}
      <Container onAnimationEnd={handleAnimationEnd}>
        <Loading onAnimationEnd={handleBootupEnded} $progress={progress} />
        <ProgressBarContainer>
          <ProgressBar
            style={{
              width: `${progressWidth}%`,
              display: progress === 100 ? "none" : "block",
            }}
          />
        </ProgressBarContainer>
        <Title>{init ? `${progress}%` : "Loading"}</Title>
        <Title>{progress === 100 && "Press F11 for better experience"}</Title>
      </Container>
    </motion.div>
  );
}

export default Bootup;
