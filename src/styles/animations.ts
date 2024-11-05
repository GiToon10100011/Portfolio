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
      z-index: 2;
    }
    to{
      transform: scale(100);
      z-index: 3;
    }
  `,
  expansionThird: keyframes`
    from{
      transform: scale(1);
      z-index: 3;
    }
    to{
      transform: scale(100);
      z-index: 4;
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
