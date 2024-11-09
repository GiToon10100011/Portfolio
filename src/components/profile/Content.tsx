import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import Typescript from "../../svgs/skills/Typescript.svg";
import { CheckIcon, NavigateArrowIcon } from "../../Icons";
import { motion } from "framer-motion";
const Container = styled.main`
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding-bottom: 110px;
`;

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
  margin-bottom: 60px;
`;
const AboutCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const MainCard = styled.div`
  padding: 30px;
  border: 2px solid ${({ theme }) => theme.colors.textPoint};
  border-radius: ${({ theme }) => theme.borderRadius.main};
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: flex-start;
`;

const SubCardTimeline = styled.div`
  position: relative;
  width: 1px;
  height: 600px;
  background: #555;
  margin-top: 30px;
  &:first-of-type {
    margin-left: 10px;
  }
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 20px;
    background: #555;
    border-radius: 50%;
  }
  &::after {
    top: 64%;
  }
`;

const SubCardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 130px;
`;
const SubCardContent = styled.div`
  display: flex;
  gap: 30px;
`;

const EduCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
`;
const JobCards = styled(EduCards)``;
const SubCard = styled(MainCard)`
  width: 460px;
  height: 320px;
  border: 1px solid ${({ theme }) => theme.colors.itemsBorder};
`;

const CardBadge = styled.span`
  display: inline-block;
  padding: 10px 6px;
  border: 1px solid ${({ theme }) => theme.colors.cardBadgeBorder};
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.colors.subText};
`;

const CardTitle = styled.h3`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-family: ${({ theme }) => theme.fonts.krText};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  font-size: 24px;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.2;
`;

const CardStatus = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.subText};
`;

const CardDescription = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.5;
  word-break: keep-all;
`;

const ContentSkills = styled.section``;
const SkillsHeader = styled(AboutHeader)``;
const SkillsTitle = styled(AboutTitle)`
  margin-bottom: 40px;
`;
const SkillsFilter = styled.ul`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
`;
const FilterItem = styled.li`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.lightBorder};
  border-radius: ${({ theme }) => theme.borderRadius.main};
  color: ${({ theme }) => theme.colors.text};
  &.active {
    background: ${({ theme }) => theme.colors.point};
  }
`;

const SkillSlider = styled(Swiper)`
  height: 700px;
  .swiper-wrapper {
    width: 100% !important;
    height: 100% !important;
  }
  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    background: ${({ theme }) => theme.colors.cardBadgeBorder};
    opacity: 1;
    margin: 0 10px;
  }
  .swiper-pagination-bullet-active {
    background: ${({ theme }) => theme.colors.textPoint};
  }
`;

const SkillCard = styled(SwiperSlide)`
  height: 300px !important;
  margin-top: 0 !important;
  margin-bottom: 40px !important;
  border: 1px solid ${({ theme }) => theme.colors.itemsBorder};
  border-radius: ${({ theme }) => theme.borderRadius.main};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
`;

const ContentTools = styled.section``;
const ToolsHeader = styled(StrengthsHeader)`
  margin-bottom: 30px;
`;
const ToolsContent = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  span {
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 24px;
    color: ${({ theme }) => theme.colors.subText};
  }
`;
const ToolsSegment = styled.ul`
  width: 530px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
const ToolsItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.text};
`;

const ContentCertificates = styled.section``;
const CertificatesHeader = styled(ToolsHeader)``;
const CertificatesContent = styled.ul`
  display: flex;
  justify-content: space-between;
`;
const CertificateItem = styled.li`
  width: 530px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.itemsBorder};
  border-radius: ${({ theme }) => theme.borderRadius.main};
`;
const CertificateTitle = styled.h3`
  font-size: 28px;
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  color: ${({ theme }) => theme.colors.textPoint};
  margin-bottom: 6px;
  line-height: 1.5;
  span {
    display: block;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.subText};
    margin-bottom: 24px;
  }
`;
const CertificateGrade = styled.span`
  font-size: 64px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 60px;
`;
const CertificateCredit = styled.span`
  display: inline-block;
  width: 100%;
  align-self: flex-end;
  font-size: 18px;
  text-align: right;
  color: ${({ theme }) => theme.colors.lightBorder};
`;

