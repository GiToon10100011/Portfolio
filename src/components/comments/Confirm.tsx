import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { INode } from "../../routes/Comments";
import { deleteComment } from "../../api";
import { commentsProjectStore } from "../../stores";

interface IConfirm {
  setIsConfirmOpen: (isOpen: boolean) => void;
  currentComment: string | null;
  head: INode | null;
  setHead: Dispatch<SetStateAction<INode | null>>;
  setCommentEditId: (id: string | null) => void;
}

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ConfirmContent = styled.div`
  padding: 60px 100px 120px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  /* background: #000;
  border-radius: ${({ theme }) => theme.borderRadius.light}; */
  backdrop-filter: blur(20px);
  span {
    font-size: 28px;
    font-weight: bold;
  }
`;

const StyledSvg = styled(motion.svg)``;

const Button = styled.button`
  flex: 1;
  width: 100%;
  height: 60px;
  border: none;
  background-color: ${({ theme }) => theme.colors.itemsBorder};
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  &:first-child {
    background-color: ${({ theme }) => theme.colors.alert};
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  width: 100%;
`;

const Container = styled(motion.div)`
  top: 0;
  left: 0;
  position: fixed;
  z-index: 7;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 768px) {
    ${ConfirmContent} {
      padding: 20px;
      padding-bottom: 90px;
      span {
        font-size: 18px;
        font-weight: 500;
      }
      ${StyledSvg} {
        width: 300px;
        height: 300px;
      }
    }
  }
`;

const variants = {
  initial: { opacity: 0, filter: "blur(10px)" },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6 },
  },
  exit: { opacity: 0 },
};

const lidVariants = {
  initial: {
    rotate: 0,
    y: 0,
    x: 0,
  },
  animate: {
    rotate: [0, -35, 0, -35, 0],
    y: [0, -4, 0, -4, 0],
    x: [0, -3, 0, -3, 0],
    transition: {
      delay: 1,
      duration: 1.2,
      repeat: Infinity,
      repeatDelay: 3,
      type: "tween",
      times: [0, 0.25, 0.5, 0.75, 1],
    },
  },
};

const Confirm = ({
  setIsConfirmOpen,
  setHead,
  currentComment,
  setCommentEditId,
}: IConfirm) => {
  const { commentsProject } = commentsProjectStore();
  const handleDelete = async () => {
    if (currentComment && commentsProject) {
      const response = await deleteComment(commentsProject, currentComment);
      setHead(response.head);
    }
    setIsConfirmOpen(false);
  };
  const handleCancel = () => {
    setCommentEditId(null);
    setIsConfirmOpen(false);
  };
  return (
    <Container
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
    >
      <Overlay onClick={() => setIsConfirmOpen(false)} />
      <ConfirmContent>
        <StyledSvg width="400" height="400" viewBox="0 0 20 20" fill="none">
          <motion.g
            variants={lidVariants}
            initial="initial"
            animate="animate"
            style={{ transformOrigin: "10px 5px" }}
          >
            <path
              d="M6.6665 5.00008V3.33341C6.6665 2.89139 6.8421 2.46746 7.15466 2.1549C7.46722 1.84234 7.89114 1.66675 8.33317 1.66675H11.6665C12.1085 1.66675 12.5325 1.84234 12.845 2.1549C13.1576 2.46746 13.3332 2.89139 13.3332 3.33341V5.00008M2.5 5H17.5"
              stroke="#aaa"
              strokeWidth="0.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.g>
          <path
            d="M15.8332 5.00008V16.6667C15.8332 17.1088 15.6576 17.5327 15.345 17.8453C15.0325 18.1578 14.6085 18.3334 14.1665 18.3334H5.83317C5.39114 18.3334 4.96722 18.1578 4.65466 17.8453C4.3421 17.5327 4.1665 17.1088 4.1665 16.6667V5.00008"
            stroke="#aaa"
            strokeWidth="0.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.3335 9.16675V14.1667"
            stroke="#aaa"
            strokeWidth="0.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.6665 9.16675V14.1667"
            stroke="#aaa"
            strokeWidth="0.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </StyledSvg>
        <span>정말 삭제하시겠습니까?</span>
        <ButtonContainer>
          <Button onClick={handleDelete}>삭제</Button>
          <Button onClick={handleCancel}>취소</Button>
        </ButtonContainer>
      </ConfirmContent>
    </Container>
  );
};

export default Confirm;
