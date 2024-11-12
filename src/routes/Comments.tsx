import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProjectList from "../components/comments/ProjectList";
import CommentsList from "../components/comments/CommentsList";
import Footer from "../components/Footer";
import { AnimatePresence, motion } from "framer-motion";
import WriteCommentsModal from "../components/comments/WriteCommentsModal";

const Container = styled(motion.div)`
  width: 100%;
  height: 100vh;
  padding-top: 160px;
  font-family: ${({ theme }) => theme.fonts.text};
  overflow: hidden;
`;

const InnerContainer = styled.div`
  width: 1700px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  gap: 40px;
`;

const LeftArea = styled.div`
  width: 640px;
  height: 800px;
  padding-right: 40px;
  overflow-y: scroll;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.cardBadgeBorder} transparent;
`;

const RightArea = styled.div`
  width: calc(100% - 640px);
  height: 800px;
`;

const containerVariants = {
  initial: { opacity: 0, scale: 1 },
  animate: { opacity: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

const Comments = () => {
  const [mode, setMode] = useState<string>("write");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  useEffect(() => {
    return () => {
      setIsModalOpen(false);
    };
  }, []);
  return (
    <>
      <AnimatePresence>
        {isModalOpen && <WriteCommentsModal setIsModalOpen={setIsModalOpen} />}
      </AnimatePresence>
      <Container
        initial="initial"
        animate="animate"
        exit="exit"
        variants={containerVariants}
        transition={{ duration: 0.2 }}
      >
        <InnerContainer>
          <LeftArea>
            <ProjectList />
          </LeftArea>
          <RightArea>
            <CommentsList setIsModalOpen={setIsModalOpen} />
          </RightArea>
        </InnerContainer>
        <Footer icon="menu" mode={mode} setIsModalOpen={setIsModalOpen} />
      </Container>
    </>
  );
};

export default Comments;
