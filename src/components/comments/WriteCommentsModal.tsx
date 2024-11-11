import { motion } from "framer-motion";
import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

interface IWriteCommentsModal {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const Container = styled(motion.div)`
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(30px);
  font-family: ${({ theme }) => theme.fonts.text};
`;

const FormContainer = styled.form`
  width: 1600px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const CredentialsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const UsernameInput = styled.input`
  width: 740px;
  height: 100px;
  padding: 40px 30px;
  border: 4px solid ${({ theme }) => theme.colors.text};
  background-color: transparent;
  font-family: ${({ theme }) => theme.fonts.text};
  font-size: 32px;
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.3s;
  &::placeholder {
    color: ${({ theme }) => theme.colors.text};
    font-size: 28px;
    transition: all 0.3s;
  }
  &:focus {
    outline: none;
    border: 4px solid ${({ theme }) => theme.colors.textPoint};
    &::placeholder {
      opacity: 0;
    }
  }
`;
const PasswordInput = styled(UsernameInput)``;
const CommentInput = styled(UsernameInput)`
  width: 100%;
  height: 400px;
  &::placeholder {
    font-size: 32px;
    opacity: 0.8;
  }
`;
const ModalMenu = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
`;
const SelectedProject = styled.span`
  font-size: 28px;
  color: ${({ theme }) => theme.colors.text};
  span {
    color: ${({ theme }) => theme.colors.textPoint};
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;
const CancelButton = styled(motion.button)`
  width: 300px;
  height: 100%;
  font-size: 36px;
  font-family: ${({ theme }) => theme.fonts.text};
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.itemsBorder};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.light};
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    opacity: 0.8;
  }
`;
const SubmitButton = styled(CancelButton)`
  background-color: ${({ theme }) => theme.colors.point};
`;

const WriteCommentsModal = ({ setIsModalOpen }: IWriteCommentsModal) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    if (setIsModalOpen) {
      setIsModalOpen(false);
    }
  };
  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <FormContainer onSubmit={handleSubmit}>
        <CredentialsContainer>
          <UsernameInput placeholder="Username" />
          <PasswordInput placeholder="Password" />
        </CredentialsContainer>
        <CommentInput as="textarea" placeholder="Leave a comment/feedback..." />
        <ModalMenu>
          <SelectedProject>
            <span>Selected Project:</span> The Legend of Zelda: Tears of the
            Kingdom
          </SelectedProject>
          <ButtonContainer>
            <CancelButton whileTap={{ scale: 0.9 }} onClick={handleCancel}>
              Cancel
            </CancelButton>
            <SubmitButton whileTap={{ scale: 0.9 }}>Submit</SubmitButton>
          </ButtonContainer>
        </ModalMenu>
      </FormContainer>
    </Container>
  );
};

export default WriteCommentsModal;
