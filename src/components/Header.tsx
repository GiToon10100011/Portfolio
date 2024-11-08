import styled from "styled-components";
import { NetworkStatusIcon } from "../Icons";
import { CSSProperties, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "styled-components";
import FadeLoader from "react-spinners/FadeLoader";
import { useLocation, useNavigate } from "react-router-dom";
import { cursorChangingStore } from "../stores";

const override: CSSProperties = {
  scale: 2,
};

interface IProfileInfoProps {
  $isProfilePage: boolean;
}

const Container = styled.header<IProfileInfoProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 120px;
  margin-bottom: 70px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.text};
  z-index: 3;
  display: flex;
  align-items: center;
`;

const InnerContainer = styled.div<IProfileInfoProps>`
  width: 1700px;
  height: ${({ $isProfilePage }) => (!$isProfilePage ? "100%" : "80px")};
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ $isProfilePage, theme }) =>
    $isProfilePage &&
    `border-bottom: 1px solid ${theme.colors.lightBorder}; padding-bottom: 20px`}
`;

const LeftSide = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
`;

const ProfileIcon = styled(motion.div)<IProfileInfoProps>`
  border-radius: 50%;
  width: ${({ $isProfilePage }) => (!$isProfilePage ? "80px" : "60px")};
  height: ${({ $isProfilePage }) => (!$isProfilePage ? "80px" : "60px")};
  cursor: ${({ $isProfilePage }) => (!$isProfilePage ? "pointer" : "default")};
  overflow: hidden;
`;

const ProfilePic = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileInfo = styled.div<IProfileInfoProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ $isProfilePage }) => (!$isProfilePage ? "10px" : "0")};
`;

const ProfileName = styled.h1`
  font-size: 24px;
`;

const ProfileKrName = styled(ProfileName)`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.krText};
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CurrentTime = styled.p`
  font-size: 24px;
  display: flex;
  align-items: flex-end;
  span {
    font-size: 10px;
  }
`;

const ProfileLoading = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.colors.subBackground};
  z-index: 9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const LoadingProfileIcon = styled(motion.div)`
  width: 200px;
  height: 200px;
`;

const Header = () => {
  const location = useLocation();
  const isProfilePage = location.pathname.split("/")[1] === "profile";
  const theme = useTheme();
  const navigate = useNavigate();
  const { setCursorChanging } = cursorChangingStore();

  const [currentTime, setCurrentTime] = useState(new Date());
  const [navigateProfile, setNavigateProfile] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true); 

  const [time, period] = currentTime
    .toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .split(" ");

  const [firstPeriod, secondPeriod] = period.split("");

  const handleNavigateProfile = () => {
    setNavigateProfile(true);
    setIsLoadingProfile(true);
    setTimeout(() => {
      navigate("/profile");
      setIsLoadingProfile(false);
      setNavigateProfile(false);
    }, 1400);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AnimatePresence>
        {navigateProfile && (
          <ProfileLoading
            key="profileLoading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LoadingProfileIcon
              layoutId="profile"
              animate={{ borderRadius: 10 }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
            >
              <ProfilePic src="/profile.png" />
            </LoadingProfileIcon>
            <FadeLoader
              color={theme.colors.textPoint}
              loading={isLoadingProfile}
              cssOverride={override}
            />
          </ProfileLoading>
        )}
      </AnimatePresence>
      <Container $isProfilePage={isProfilePage}>
        <InnerContainer $isProfilePage={isProfilePage}>
          <LeftSide>
            <ProfileIcon
              initial={{ scale: 1, rotate: 0, borderRadius: "50%" }}
              whileHover={
                !isProfilePage
                  ? { y: -10, rotate: [10, -10, 10, -10, 10, -10] }
                  : undefined
              }
              transition={{
                duration: 0.6,
              }}
              onClick={!isProfilePage ? handleNavigateProfile : undefined}
              layoutId="profile"
              $isProfilePage={isProfilePage}
              onMouseEnter={!isProfilePage ? () => setCursorChanging(true) : undefined}
              onMouseLeave={!isProfilePage ? () => setCursorChanging(false) : undefined}
            >
              <ProfilePic src="/profile.png" />
            </ProfileIcon>
            <ProfileInfo $isProfilePage={isProfilePage}>
              <ProfileName>
                {isProfilePage ? "Jon Jinu's Page" : "Jon Jinu"}
              </ProfileName>
              <ProfileKrName>{!isProfilePage && "전진우"}</ProfileKrName>
            </ProfileInfo>
          </LeftSide>
          <RightSide>
            <CurrentTime>
              {time}
              <span>
                {firstPeriod}.{secondPeriod}.
              </span>
            </CurrentTime>
            <NetworkStatusIcon />
          </RightSide>
        </InnerContainer>
      </Container>
    </>
  );
};

export default Header;
