import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import { AnimatePresence, motion } from "framer-motion";
import Content from "../components/profile/Content";
import { glitchAnimations } from "../styles/animations";
import { cursorChangingStore, triggerMainStore } from "../stores";
import Typewriter from "typewriter-effect";

const profileText = "Frontend Developer_";

const Container = styled(motion.div)`
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
  height: 788px;
  background: #141414;
  border-radius: 40px 0 40px 40px;
`;

const ProfileCard = styled(motion.div)`
  width: 100%;
  padding: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const ProfilePicture = styled(motion.div)`
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
      rgba(175, 83, 255, 0.6) 15 85%
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
  animation: ${glitchAnimations.baseEffect} 3s infinite;

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
    animation: ${glitchAnimations.glitchEffect} 3s infinite;
    mix-blend-mode: screen;
    background-color: rgba(175, 83, 255, 0.6);
  }

  &::after {
    background: rgba(175, 83, 255, 0.6);
    animation: ${glitchAnimations.colorOverlay} 3s infinite;
    mix-blend-mode: color-dodge;
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
  animation: ${glitchAnimations.noise} 0.2s steps(3) infinite;
  background-image: repeating-radial-gradient(
    circle at 50% 50%,
    transparent 0,
    rgba(175, 83, 255, 0.6) 1px,
    transparent 2px
  );
`;

const ProfileInfo = styled(motion.div)`
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

const SNSMenu = styled(motion.div)`
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

const ContactMenu = styled(motion.div)`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: flex-end;
  border-top: 1px solid rgba(204, 204, 204, 0.3);
`;

const ContactItem = styled.a`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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

const MenuCard = styled(motion.div)`
  width: 100%;
  height: 100%;
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const MenuBadge = styled(motion.div)`
  height: 1em;
  width: 3px;
  opacity: 0;
  transition: background 0.3s, opacity 0.3s;
`;
const MenuItem = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 30px;
  font-size: 32px;
  color: ${({ theme }) => theme.colors.text};
  border: 4px solid transparent;
  border-radius: ${({ theme }) => theme.borderRadius.light};
  transition: border 0.3s, color 0.3s;
  &.active {
    border: 4px solid ${({ theme }) => theme.colors.textPoint};
    color: ${({ theme }) => theme.colors.textPoint};
    ${MenuBadge} {
      opacity: 1;
      background: ${({ theme }) => theme.colors.textPoint};
    }
  }
  &:hover {
    color: ${({ theme }) => theme.colors.textPoint};
    ${MenuBadge} {
      opacity: 1;
      background: ${({ theme }) => theme.colors.textPoint};
    }
  }
`;

const MenuDivider = styled(motion.div)`
  height: 1px;
  background: ${({ theme }) => theme.colors.lightBorder};
`;

const RightArea = styled.div`
  width: calc(100% - 560px);
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
  display: flex;
  flex-direction: column;
  gap: 60px;
  scroll-behavior: smooth;
`;

const profileCardVariants = {
  initial: {
    opacity: 0,
    x: 200,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      type: "spring",
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    x: 200,
    transition: {
      duration: 0.5,
      type: "spring",
      staggerChildren: 0.1,
    },
  },
};

const childVariants = {
  initial: {
    opacity: 0,
    x: 100,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    x: 200,
    transition: {
      duration: 0.3,
      type: "spring",
    },
  },
};

const contactMenuVariants = {
  initial: { opacity: 0, x: 200 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      type: "spring",
      delay: 0.4,
    },
  },
  exit: {
    opacity: 0,
    x: 200,
    transition: {
      duration: 0.5,
      type: "spring",
    },
  },
};

const menuCardVariants = {
  initial: { opacity: 0, x: -200 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      type: "spring",
      staggerChildren: 0.1,
      staggerDelay: 0.2,
    },
  },
  exit: {
    opacity: 0,
    x: -100,
    transition: {
      duration: 0.3,
      type: "spring",
      staggerChildren: 0.08,
      when: "afterChildren",
    },
  },
};

const menuItemVariants = {
  initial: { opacity: 0, x: -200 },
  animate: { opacity: 1, x: 0 },
  exit: {
    opacity: 0,
    x: -200,
    transition: {
      duration: 0.2,
      type: "spring",
    },
  },
};

