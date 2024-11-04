import styled from "styled-components";
import { NetworkStatusIcon } from "../Icons";
import { useEffect, useState } from "react";

const Container = styled.header`
  width: 100%;
  height: 120px;
  margin-bottom: 70px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.text};
`;

const InnerContainer = styled.div`
  width: 1700px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftSide = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
`;

const ProfileIcon = styled.div`
  width: 80px;
  height: 80px;
`;

const ProfilePic = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const [time, period] = currentTime
    .toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .split(" ");

  const [firstPeriod, secondPeriod] = period.split("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <InnerContainer>
        <LeftSide>
          <ProfileIcon>
            <ProfilePic src="/profile.png" />
          </ProfileIcon>
          <ProfileInfo>
            <ProfileName>Jon Jinu</ProfileName>
            <ProfileKrName>전진우</ProfileKrName>
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
  );
};

export default Header;
