import { keyframes } from "styled-components";

export const bootupAnimations = {
  initial: keyframes`
    0% {
      filter: blur(10px);
    }
    100% {
      filter: blur(0px);
    }
  `,
  containerRotate: keyframes`
    0% {
      transform: scaleX(1) rotate(0deg);
    }
    50% {
      transform: scaleX(-1) rotate(-90deg);
    }
  `,
  logoFlip: keyframes`
     0%,
    5% {
      transform: scale(var(--s, 1)) translate(0px) perspective(150px)
        rotateY(0deg);
    }
    33% {
      transform: scale(var(--s, 1)) translate(-10px) perspective(150px)
        rotateX(0deg);
    }
    66% {
      transform: scale(var(--s, 1)) translate(-10px) perspective(150px)
        rotateX(-180deg);
    }
    95%,
    100% {
      transform: scale(var(--s, 1)) translate(0px) perspective(150px)
        rotateX(-180deg);
    }
  `,
  leftLogoReveal: keyframes`
     0% {
      background: url("/logo/left_logo.png") center/cover no-repeat;
      border-radius: 0;
    }
  `,
  rightLogoReveal: keyframes`
     0% {
      background: url("/logo/right_logo.png") center/cover 
      no-repeat;
      border-radius: 0;
    }
  `,
  bootupFinish: keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotateY(720deg);
    }
  `,
  expansionFirst: keyframes`
    from{
      transform: scale(1);
    }
    to{
      transform: scale(100);
    }
  `,
  expansionSecond: keyframes`
    from{
      transform: scale(1);
      z-index: 5;
    }
    to{
      transform: scale(100);
      z-index: 6;
    }
  `,
  expansionThird: keyframes`
    from{
      transform: scale(1);
      z-index: 6;
    }
    to{
      transform: scale(100);
      z-index: 7;
    }
  `,
};

export const sliderAnimations = {
  slideIn: keyframes`
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0%);
    }
  `,
};

export const glitchAnimations = {
  noise: keyframes`
    0% {
      transform: translate(0, 0);
    }
    25% {
      transform: translate(-1%, -1%);
    }
    50% {
      transform: translate(1%, 1%);
    }
    75% {
      transform: translate(-1%, 1%);
    }
    100% {
      transform: translate(1%, -1%);
    }
  `,
  baseEffect: keyframes`
    0%,
    78%,
    100% {
      filter: saturate(0.85) contrast(1.1) grayscale(0);
    }
    79%,
    83% {
      filter: saturate(0.85) contrast(1.1) grayscale(0.8);
    }
  `,
  glitchEffect: keyframes`
    0%,
    78%,
    100% {
      opacity: 0;
      transform: translate(0);
      clip-path: inset(0 0 0 0);
    }
    79% {
      opacity: 0.7;
      transform: translate(-2px);
      clip-path: inset(10% 0 15% 0);
    }
    80% {
      opacity: 0.7;
      transform: translate(2px);
      clip-path: inset(25% 0 40% 0);
    }
    81% {
      opacity: 0.7;
      transform: translate(-2px);
      clip-path: inset(45% 0 55% 0);
    }
    82% {
      opacity: 0.7;
      transform: translate(2px);
      clip-path: inset(60% 0 75% 0);
    }
    83% {
      opacity: 0;
      transform: translate(0);
      clip-path: inset(0 0 0 0);
    }
  `,
  colorOverlay: keyframes`
    0%,
    78%,
    100% {
      opacity: 0;
    }
    79%,
    80% {
      opacity: 0.3;
    }
    81% {
      opacity: 0.5;
    }
    82% {
      opacity: 0.3;
    }
    83% {
      opacity: 0;
    }
  `,
};