const ContentContact = styled.section``;
const ContactHeader = styled(CertificatesHeader)``;
const ContactTitle = styled(SkillsTitle)``;
const ContactContent = styled(CertificatesContent)`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
const ContactItems = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
`;
const ContactItem = styled(CertificateItem)`
  padding: 50px 40px;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  span {
    color: ${({ theme }) => theme.colors.text};
    font-size: 24px;
  }
`;
const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 22px;
  color: ${({ theme }) => theme.colors.subText};
`;
const ContactAddress = styled(ContactItem)`
  width: 100%;
`;
const ContactMap = styled.div`
  height: 500px;
  border-radius: ${({ theme }) => theme.borderRadius.main};
  overflow: hidden;
  background: #333;
  margin-bottom: 40px;
`;
const ContentFooter = styled.section``;
const FooterContent = styled.div`
  margin-bottom: 240px;
`;
const FooterText = styled.span`
  font-size: 120px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
  line-height: 1.2;
  svg {
    display: inline-block;
    margin-left: 30px;
  }
`;
const FooterIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  width: 100%;
  text-align: right;
  font-size: 40px;
  color: ${({ theme }) => theme.colors.subText};
  font-weight: 550;
  padding-right: 40px;
`;

const technologies = [
  "Framer Motion",
  "React-Beautiful-DND",
  "React Bootstrap",
  "ApexCharts",
  "Vite",
  "The Movie Database",
  "React Router DOM",
  "Open Weather",
  "Redux Thunk",
  "Google Translate",
  "Swiper",
  "Google GeoLocation",
  "Axios",
  "Canvas",
  "Unsplash",
  "Navigator",
  "Kakao",
  "Web APIs",
  "Firebase",
];

