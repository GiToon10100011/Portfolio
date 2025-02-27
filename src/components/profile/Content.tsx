import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { CheckIcon, NavigateArrowIcon, popupStyle } from "../../Icons";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import skills from "../../skills.json";
import { useCallback, useEffect, useRef, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import IntroduceText from "./IntroduceText";
import { profileAnimationVariants } from "./profileAnimationVariants";
import {
  commentsProjectStore,
  cursorChangingStore,
  responsiveStore,
} from "../../stores";
import projects from "../../projects.json";

const containerStyle = {
  height: "500px",
  borderRadius: "20px",
  filter: "grayscale(0.6)",
};

const center = {
  lat: 37.5398708,
  lng: 127.1452641,
};

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
    position: relative;
    display: inline-block;
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
  margin-bottom: -50px;
`;

const ContentStrengths = styled(motion.section)`
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
const Strengths = styled(motion.ul)`
  display: flex;
  gap: 40px;
  align-items: center;
`;
const StrengthItem = styled(motion.li)`
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

const ContentAbout = styled(motion.section)``;
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

const MainCard = styled(motion.div)`
  padding: 30px;
  border: 2px solid ${({ theme }) => theme.colors.textPoint};
  border-radius: ${({ theme }) => theme.borderRadius.main};
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: flex-start;
`;

const SubCardTimeline = styled(motion.div)`
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

const SubCardContainer = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  gap: 130px;
`;
const SubCardContent = styled.div`
  display: flex;
  gap: 30px;
`;

const EduCards = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 80px;
`;
const JobCards = styled(EduCards)``;
const SubCard = styled(motion(MainCard))`
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

const ContentSkills = styled(motion.section)``;
const SkillsHeader = styled(AboutHeader)``;
const SkillsTitle = styled(motion(AboutTitle))`
  margin-bottom: 40px;
`;
const SkillsFilter = styled.ul`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  z-index: 4;
`;
const FilterItem = styled.li`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.lightBorder};
  border-radius: ${({ theme }) => theme.borderRadius.main};
  color: ${({ theme }) => theme.colors.text};
  transition: background 0.3s ease;
  cursor: pointer;
  &.active {
    background: ${({ theme }) => theme.colors.point};
  }
`;

const SkillSlider = styled(Swiper)`
  height: 700px;
  overflow: visible;
  scrollbar-width: none;
  .swiper-wrapper {
    width: 100% !important;
    height: 100% !important;
  }
  .swiper-pagination {
    bottom: -20px;
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
  .swiper-button-next,
  .swiper-button-prev {
    color: ${({ theme }) => theme.colors.textPoint};
    top: 0px;
    left: 0;
    width: 1100px;
    display: flex;
    justify-content: flex-end;
    height: 0;
    &::after {
      font-size: 24px;
      margin-bottom: 60px;
      margin-left: -20px;
      margin-right: -20px;
    }
  }
  .swiper-button-prev {
    padding-right: 50px;
  }
`;

const SkillCard = styled.div`
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
  perspective: 1000px;
  transition: transform 0.6s ease;
  & > * {
    transition: opacity 0.3s ease;
  }
`;

const SkillCardBack = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 35px);
  padding: 28px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  opacity: 0;
  transition: opacity 0.6s ease;
  span {
    font-size: 24px;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.colors.textPoint};
  }
  p {
    font-size: 14px;
    line-height: 1.5;
    word-break: keep-all;
  }
`;

const SkillCardWrapper = styled(SwiperSlide)`
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  &:hover {
    ${SkillCardBack} {
      opacity: 1;
    }
    ${SkillCard} {
      transform: rotateY(180deg);
      & > * {
        opacity: 0;
      }
    }
  }
`;

const ContentTools = styled(motion.section)``;
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
const ToolsSegment = styled(motion.ul)`
  width: 530px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
const ToolsItem = styled(motion.li)`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.text};
`;

const ContentCertificates = styled(motion.section)``;
const CertificatesHeader = styled(ToolsHeader)``;
const CertificatesContent = styled(motion.ul)`
  display: flex;
  justify-content: space-between;
`;
const CertificateItem = styled(motion.li)`
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
const ContactContent = styled(motion(CertificatesContent))`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
const ContactItems = styled(motion.ul)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
`;
const ContactItem = styled(motion(CertificateItem))`
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
const ContactMap = styled(GoogleMap)`
  height: 500px;
  overflow: hidden;
  background: #333;
  margin-bottom: 40px;