const Profile = () => {
  const [mode, setMode] = useState<string>("menu");
  const [section, setSection] = useState<string>("profile");
  const { setTriggerMain } = triggerMainStore();
  const { setCursorChanging } = cursorChangingStore();
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    return () => {
      setTriggerMain(true);
    };
  }, []);

  console.log("Frontend Developer".split(""));
  return (
    <Container
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <InnerContainer>
        <LeftArea>
          <AnimatePresence mode="wait">
            {mode === "menu" ? (
              <>
                <ProfileCard
                  variants={profileCardVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  key="profileCard"
                >
                  <ProfilePicture variants={childVariants}>
                    <GlitchImage />
                    <NoiseOverlay />
                  </ProfilePicture>
                  <ProfileInfo variants={childVariants}>
                    <ProfileSubtitle>
                      <Typewriter
                        options={{
                          strings: ["Frontend Developer_", "Computer Science_"],
                          autoStart: true,
                          loop: true,
                        }}
                      />
                    </ProfileSubtitle>
                    <ProfileName>JON JINU</ProfileName>
                  </ProfileInfo>
                  <SNSMenu variants={childVariants}>
                    <SNSItem href="mailto:boon10034@gmail.com" target="_blank">
                      <SNSIcon src="/images/icons/EmailIcon.png" alt="Email" />
                    </SNSItem>
                    <SNSItem>
                      <SNSIcon
                        src="/images/icons/LinkedInIcon.png"
                        alt="LinkedIn"
                      />
                    </SNSItem>
                    <SNSItem>
                      <SNSIcon
                        src="/images/icons/DiscordIcon.png"
                        alt="Discord"
                      />
                    </SNSItem>
                    <SNSItem>
                      <SNSIcon
                        src="/images/icons/GithubIcon.png"
                        alt="Github"
                      />
                    </SNSItem>
                  </SNSMenu>
                </ProfileCard>
                <ContactMenu
                  variants={contactMenuVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <ContactItem href="/resume.pdf" target="_blank">
                    Download CV
                  </ContactItem>
                  <ContactItem href="#contact">Contact Me</ContactItem>
                </ContactMenu>
              </>
            ) : (
              <MenuCard
                key="menuCard"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={menuCardVariants}
              >
                <MenuItem
                  href="#top"
                  className={section === "profile" ? "active" : ""}
                  variants={menuItemVariants}
                  onMouseEnter={() => setCursorChanging(true)}
                  onMouseLeave={() => setCursorChanging(false)}
                  onClick={() => setSection("profile")}
                >
                  <MenuBadge />
                  Profile
                </MenuItem>
                <MenuDivider exit={{ opacity: 0, x: -100 }} />
                <MenuItem
                  href="#about"
                  className={section === "about" ? "active" : ""}
                  variants={menuItemVariants}
                  onMouseEnter={() => setCursorChanging(true)}
                  onMouseLeave={() => setCursorChanging(false)}
                  onClick={() => setSection("about")}
                >
                  <MenuBadge />
                  About
                </MenuItem>
                <MenuItem
                  href="#skills"
                  className={section === "skills" ? "active" : ""}
                  variants={menuItemVariants}
                  onMouseEnter={() => setCursorChanging(true)}
                  onMouseLeave={() => setCursorChanging(false)}
                  onClick={() => setSection("skills")}
                >
                  <MenuBadge />
                  Skills
                </MenuItem>
                <MenuItem
                  href="#contact"
                  className={section === "contact" ? "active" : ""}
                  variants={menuItemVariants}
                  onMouseEnter={() => setCursorChanging(true)}
                  onMouseLeave={() => setCursorChanging(false)}
                  onClick={() => setSection("contact")}
                >
                  <MenuBadge />
                  Contact
                </MenuItem>
              </MenuCard>
            )}
          </AnimatePresence>
        </LeftArea>
        <RightArea ref={containerRef}>
          <Content setSection={setSection} />
        </RightArea>
      </InnerContainer>
      <Footer icon="menu" mode={mode} setMode={setMode} />
    </Container>
  );
};

export default Profile;