const Content = () => {
  return (
    <Container>
      <ContentIntroduce id="top">
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
          <MainCard>
            <CardBadge>2024</CardBadge>
            <CardTitle>
              K-Digital Training(KDT) 기업연계 프론트엔드 개발자 과정
              <CardStatus>수료</CardStatus>
            </CardTitle>
            <CardDescription>
              병역특례 편입 준비를 위해 프론트엔드 개발자 과정을 수료하면서
              React, Next.js, TypeScript, Redux, styled-components 등 최신 기술
              스택을 익혔습니다. HTML/CSS부터 React와 같은 프레임워크까지
              체계적으로 학습하며, 특히 다양한 API와 비동기 데이터를 활용해
              데이터를 가공하고 효율적인 웹 애플리케이션을 개발하는 데 큰 흥미를
              느꼈습니다. 이를 통해 안정적인 코드 작성과 실무 중심의 문제 해결
              능력을 갖추었으며, 새로운 문제에 도전하고 해결하는 과정을
              즐깁니다. 앞으로도 데이터와 문제 해결을 통해 사용자 경험을
              개선하는 프론트엔드 개발자로 꾸준히 성장해 나가겠습니다.
            </CardDescription>
          </MainCard>
          <SubCardContainer>
            <SubCardContent>
              <SubCardTimeline />
              <EduCards>
                <SubCard>
                  <CardBadge>2022 ~ 현재</CardBadge>
                  <CardTitle>
                    전남대학교 컴퓨터공학전공
                    <CardStatus>휴학 중</CardStatus>
                  </CardTitle>
                  <CardDescription>
                    컴퓨터공학전공을 전공하며 컴퓨터 과학의 기초를 배웠습니다.
                    2학년 과정을 마치고, 현재 병역특례 편입 준비를 위해 휴학
                    중입니다. C++, C, Python, PHP 등의 언어를 학습하며
                    프로그래밍 역량을 쌓아왔습니다.
                  </CardDescription>
                </SubCard>
                <SubCard>
                  <CardBadge>2019 ~ 2022</CardBadge>
                  <CardTitle>
                    금호고등학교
                    <CardStatus>2022년 졸업</CardStatus>
                  </CardTitle>
                  <CardDescription>
                    고등학교 시절 시각디자인을 준비하며 쌓은 미적 감각과
                    창의성을 바탕으로, 프론트엔드 개발에서도 사용자 중심의
                    디자인과 UI/UX 개선에 집중하고 있습니다.
                  </CardDescription>
                </SubCard>
              </EduCards>
            </SubCardContent>
            <SubCardContent>
              <SubCardTimeline />
              <JobCards>
                <SubCard>
                  <CardBadge>2024</CardBadge>
                  <CardTitle>
                    트러스톤자산운용
                    <CardStatus>사무보조 업무</CardStatus>
                  </CardTitle>
                  <CardDescription>
                    사무보조 및 회계 장부 관리 업무를 통해 보다 체계적이고
                    세심한 접근이 필요한 업무를 경험하였습니다. 다양한 문서
                    작업을 통해 효율적인 데이터 관리와 문서 작성 능력을
                    키웠으며, 책임감을 갖고 업무를 수행했습니다.
                  </CardDescription>
                </SubCard>
                <SubCard>
                  <CardBadge>2022 ~ 2024</CardBadge>
                  <CardTitle>
                    HR골든브릿지
                    <CardStatus>PC유지보수 업무</CardStatus>
                  </CardTitle>
                  <CardDescription>
                    현대카드, 한국은행, 한화생명 등 다양한 기관에서 PC 유지보수
                    작업을 진행하며 문제 해결 능력을 키웠습니다. 문제 대응을
                    통해 컴퓨터 시스템에 대한 이해도를 높였고, 문제 해결에 대한
                    끈기와 책임감을 갖추게 되었습니다.
                  </CardDescription>
                </SubCard>
              </JobCards>
            </SubCardContent>
          </SubCardContainer>
        </AboutCards>
      </ContentAbout>
      <ContentSkills id="skills">
        <SkillsHeader>
          <HeaderBadge />
          Skills
        </SkillsHeader>
        <SkillsTitle>Technology Stack</SkillsTitle>
        <SkillsFilter>
          <FilterItem className="active">All</FilterItem>
          <FilterItem>FrontEnd</FilterItem>
          <FilterItem>BackEnd</FilterItem>
          <FilterItem>Collab</FilterItem>
          <FilterItem>Ai</FilterItem>
          <FilterItem>Cloud/Server</FilterItem>
          <FilterItem>CS</FilterItem>
        </SkillsFilter>
        <SkillSlider
          slidesPerView={4}
          slidesPerGroup={8}
          spaceBetween={35}
          modules={[Pagination, Grid]}
          pagination={{ clickable: true }}
          grid={{ rows: 2, fill: "column" }}
        >
          <SkillCard>
            <img src={Typescript} alt="Typescript" />
            Typescript
          </SkillCard>
          <SkillCard>2</SkillCard>
          <SkillCard>3</SkillCard>
          <SkillCard>4</SkillCard>
          <SkillCard>5</SkillCard>
          <SkillCard>6</SkillCard>
          <SkillCard>7</SkillCard>
          <SkillCard>8</SkillCard>
          <SkillCard>9</SkillCard>
          <SkillCard>10</SkillCard>
          <SkillCard>9</SkillCard>
          <SkillCard>10</SkillCard>
          <SkillCard>9</SkillCard>
          <SkillCard>10</SkillCard>
          <SkillCard>9</SkillCard>
          <SkillCard>10</SkillCard>
          <SkillCard>9</SkillCard>
          <SkillCard>10</SkillCard>
          <SkillCard>9</SkillCard>
          <SkillCard>10</SkillCard>
          <SkillCard>9</SkillCard>
          <SkillCard>10</SkillCard>
          <SkillCard>9</SkillCard>
          <SkillCard>10</SkillCard>
          <SkillCard>9</SkillCard>
          <SkillCard>10</SkillCard>
          <SkillCard>9</SkillCard>
          <SkillCard>10</SkillCard>
          <SkillCard>9</SkillCard>
          <SkillCard>10</SkillCard>
          <SkillCard>9</SkillCard>
          <SkillCard>10</SkillCard>
          <SkillCard>9</SkillCard>
        </SkillSlider>
      </ContentSkills>
      <ContentTools>
        <ToolsHeader>
          <HeaderBadge />
          Tools
        </ToolsHeader>
        <ToolsContent>
          <ToolsSegment>
            {technologies
              .slice(0, technologies.length / 2 + 1)
              .map((technology, index) => (
                <ToolsItem key={index}>
                  <CheckIcon />
                  {technology}
                </ToolsItem>
              ))}
          </ToolsSegment>
          <ToolsSegment>
            {technologies
              .slice(technologies.length / 2 + 1)
              .map((technology, index) => (
                <ToolsItem key={index}>
                  <CheckIcon />
                  {technology}
                </ToolsItem>
              ))}
          </ToolsSegment>
          <span>And more...</span>
        </ToolsContent>
      </ContentTools>
      <ContentCertificates>
        <CertificatesHeader>
          <HeaderBadge />
          Certificates
        </CertificatesHeader>
        <CertificatesContent>
          <CertificateItem>
            <CertificateTitle>
              TOEIC <span>2023.11.12 취득</span>
            </CertificateTitle>
            <CertificateGrade>950점</CertificateGrade>
            <CertificateCredit>한국 TOEIC 위원회 주최</CertificateCredit>
          </CertificateItem>
          <CertificateItem>
            <CertificateTitle>
              Big Data Expert <span>2022.10.08 취득</span>
            </CertificateTitle>
            <CertificateGrade>2급</CertificateGrade>
            <CertificateCredit>KMA 한국능률협회 주최</CertificateCredit>
          </CertificateItem>
        </CertificatesContent>
      </ContentCertificates>
      <ContentContact id="contact">
        <ContactHeader>
          <HeaderBadge />
          Contact
        </ContactHeader>
        <ContactTitle>Contact Me</ContactTitle>
        <ContactContent>
          <ContactItems>
            <ContactItem>
              <ContactInfo>
                <img src={"/images/icons/PhoneIcon.png"} alt="Mobile" />
                Mobile
              </ContactInfo>
              <span>+82 10-5107-3861</span>
            </ContactItem>
            <ContactItem>
              <ContactInfo>
                <img src={"/images/icons/EmailContactIcon.png"} alt="Email" />
              </ContactInfo>
              <span>boon10034@gmail.com</span>
            </ContactItem>
          </ContactItems>
          <ContactAddress>
            <ContactInfo>
              <img src={"/images/icons/MapIcon.png"} alt="Address" />
              Location
            </ContactInfo>
            <span>서울특별시 강동구 천호대로 1239 강동자이아파트</span>
          </ContactAddress>
          <ContactMap></ContactMap>
        </ContactContent>
      </ContentContact>
      <ContentFooter>
        <FooterContent>
          <FooterText>
            Make My Projects Better <NavigateArrowIcon />
          </FooterText>
        </FooterContent>
        <FooterIndicator>
          Or..?{" "}
          <motion.img
            src={"/images/icons/IndicatorArrowIcon.png"}
            alt="Arrow"
            initial={{ y: 14 }}
            animate={{ y: 0 }}
            transition={{
              duration: 1,
              type: "spring",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </FooterIndicator>
      </ContentFooter>
    </Container>
  );
};

export default Content;