`;
const ContentFooter = styled(motion.section)``;
const FooterContent = styled(motion.div)`
  margin-bottom: 240px;
`;
const FooterText = styled(motion.a)`
  display: inline-block;
  position: relative;
  font-size: 120px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
  line-height: 1.2;
  cursor: pointer;
  transition: color 0.3s ease;
  svg {
    display: inline-block;
    margin-left: 30px;
    path {
      transition: stroke 0.3s;
    }
  }
  &:hover {
    color: ${({ theme }) => theme.colors.icons};
    path {
      stroke: ${({ theme }) => theme.colors.icons};
    }
    &::before {
      color: ${({ theme }) => theme.colors.text};
    }
  }
  ${popupStyle(20)}
  &::before {
    content: "방명록을 통해 피드백 등을 남기실 수 있습니다.";
    display: flex;
    align-items: center;
    justify-content: center;
    left: 40px;
    bottom: -140px;
    width: 280px;
    height: 90px;
    font-size: 22px;
    word-break: keep-all;
    line-height: 1.5;
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    opacity: 0;
    transform: scaleY(0);
    transform-origin: top;
  }
  &::after {
    bottom: -20px;
    left: 120px;
    opacity: 0;
    transform: scaleY(-1);
  }
`;
const FooterIndicator = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  text-align: right;
  font-size: 40px;
  color: ${({ theme }) => theme.colors.subText};
  font-weight: 550;
  padding-right: 40px;
  pointer-events: none;
  span {
    pointer-events: auto;
  }
  ${popupStyle(12)}
  &::before {
    content: "Go back and check out my projects";
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 120%;
    width: 160px;
    height: 40px;
    font-size: 14px;
    opacity: 0;
    transform: scaleY(0);
    transform-origin: bottom;
  }
  &::after {
    top: -12px;
    right: 160px;
    opacity: 0;
  }
`;

