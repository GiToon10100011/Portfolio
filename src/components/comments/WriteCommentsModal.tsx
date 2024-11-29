import { motion } from "framer-motion";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { IComment, INode } from "../../routes/Comments";
import { commentsProjectStore } from "../../stores";
import projects from "../../projects.json";
import { addComment, editComment } from "../../api";
import { PulseLoader } from "react-spinners";

interface IWriteCommentsModal {
  setIsModalOpen: (isOpen: boolean) => void;
  commentEditId: string | null;
  setCommentEditId: (id: string | null) => void;
  head: INode | null;
  setHead: Dispatch<SetStateAction<INode | null>>;
  setIsCommentAdded: (isAdded: boolean) => void;
}

const Container = styled(motion.div)`
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(40px);
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

const PasswordContainer = styled.div`
  position: relative;
  span {
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 32px;
    color: ${({ theme }) => theme.colors.subText};
    cursor: pointer;
  }
`;
const PasswordInput = styled(UsernameInput)`
  &::-ms-reveal {
    display: none;
  }
  &::-webkit-credentials-auto-fill-button {
    visibility: hidden;
    display: none !important;
  }
`;
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
const ButtonBase = styled(motion.button)`
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
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;
const CancelButton = styled(ButtonBase)`
  background-color: ${({ theme }) => theme.colors.itemsBorder};
`;
const SubmitButton = styled(ButtonBase)`
  background-color: ${({ theme }) => theme.colors.point};
`;

const WriteCommentsModal = ({
  setIsModalOpen,
  commentEditId,
  setCommentEditId,
  head,
  setHead,
  setIsCommentAdded,
}: IWriteCommentsModal) => {
  const { commentsProject } = commentsProjectStore();
  const currentProject = projects.find(
    (project) => project.id === commentsProject
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const findComment = (id: string, current: INode | null): IComment | null => {
    if (!current) return null;
    if (current.data.id === id) return current.data;
    return findComment(id, current.next);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting || username === "" || password === "" || content === "") {
      return;
    }

    setIsSubmitting(true);

    try {
      let response;
      if (commentEditId) {
        response = await editComment(commentsProject, commentEditId, {
          username,
          password,
          content,
        });
      } else {
        response = await addComment(commentsProject, {
          username,
          password,
          content,
        });
      }

      setHead(response.head);
      setCommentEditId(null);
      setIsModalOpen(false);
      setIsCommentAdded(true);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  useEffect(() => {
    if (commentEditId) {
      const comment = findComment(commentEditId, head);
      if (comment) {
        setUsername(comment.username);
        setPassword(comment.password);
        setContent(comment.content);
      }
    }
    return () => {
      setUsername("");
      setPassword("");
      setContent("");
      setIsPasswordVisible(false);
    };
  }, []);

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (setIsModalOpen) {
      setIsModalOpen(false);
    }
    setCommentEditId(null);
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
          <UsernameInput
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <PasswordContainer>
            <PasswordInput
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password(4자 이상)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={4}
              required
            />
            <span
              className="material-symbols-outlined"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? "visibility" : "visibility_off"}
            </span>
          </PasswordContainer>
        </CredentialsContainer>
        <CommentInput
          as="textarea"
          placeholder="Leave a comment/feedback..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <ModalMenu>
          <SelectedProject>
            <span>Selected Project:</span>{" "}
            {currentProject?.title + " " + currentProject?.subtitle}
          </SelectedProject>
          <ButtonContainer>
            <CancelButton
              whileTap={{ scale: 0.9 }}
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </CancelButton>
            <SubmitButton whileTap={{ scale: 0.9 }} disabled={isSubmitting}>
              {isSubmitting ? (
                <PulseLoader color="#ffffff" size={8} />
              ) : commentEditId ? (
                "Edit"
              ) : (
                "Submit"
              )}
            </SubmitButton>
          </ButtonContainer>
        </ModalMenu>
      </FormContainer>
    </Container>
  );
};

export default WriteCommentsModal;
