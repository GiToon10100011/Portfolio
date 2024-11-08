import React from "react";
import styled from "styled-components";

const ContentIntroduce = styled.section`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const IntroduceHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
  padding: 30px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.dividerBorder};
  border-bottom: 1px solid ${({ theme }) => theme.colors.dividerBorder};
`;

const IntroduceSubtitle = styled.p`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.text};
  span {
    color: ${({ theme }) => theme.colors.textPoint};
  }
`;
const IntroduceTitle = styled.h1`
  font-size: 60px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  line-height: 1.1;
`;
const IntroduceInfo = styled.p`
  font-size: 24px;
  font-family: ${({ theme }) => theme.fonts.krText};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.5;
`;

const ContentStrengths = styled.section`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const HeaderBadge = styled.div`
  height: 1em;
  width: 6px;
  background: ${({ theme }) => theme.colors.dividerBorder};
`;

const StrengthsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 28px;
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  color: ${({ theme }) => theme.colors.text};
  border-bottom: 1px solid ${({ theme }) => theme.colors.dividerBorder};
  padding-bottom: 14px;
`;
const Strengths = styled.ul`
  display: flex;
  gap: 40px;
  align-items: center;
`;
const StrengthItem = styled.li`
  display: flex;
  align-items: center;
  gap: 14px;
`;
const StrengthNumbering = styled.span`
  font-size: 100px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
`;
const Strength = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 28px;
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.text};
  span:first-child {
    font-family: ${({ theme }) => theme.fonts.krText};
  }
`;

const ContentAbout = styled.section``;
const AboutHeader = styled(StrengthsHeader)`
  margin-bottom: 30px;
  border: none;
`;
const AboutTitle = styled.h2`
  font-size: 60px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;
const AboutCards = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const MainCard = styled.li``;
const SubCard = styled.li``;

const Content = () => {
  return (
    <>
      <ContentIntroduce id="profile">
        <IntroduceHeader>
          <IntroduceSubtitle>
            안녕하세요, I'm <span>Jon Jinu</span>
          </IntroduceSubtitle>
          <IntroduceTitle>
            Frontend Developer Based in
            <br /> South Korea, Seoul
          </IntroduceTitle>
        </IntroduceHeader>
        <IntroduceInfo>
          안녕하세요, 문제 해결을 즐기고 사용자 경험을 향상시키는 프론트엔드
          개발자 전진우입니다. <br /> React와 Next.js, TypeScript를 활용해
          안정적이고 효율적인 웹 애플리케이션을 개발하고, Tailwind CSS와 <br />
          styled-components로 직관적인 UI를 구현합니다. Firebase와 AWS를 통해
          배포 경험을 쌓았으며, 끈기와 책임감
          <br />을 바탕으로 새로운 도전에 빠르게 적응하며 성장하고 있습니다.
        </IntroduceInfo>
      </ContentIntroduce>
      <ContentStrengths>
        <StrengthsHeader>
          <HeaderBadge></HeaderBadge>
          Strengths
        </StrengthsHeader>
        <Strengths>
          <StrengthItem>
            <StrengthNumbering>1</StrengthNumbering>
            <Strength>
              <span>문제해결을 즐깁니다.</span>
              <span>Problem Solving</span>
            </Strength>
          </StrengthItem>
          <StrengthItem>
            <StrengthNumbering>2</StrengthNumbering>
            <Strength>
              <span>영어에 능통합니다.</span>
              <span>Fluent English</span>
            </Strength>
          </StrengthItem>
          <StrengthItem>
            <StrengthNumbering>3</StrengthNumbering>
            <Strength>
              <span>지속적인 학습을 추구합니다.</span>
              <span>Continuous Learning</span>
            </Strength>
          </StrengthItem>
        </Strengths>
      </ContentStrengths>
      <ContentAbout id="about">
        <AboutHeader>
          <HeaderBadge />
          About
        </AboutHeader>
        <AboutTitle>Work Experience & Education</AboutTitle>
        <AboutCards>
          <MainCard></MainCard>
          <SubCard></SubCard>
          <SubCard></SubCard>
          <SubCard></SubCard>
          <SubCard></SubCard>
        </AboutCards>
      </ContentAbout>
    </>
  );
};

export default Content;