const Container = styled.main<{ $isBottom: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 130px;
  padding-bottom: 110px;
  overflow-x: hidden;
  scrollbar-width: none;
  scroll-behavior: smooth;
  &::before {
    content: "";
    z-index: 2;
    position: absolute;
    left: 0;
    bottom: 80px;
    filter: blur(14px);
    background: linear-gradient(
      to bottom,
      transparent,
      ${({ theme }) => theme.colors.background}
    );
    width: 100%;
    height: 60px;
    pointer-events: none;
    transition: opacity 0.3s ease;
    opacity: ${({ $isBottom }) => ($isBottom ? 0 : 1)};
  }

  @media (max-width: 768px) {
    width: 100%;
    gap: 80px;
    padding-bottom: 60px;
    &::before {
      display: none;
    }
    & > * {
      padding: 0 20px;
    }
    ${ContentIntroduce} {
      ${IntroduceHeader} {
        padding: 20px 0;
        ${IntroduceSubtitle} {
          line-height: 1.4;
        }
        ${IntroduceTitle} {
          font-size: 30px;
          word-break: keep-all;
          line-height: 1.2;
        }
      }
      ${IntroduceInfo} {
        font-size: 16px;
        line-height: 1.5;
        word-break: keep-all;
        margin-bottom: 20px;
      }
    }
    ${ContentStrengths} {
      ${StrengthsHeader} {
        margin-bottom: 0;
        font-size: 20px;
      }
      ${Strengths} {
        flex-direction: column;
        align-items: flex-start;
        ${StrengthItem} {
          font-size: 18px;
          ${StrengthNumbering} {
            font-size: 60px;
            font-weight: ${({ theme }) => theme.fontWeight.regular};
          }
          ${Strength} {
            font-size: 20px;
          }
        }
      }
    }
    ${ContentAbout} {
      ${AboutHeader} {
        font-size: 20px;
        margin-bottom: 10px;
      }
      ${AboutTitle} {
        font-size: 30px;
        line-height: 1.4;
        margin-bottom: 40px;
      }
      ${AboutCards} {
        flex-direction: column;
        gap: 20px;
        ${MainCard} {
          width: 100%;
          margin-bottom: 30px;
          ${CardBadge} {
            font-size: 14px;
          }
          ${CardTitle} {
            font-size: 24px;
            word-break: keep-all;
            line-height: 1.4;
          }
        }
        ${SubCardContainer} {
          width: 100%;
          flex-direction: column;
          gap: 60px;
          ${SubCardContent} {
            gap: 14px;
            ${SubCardTimeline} {
              height: 740px;
              &::before,
              &::after {
                width: 10px;
                height: 10px;
              }
              &::after {
                top: 60%;
              }
            }
            ${EduCards} {
              gap: 40px;
              ${SubCard} {
                width: 100%;
                height: fit-content;
                min-height: 360px;
              }
            }
          }
        }
      }
    }
    ${ContentSkills} {
      ${SkillsHeader} {
        font-size: 20px;
        padding: 0;
        margin-bottom: 14px;
      }
      ${SkillsTitle} {
        font-size: 30px;
        line-height: 1.4;
        margin-bottom: 30px;
      }
      ${SkillsFilter} {
        overflow-x: scroll;
        margin-bottom: 40px;
        gap: 10px;
        ${FilterItem} {
          font-size: 14px;
        }
      }
      ${SkillSlider} {
        height: 540px !important;
        .swiper-pagination {
          bottom: -40px;
        }
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
        }
      }
      ${SkillCardWrapper} {
        width: 100%;
        ${SkillCardBack} {
          height: 260px !important;
          gap: 20px;
        }
        ${SkillCard} {
          height: 260px !important;
          margin-bottom: 0 !important;
        }
      }
    }
    ${ContentTools} {
      ${ToolsHeader} {
        font-size: 20px;
        margin-bottom: 50px;
      }
      ${ToolsContent} {
        span {
          font-size: 18px;
        }
        ${ToolsSegment} {
          ${ToolsItem} {
            font-size: 18px;
            svg {
              width: 16px;
              height: 16px;
            }
          }
        }
      }
    }
    ${ContentCertificates} {
      ${CertificatesHeader} {
        font-size: 20px;
        margin-bottom: 30px;
      }
      ${CertificatesContent} {
        flex-direction: column;
        gap: 40px;
        ${CertificateItem} {
          width: 100%;
          ${CertificateTitle} {
            font-size: 24px;
            margin-bottom: 12px;
            span {
              font-size: 14px;
            }
          }
          ${CertificateGrade} {
            font-size: 40px;
            margin-bottom: 20px;
          }
          ${CertificateCredit} {
            font-size: 14px;
          }
        }
      }
    }
    ${ContentContact} {
      ${ContactHeader} {
        font-size: 20px;
        margin-bottom: 30px;
      }
      ${ContactTitle} {
        font-size: 30px;
        line-height: 1.4;
        margin-bottom: 30px;
      }
      ${ContactContent} {
        flex-direction: column;
        gap: 20px;
        ${ContactItems} {
          flex-direction: column;
          gap: 20px;
          ${ContactItem} {
            padding: 40px 20px;
            width: 100%;
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
            span {
              font-size: 20px;
            }
            ${ContactInfo} {
              img {
                width: 60px;
                height: 60px;
              }
            }
          }
        }
        ${ContactAddress} {
          flex-direction: column;
          align-items: start;
          gap: 20px;
          padding: 40px 20px;
          ${ContactInfo} {
            img {
              width: 60px;
              height: 60px;
            }
            font-size: 24px;
          }
          span {
            font-size: 20px;
          }
        }
        ${ContactMap} {
          height: 400px;
        }
      }
    }
    ${ContentFooter} {
      ${FooterContent} {
        ${FooterText} {
          font-size: 38px;
          svg {
            margin-left: 10px;
            width: 100px;
            height: 20px;
          }
        }
      }
      ${FooterIndicator} {
        padding-right: 0;
        padding-bottom: 30px;
        span {
          font-size: 20px;
        }
        img {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
`;

const technologies = [
  "Babel",
  "Vite",
  "Framer Motion",
  "React-Beautiful-DND",
  "React Bootstrap",
  "Morgan",
  "ApexCharts",
  "Pug.js",
  "React Router DOM",
  "React Hook Form",
  "Open Weather",
  "Redux Thunk",
  "Google Translate",
  "Swiper",
  "Google GeoLocation",
  "Axios",
  "Unsplash",
  "Navigator",
  "Kakao",
  "Web APIs",
];

const Content = ({ setSection }: { setSection: (section: string) => void }) => {
  const navigate = useNavigate();
  const { setCursorChanging } = cursorChangingStore();
  const { setCommentsProject } = commentsProjectStore();
  const { isResponsive } = responsiveStore();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeSkills, setActiveSkills] = useState(skills);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
  });
  const onLoad = useCallback(function callback(map: google.maps.Map) {
    map.setCenter(center);
    map.setZoom(15);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  useEffect(() => {
    return;
  }, [map]);

  const viewRefs = {
    profile: useRef(null),
    about: useRef(null),
    skills: useRef(null),
    contact: useRef(null),
    footer: useRef(null),
  };

  const inViews = {
    profile: useInView(viewRefs.profile),
    about: useInView(viewRefs.about, {
      amount: 0.5,
    }),
    skills: useInView(viewRefs.skills, {
      amount: 0.9,
      margin: "0px 0px 200px 0px",
    }),
    contact: useInView(viewRefs.contact, {
      amount: 0.5,
    }),
    footer: useInView(viewRefs.footer, {
      amount: 0.5,
    }),
  };

  const animationRefs = {
    strengths: useRef(null),
    aboutMainCard: useRef(null),
    aboutSubCard: useRef(null),
    tools: useRef(null),
    certificates: useRef(null),
    contact: useRef(null),
    footer: useRef(null),
  };

  const InViewAnimations = {
    strengths: useInView(animationRefs.strengths, {
      amount: 0.9,
    }),
    aboutMainCard: useInView(animationRefs.aboutMainCard, {
      amount: 0.5,
      once: true,
    }),
    aboutSubCard: useInView(animationRefs.aboutSubCard, {
      amount: isResponsive ? 0.1 : 0.5,
      once: true,
    }),
    tools: useInView(animationRefs.tools, {
      amount: 0.5,
      once: true,
    }),
    certificates: useInView(animationRefs.certificates, {
      amount: 0.9,
      once: true,
    }),
    contact: useInView(animationRefs.contact, {
      amount: 0.3,
      once: true,
    }),
    footer: useInView(animationRefs.footer, {
      amount: 0.9,
    }),
  };

  const filters = new Set(skills.map((skill) => skill.category));

  useEffect(() => {
    if (activeFilter === "All") {
      setActiveSkills(skills);
    } else {
      setActiveSkills(
        skills.filter((skill) => skill.category === activeFilter)
      );
    }
  }, [activeFilter]);

  useEffect(() => {
    if (inViews.about) {
      setSection("about");
    } else if (inViews.skills) {
      setSection("skills");
    } else if (inViews.contact) {
      setSection("contact");
    } else if (inViews.profile) {
      setSection("profile");
    }
  }, [inViews]);

  return (
    <Container $isBottom={inViews.footer}>
      <ContentIntroduce id="top" ref={viewRefs.profile}>
        <IntroduceHeader>
          <IntroduceSubtitle>
            안녕하세요, I'm <IntroduceText />
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
      <ContentStrengths ref={animationRefs.strengths}>
        <StrengthsHeader>
          <HeaderBadge></HeaderBadge>
          Strengths
        </StrengthsHeader>
        <Strengths
          initial="hidden"
          animate={InViewAnimations.strengths ? "visible" : undefined}
          variants={profileAnimationVariants.strengths}
        >
          <StrengthItem variants={profileAnimationVariants.strengthsChildren}>
            <StrengthNumbering>1</StrengthNumbering>
            <Strength>
              <span>문제해결을 즐깁니다.</span>
              <span>Problem Solving</span>
            </Strength>
          </StrengthItem>
          <StrengthItem variants={profileAnimationVariants.strengthsChildren}>
            <StrengthNumbering>2</StrengthNumbering>
            <Strength>
              <span>영어에 능통합니다.</span>
              <span>Fluent English</span>
            </Strength>
          </StrengthItem>
          <StrengthItem variants={profileAnimationVariants.strengthsChildren}>
            <StrengthNumbering>3</StrengthNumbering>
            <Strength>
              <span>지속적인 학습을 추구합니다.</span>
              <span>Continuous Learning</span>
            </Strength>
          </StrengthItem>
        </Strengths>
      </ContentStrengths>
      <ContentAbout id="about" ref={viewRefs.about}>
        <AboutHeader>
          <HeaderBadge />
          About
        </AboutHeader>
        <AboutTitle>Work Experience & Education</AboutTitle>
        <AboutCards>
          <MainCard
            ref={animationRefs.aboutMainCard}
            initial="hidden"
            animate={InViewAnimations.aboutMainCard ? "visible" : undefined}
            variants={profileAnimationVariants.aboutMainCard}
          >
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
              즐깁니다. 앞으로도 데이터와 문제 해결을 통해 사자 경험을 개선하는
              프론트엔드 개발자로 꾸준히 성장해 나가겠습니다.
            </CardDescription>
          </MainCard>
          <SubCardContainer ref={animationRefs.aboutSubCard}>
            <SubCardContent>
              <SubCardTimeline
                initial={{ opacity: 0 }}
                animate={{
                  opacity: InViewAnimations.aboutSubCard ? 1 : 0,
                }}
                transition={{ duration: 0.3, type: "tween", delay: 0.4 }}
              />
              <EduCards
                initial="hidden"
                animate={InViewAnimations.aboutSubCard ? "visible" : undefined}
                variants={profileAnimationVariants.aboutSubCard}
              >
                <SubCard
                  variants={profileAnimationVariants.aboutSubCardChildren}
                >
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
                <SubCard
                  variants={profileAnimationVariants.aboutSubCardChildren}
                >
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
              <SubCardTimeline
                initial={{ opacity: 0 }}
                animate={{
                  opacity: InViewAnimations.aboutSubCard ? 1 : 0,
                }}
                transition={{ duration: 0.3, type: "tween", delay: 0.4 }}
              />
              <JobCards
                initial="hidden"
                animate={InViewAnimations.aboutSubCard ? "visible" : undefined}
                variants={profileAnimationVariants.aboutSubCard}
              >
                <SubCard
                  variants={profileAnimationVariants.aboutSubCardChildren}
                >
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
                <SubCard
                  variants={profileAnimationVariants.aboutSubCardChildren}
                >
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
      <ContentSkills id="skills" ref={viewRefs.skills}>
        <SkillsHeader>
          <HeaderBadge />
          Skills
        </SkillsHeader>
        <SkillsTitle>Technology Stack</SkillsTitle>
        <SkillsFilter>
          {["All", ...Array.from(filters)].map((filter, index) => (
            <FilterItem
              key={index}
              onMouseEnter={() => setCursorChanging(true)}
              onMouseLeave={() => setCursorChanging(false)}
              onClick={() => setActiveFilter(filter)}
              className={activeFilter === filter ? "active" : ""}
            >
              {filter}
            </FilterItem>
          ))}
        </SkillsFilter>
        <div
          onMouseEnter={() => setCursorChanging(true)}
          onMouseLeave={() => setCursorChanging(false)}
        >
          <SkillSlider
            slidesPerView={
              !isResponsive && activeSkills.length > 4
                ? 4
                : !isResponsive && activeSkills.length > 2
                ? 2
                : 1
            }
            slidesPerGroup={
              !isResponsive && activeSkills.length > 4
                ? 4
                : !isResponsive && activeSkills.length > 2
                ? 2
                : 1
            }
            spaceBetween={35}
            modules={[Pagination, Grid, Navigation]}
            navigation
            pagination={{ clickable: true }}
            grid={{ rows: 2, fill: "column" }}
            grabCursor={true}
            breakpoints={{
              1024: {
                slidesPerView: 4,
                slidesPerGroup: 4,
                grid: {
                  rows: 2,
                  fill: "column",
                },
              },
              480: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                grid: {
                  rows: 2,
                  fill: "column",
                },
                spaceBetween: 20,
              },
              320: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                grid: {
                  rows: 2,
                  fill: "column",
                },
                spaceBetween: 10,
              },
            }}
          >
            {activeSkills.map((skill, index) => (
              <SkillCardWrapper
                key={index}
                data-title={skill.title}
                data-content={skill.description}
              >
                <SkillCardBack>
                  <span>{skill.title}</span>
                  <p>{skill.description}</p>
                </SkillCardBack>
                <SkillCard>
                  <img src={skill.icon} alt={skill.title} />
                  <span>{skill.title}</span>
                </SkillCard>
              </SkillCardWrapper>
            ))}
          </SkillSlider>
        </div>
      </ContentSkills>
      <ContentTools ref={animationRefs.tools}>
        <ToolsHeader>
          <HeaderBadge />
          Tools
        </ToolsHeader>
        <ToolsContent>
          <ToolsSegment
            initial="hidden"
            animate={InViewAnimations.tools ? "visible" : undefined}
            variants={profileAnimationVariants.tools}
          >
            {technologies
              .slice(0, technologies.length / 2 + 1)
              .map((technology, index) => (
                <ToolsItem
                  key={index}
                  variants={profileAnimationVariants.toolsChildren}
                >
                  <CheckIcon />
                  {technology}
                </ToolsItem>
              ))}
          </ToolsSegment>
          <ToolsSegment
            initial="hidden"
            animate={InViewAnimations.tools ? "visible" : undefined}
            variants={profileAnimationVariants.tools}
          >
            {technologies
              .slice(technologies.length / 2)
              .map((technology, index) => (
                <ToolsItem
                  key={index}
                  variants={profileAnimationVariants.toolsChildren}
                >
                  <CheckIcon />
                  {technology}
                </ToolsItem>
              ))}
          </ToolsSegment>
          <span>And more...</span>
        </ToolsContent>
      </ContentTools>
      <ContentCertificates ref={animationRefs.certificates}>
        <CertificatesHeader>
          <HeaderBadge />
          Certificates
        </CertificatesHeader>
        <CertificatesContent
          initial="hidden"
          animate={InViewAnimations.certificates ? "visible" : undefined}
          variants={profileAnimationVariants.certificates}
        >
          <CertificateItem
            variants={profileAnimationVariants.certificatesChildren}
          >
            <CertificateTitle>
              TOEIC <span>2023.11.12 취득</span>
            </CertificateTitle>
            <CertificateGrade>950점</CertificateGrade>
            <CertificateCredit>한 TOEIC 위원회 주최</CertificateCredit>
          </CertificateItem>
          <CertificateItem
            variants={profileAnimationVariants.certificatesChildren}
          >
            <CertificateTitle>
              Big Data Expert <span>2022.10.08 취득</span>
            </CertificateTitle>
            <CertificateGrade>2급</CertificateGrade>
            <CertificateCredit>KMA 한국능률협회 주최</CertificateCredit>
          </CertificateItem>
        </CertificatesContent>
      </ContentCertificates>
      <ContentContact id="contact" ref={viewRefs.contact}>
        <ContactHeader>
          <HeaderBadge />
          Contact
        </ContactHeader>
        <ContactTitle>Contact Me</ContactTitle>
        <ContactContent
          ref={animationRefs.contact}
          initial="hidden"
          animate={InViewAnimations.contact ? "visible" : undefined}
          variants={profileAnimationVariants.contact}
        >
          <ContactItems
            variants={profileAnimationVariants.certificatesChildren}
          >
            <ContactItem
              variants={profileAnimationVariants.contactChildrenDepth}
            >
              <ContactInfo>
                <img src={"/images/icons/PhoneIcon.png"} alt="Mobile" />
                Mobile
              </ContactInfo>
              <span>+82 10-5107-3861</span>
            </ContactItem>
            <ContactItem
              variants={profileAnimationVariants.contactChildrenDepth}
            >
              <ContactInfo>
                <img src={"/images/icons/EmailContactIcon.png"} alt="Email" />
              </ContactInfo>
              <span>boon10034@gmail.com</span>
            </ContactItem>
          </ContactItems>
          <ContactAddress variants={profileAnimationVariants.contactChildren}>
            <ContactInfo>
              <img src={"/images/icons/MapIcon.png"} alt="Address" />
              Location
            </ContactInfo>
            <span>서울특별시 강동구 천호대로</span>
          </ContactAddress>
          <div
            onMouseEnter={() => setCursorChanging(true)}
            onMouseLeave={() => setCursorChanging(false)}
          >
            {isLoaded && (
              <ContactMap
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{
                  zoom: 15,
                  center: center,
                  disableDefaultUI: true,
                  zoomControl: true,
                }}
                mapContainerStyle={containerStyle}
              >
                <Marker position={center} />
              </ContactMap>
            )}
          </div>
        </ContactContent>
      </ContentContact>
      <ContentFooter ref={viewRefs.footer}>
        <FooterContent ref={animationRefs.footer}>
          <FooterText
            onClick={() => {
              navigate(`/comments#${projects[0].id}`);
              setCommentsProject(projects[0].id);
            }}
            onMouseEnter={() => setCursorChanging(true)}
            onMouseLeave={() => setCursorChanging(false)}
            initial="hidden"
            animate={InViewAnimations.footer ? "visible" : undefined}
            variants={profileAnimationVariants.footer}
          >
            Make My Projects Better <NavigateArrowIcon />
          </FooterText>
        </FooterContent>
        <FooterIndicator>
          <span>Or..?</span>
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
