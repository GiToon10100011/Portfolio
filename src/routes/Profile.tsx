import React from "react";
import styled from "styled-components";
import Footer from "../components/Footer";

const Container = styled.div`
  padding-top: 140px;
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.fonts.text};
`;

const InnerContainer = styled.div`
  width: 1700px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  gap: 60px;
`;

const LeftArea = styled.div`
  overflow: hidden;
  width: 500px;
  height: fit-content;
  background: #141414;
  border-radius: 40px 0 40px 40px;
`;

const ProfileCard = styled.div`
  width: 100%;
  padding: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const ProfilePicture = styled.div`
  position: relative;
  width: 380px;
  height: 380px;
  border-radius: 40px 0 40px 40px;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      45deg,
      transparent 65%,
      rgba(175, 83, 255, 0.2) 15 85%
    );
    mix-blend-mode: overlay;
    pointer-events: none;
  }
`;

const GlitchImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("/profile.png") no-repeat center center / cover;
  filter: saturate(0.85) contrast(1.1);
  animation: base-effect 3s infinite;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }

  &::before {
    background: url("/profile.png") no-repeat center center / cover;
    animation: glitch-effect 3s infinite;
    mix-blend-mode: screen;
    background-color: rgba(175, 83, 255, 0.4);
  }

  &::after {
    background: rgba(175, 83, 255, 0.4);
    animation: color-overlay 3s infinite;
    mix-blend-mode: color-dodge;
  }

  @keyframes base-effect {
    0%,
    78%,
    100% {
      filter: saturate(0.85) contrast(1.1) grayscale(0);
    }
    79%,
    83% {
      filter: saturate(0.85) contrast(1.1) grayscale(0.8);
    }
  }

  @keyframes glitch-effect {
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
  }

  @keyframes color-overlay {
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
  }
`;

const NoiseOverlay = styled.div`
  position: absolute;
  top: -50%;
  left: -50%;
  right: -50%;
  bottom: -50%;
  width: 200%;
  height: 200%;
  background: transparent;
  opacity: 0.05;
  z-index: 1;
  pointer-events: none;
  animation: noise 0.2s steps(3) infinite;
  background-image: repeating-radial-gradient(
    circle at 50% 50%,
    transparent 0,
    rgba(175, 83, 255, 0.2) 1px,
    transparent 2px
  );

  @keyframes noise {
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
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: center;
`;

const ProfileSubtitle = styled.span`
  font-size: 24px;
  font-weight: 500;
  letter-spacing: 0.12em;
  color: ${({ theme }) => theme.colors.textPoint};
`;

const ProfileName = styled.h1`
  font-size: 32px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
`;

const SNSMenu = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;

const SNSItem = styled.a`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.subBackground};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s;
  &:hover {
    transform: translateY(-4px);
  }
`;

const SNSIcon = styled.img``;

const ContactMenu = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: flex-end;
  border-top: 1px solid rgba(204, 204, 204, 0.3);
`;

const ContactItem = styled.button`
  height: 100%;
  flex: 1;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.text};
  font-size: 22px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  cursor: pointer;
  transition: background 0.3s, color 0.3s;
  &:first-child {
    border-right: 1px solid rgba(204, 204, 204, 0.3);
  }
  &:hover {
    background: ${({ theme }) => theme.colors.subBackground};
    color: ${({ theme }) => theme.colors.textPoint};
  }
`;
const RightArea = styled.div`
  width: calc(100% - 560px);
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
`;

const Profile = () => {
  return (
    <Container>
      <InnerContainer>
        <LeftArea>
          <ProfileCard>
            <ProfilePicture>
              <GlitchImage />
              <NoiseOverlay />
            </ProfilePicture>
            <ProfileInfo>
              <ProfileSubtitle>Frontend Developer_</ProfileSubtitle>
              <ProfileName>JON JINU</ProfileName>
            </ProfileInfo>
            <SNSMenu>
              <SNSItem>
                <SNSIcon src="/images/icons/EmailIcon.png" alt="Email" />
              </SNSItem>
              <SNSItem>
                <SNSIcon src="/images/icons/LinkedInIcon.png" alt="LinkedIn" />
              </SNSItem>
              <SNSItem>
                <SNSIcon src="/images/icons/DiscordIcon.png" alt="Discord" />
              </SNSItem>
              <SNSItem>
                <SNSIcon src="/images/icons/GithubIcon.png" alt="Github" />
              </SNSItem>
            </SNSMenu>
          </ProfileCard>
          <ContactMenu>
            <ContactItem>Download CV</ContactItem>
            <ContactItem>Contact Me</ContactItem>
          </ContactMenu>
        </LeftArea>
        <RightArea></RightArea>
      </InnerContainer>
      <Footer />
    </Container>
  );
};

export default Profile;
