import { useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import { NotFoundIcon } from "../Icons";
import { AnimatePresence, motion } from "framer-motion";
import { responsiveStore } from "../stores";

const PageNotFound = styled(motion.div)`
  position: relative;
  width: 1200px;
  height: 700px;
  background: ${({ theme }) => theme.colors.subBackground};
`;

const ModalContent = styled.div`
  padding: 80px;
`;

const ModalHeader = styled.div``;

const SubTitle = styled.h2`
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.subText};
  font-family: ${({ theme }) => theme.fonts.text};
`;

const Title404 = styled.h1`
  font-size: 64px;
  font-family: ${({ theme }) => theme.fonts.text};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  color: ${({ theme }) => theme.colors.text};
`;

const Title = styled.h1`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 30px;
  font-size: 40px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const ModalDesc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  font-size: 30px;
`;

const DescTitle = styled.h2``;

const DescInfo = styled.p`
  line-height: 1.5;
  margin-left: 10px;
  div {
    display: flex;
    p {
      span {
        color: ${({ theme }) => theme.colors.textPoint};
      }
    }
    &::before {
      content: "•";
      margin-right: 10px;
    }
  }
`;

const DescMore = styled.p`
  a {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.textPoint};
    cursor: pointer;
  }
`;

const ConfirmButton = styled.button`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  background-color: ${({ theme }) => theme.colors.subBackground};
  border: 4px solid transparent;
  border-top: 1px solid ${({ theme }) => theme.colors.itemsBorder};
  font-family: ${({ theme }) => theme.fonts.text};
  font-size: 36px;
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.darkBackground};
    border: 4px solid ${({ theme }) => theme.colors.textPoint};
  }
`;

const Container = styled(motion.div)`
  position: fixed;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.krText};
  color: ${({ theme }) => theme.colors.text};
  @media (max-width: 768px) {
    ${PageNotFound} {
      top: 180px;
      width: 100%;
      height: 100%;
      background: none;
      ${ModalContent} {
        padding: 30px;
        ${ModalHeader} {
          ${Title404} {
            margin-bottom: 20px;
          }
          ${SubTitle} {
            font-size: 16px;
          }
          ${Title} {
            font-size: 20px;
            svg {
              width: 24px;
              height: 24px;
            }
          }
        }
        ${ModalDesc} {
          font-size: 14px;
          line-height: 1.5;
        }
      }
    }
  }
`;

const NotFound = () => {
  const { isResponsive } = responsiveStore();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleModalOpen = () => {
    setIsModalOpen(false);
  };

  return (
    <Container exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
      <AnimatePresence>
        {isModalOpen && (
          <PageNotFound
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ModalContent>
              <ModalHeader>
                {isResponsive && <Title404>404</Title404>}
                <SubTitle>Error: Page Not Found</SubTitle>
                <Title>
                  <NotFoundIcon />
                  페이지를 찾을 수 없습니다.
                </Title>
              </ModalHeader>
              <ModalDesc>
                <DescTitle>
                  죄송합니다. 요청하신 페이지를 찾을 수 없습니다.
                </DescTitle>
                <DescInfo>
                  <div>
                    <p>URL이 정확한지 다시 한번 확인해 주세요.</p>
                  </div>
                  <div>
                    <p>
                      <span>오른쪽 하단의 홈 버튼</span>을 눌러 포트폴리오 메인
                      페이지로 이동해 주세요.
                    </p>
                  </div>
                  <div>
                    <p>
                      프로필 페이지를 원하시면 <span>왼쪽상단의</span> 프로필
                      아이콘을 통해 이동하실 수 있습니다.
                    </p>
                  </div>
                </DescInfo>
                <DescMore>
                  필요한 내용을 찾기 어려우시면{" "}
                  <a href="mailto:boon10034@gmail.com" target="_blank">
                    저에게 직접 문의
                  </a>
                  해 주세요!
                </DescMore>
              </ModalDesc>
            </ModalContent>
            <ConfirmButton onClick={handleModalOpen}>OK</ConfirmButton>
          </PageNotFound>
        )}
      </AnimatePresence>
      <Footer />
    </Container>
  );
};

export default NotFound;
