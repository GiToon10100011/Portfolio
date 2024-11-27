import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProjectList from "../components/comments/ProjectList";
import CommentsList from "../components/comments/CommentsList";
import Footer from "../components/Footer";
import { AnimatePresence, motion } from "framer-motion";
import WriteCommentsModal from "../components/comments/WriteCommentsModal";
import { commentsProjectStore } from "../stores";
import { fetchComments } from "../api";

export interface INode {
  data: IComment;
  next: INode | null;
}
export interface IComment {
  id: string;
  username: string;
  password: string;
  content: string;
  createdAt: string;
}

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
  position: relative;
  width: calc(100% - 640px);
  height: 800px;
  &::before {
    content: "";
    z-index: 2;
    position: absolute;
    left: 0;
    bottom: 0px;
    filter: blur(14px);
    background: linear-gradient(to bottom, transparent, #111);
    width: 100%;
    height: 60px;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }
`;

const containerVariants = {
  initial: { opacity: 0, scale: 1 },
  animate: { opacity: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

const Comments = () => {
  const { commentsProject } = commentsProjectStore();
  const [mode, setMode] = useState<string>("write");
  const [head, setHead] = useState<INode | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [commentEditId, setCommentEditId] = useState<string | null>(null);

  useEffect(() => {
    fetchComments(commentsProject).then((data) => {
      setHead(data.head);
    });
  }, [commentsProject]);
  useEffect(() => {
    return () => {
      setIsModalOpen(false);
    };
  }, []);
  return (
    <>
      <AnimatePresence>
        {isModalOpen && (
          <WriteCommentsModal
            setIsModalOpen={setIsModalOpen}
            commentEditId={commentEditId}
            setCommentEditId={setCommentEditId}
            head={head}
            setHead={setHead}
          />
        )}
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
            <CommentsList
              setIsModalOpen={setIsModalOpen}
              commentEditId={commentEditId}
              setCommentEditId={setCommentEditId}
              head={head}
              setHead={setHead}
            />
          </RightArea>
        </InnerContainer>
        <Footer
          icon="menu"
          mode={mode}
          setIsModalOpen={setIsModalOpen}
          setCommentEditId={setCommentEditId}
        />
      </Container>
    </>
  );
};

export default Comments;
