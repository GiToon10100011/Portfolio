import styled, { keyframes } from "styled-components";

const animations = {
  initial: keyframes`
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
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
      background: url("/logo/right_logo.png") center/cover no-repeat;
      border-radius: 0;
    }
  `,
};

const Container = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 40px;
  justify-content: center;
  align-items: center;
  /* background: linear-gradient(to bottom, #000, rgba(0, 0, 0, 0.3) 88%, transparent);
   */
  background: #000;
  animation: ${animations["initial"]} 2s linear;
`;

const Loading = styled.main`
  width: 100px;
  aspect-ratio: 1;
  display: flex;
  animation: ${animations["containerRotate"]} 2s infinite steps(1);
  opacity: 0.9;
  filter: invert(1);
  &::before {
    content: "";
    flex: 1;
    animation: ${animations["logoFlip"]} 1s infinite linear alternate,
      ${animations["leftLogoReveal"]} 2s infinite steps(1) -0.5s;
  }
  &::after {
    content: "";
    flex: 1;
    animation: ${animations["logoFlip"]} 1s infinite linear alternate,
      ${animations["rightLogoReveal"]} 2s infinite steps(1) -0.5s;
  }

  &::after {
    --s: -1, -1;
  }
`;

const Title = styled.h4`
  color: #eee;
`;

function Bootup() {
  return (
    <>
      <Container>
        <Loading />
        <Title>Loading...</Title>
      </Container>
    </>
  );
}

export default Bootup;

// const expandRed = keyframes`
//   0% {
//     transform: scale(1);
//   }
//   100% {
//     transform: scale(100); /* Expanding to cover the whole screen */
//   }
// `;

// const expandWhite = keyframes`
//   0% {
//     transform: scale(1);
//     z-index: 2; /* Ensure white is on top when expanding */
//   }
//   100% {
//     transform: scale(100); /* Expanding to cover the whole screen */
//     z-index: 3; /* Keep white on top */
//   }
// `;

// const Container = styled.main`
//   position: fixed;
//   width: 100%;
//   height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const RedCircle = styled.div`
//   position: absolute;
//   width: 30px;
//   height: 30px;
//   background-color: black;
//   border-radius: 50%;
//   z-index: 1; /* Red starts below initially */
//   animation: ${expandRed} 2s forwards;
//   transform-origin: center;
// `;

// const WhiteCircle = styled.div`
//   position: absolute;
//   width: 30px;
//   height: 30px;
//   background-color: #d7d7d7;
//   border-radius: 50%;
//   animation: ${expandWhite} 2s forwards 0.4s; /* Starts after red expands */
//   transform-origin: center;
// `;

// function App() {
//   return (
//     <>
//       <GlobalStyles />
//       <Container>
//         <RedCircle />
//         <WhiteCircle />
//       </Container>
//     </>
//   );
// }

// export default App;
