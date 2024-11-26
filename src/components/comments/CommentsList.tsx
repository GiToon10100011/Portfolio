import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { CommentIcons, popupStyle } from "../../Icons";
import { useNavigate } from "react-router-dom";
import { commentsProjectStore } from "../../stores";
import { AnimatePresence, motion } from "framer-motion";
import Alert from "./Alert";
import WriteCommentsModal from "./WriteCommentsModal";
import Confirm from "./Confirm";

interface IComment {
  id: number;
  username: string;
  password: string;
  content: string;
}

const mockupComments: IComment[] = Array.from({ length: 20 }, (_, index) => ({
  id: index,
  username: "Username_User",
  password: `${index}${index}${index}${index}`,
  content:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda suscipit ratione autem laboriosam magnam id tempora delectus, voluptatem, nihil optio, doloremque doloribus vero odit adipisci sequi dolor nostrum vitae pariatur. Nisi quisquam, magni excepturi rerum animi unde exercitationem facere illum error obcaecati quasi eum et sint hic cum, sapiente quas voluptas sequi fugiat temporibus expedita. Non qui voluptatibus aperiam id.",
}));

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const CommentsHeader = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  padding-bottom: 20px;
  margin-bottom: 40px;
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightBorder};
  font-size: 40px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
`;

const CommentsContent = styled(motion.div)`
  width: 100%;
  height: calc(100% - 100px);
  overflow-x: visible;
  overflow-y: scroll;
  scrollbar-width: none;
`;

const NoComments = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  font-size: 40px;
  color: ${({ theme }) => theme.colors.lightBorder};
  span {
    text-decoration: underline;
    transition: color 0.3s;
    cursor: pointer;
    &:hover {
      color: ${({ theme }) => theme.colors.text};
    }
  }
`;

const CommentItem = styled(motion.div)`
  width: 100%;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.itemsBorder};
  border-radius: ${({ theme }) => theme.borderRadius.sub};
  margin-bottom: 20px;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
`;

const CommentProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
`;

const ProfileName = styled.span`
  font-size: 24px;
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  color: ${({ theme }) => theme.colors.textPoint};
`;

const CommentMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  & svg {
    cursor: pointer;
  }
`;

const CommentInfo = styled.div`
  font-size: 18px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
`;

const CommentMenuPassword = styled(motion.form)`
  display: flex;
  align-items: flex-end;
  gap: 14px;
  input[type="password"],
  input[type="text"] {
    width: 200px;
    height: 30px;
    padding-bottom: 10px;
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.itemsBorder};
    font-size: 16px;
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
    &::placeholder {
      color: ${({ theme }) => theme.colors.lightBorder};
      opacity: 1;
      transition: opacity 0.3s;
    }
    &:focus {
      outline: none;
      &::placeholder {
        opacity: 0;
      }
    }
  }
  div {
    display: flex;
    align-items: center;
    input[type="submit"],
    input[type="button"] {
      font-size: 16px;
      color: ${({ theme }) => theme.colors.text};
      border: none;
      background: transparent;
      padding: 12px 20px;
      border: 1px solid transparent;
      transition: border 0.3s, color 0.3s;
      cursor: pointer;
      &:hover {
        border: 1px solid ${({ theme }) => theme.colors.itemsBorder};
        color: ${({ theme }) => theme.colors.subText};
      }
    }
  }
`;

const ShareCommentMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const commentListVariants = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const CommentItemVariants = {
  initial: {
    opacity: 0,
    x: 50,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      type: "tween",
    },
  },
};

const CommentMenuPasswordVariants = {
  initial: {
    opacity: 0,
    x: 100,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      type: "tween",
    },
  },
  exit: {
    opacity: 0,
    x: 50,
    transition: {
      duration: 0.3,
      type: "tween",
    },
  },
};

const CommentsList = ({
  setIsModalOpen,
  commentEditId,
  setCommentEditId,
}: {
  setIsModalOpen: (value: boolean) => void;
  commentEditId: number | null;
  setCommentEditId: (value: number | null) => void;
}) => {
  const { commentsProject } = commentsProjectStore();
  const passwordRef = useRef<HTMLInputElement>(null);
  const [menuMode, setMenuMode] = useState<string | null>(null);
  const [inputPassword, setInputPassword] = useState<string>("");
  const [isDeleteValid, setIsDeleteValid] = useState<boolean>(false);
  const [isEditValid, setIsEditValid] = useState<boolean>(false);
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);

  const handleShare = (id: number) => {
    setCommentEditId(id);
    setMenuMode("share");
  };

  const handleEdit = (id: number) => {
    setCommentEditId(id);
    setMenuMode("edit");
  };

  const handleDelete = (id: number) => {
    setCommentEditId(id);
    setMenuMode("delete");
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    password: string
  ) => {
    e.preventDefault();
    if (inputPassword === "") {
      return;
    }
    if (inputPassword === password) {
      setInputPassword("");
      passwordRef.current?.blur();
      if (menuMode === "delete") {
        setIsDeleteValid(true);
        setIsConfirmOpen(true);
      } else if (menuMode === "edit") {
        setIsEditValid(true);
        setIsModalOpen(true);
      }
    } else {
      setInputPassword("");
      setIsAlert(true);
      setIsDeleteValid(false);
      setIsEditValid(false);
      setTimeout(() => setIsAlert(false), 2000);
    }
  };

  const handleCancel = () => {
    setCommentEditId(null);
    setMenuMode(null);
    setInputPassword("");
  };

  useEffect(() => {
    setInputPassword("");
  }, [menuMode]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isConfirmOpen && isDeleteValid && (
          <Confirm
            setDeleteConfirmation={setDeleteConfirmation}
            setIsConfirmOpen={setIsConfirmOpen}
          />
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">{isAlert && <Alert />}</AnimatePresence>
      <Container>
        <CommentsHeader>Comments</CommentsHeader>
        <CommentsContent
          initial="initial"
          animate="animate"
          variants={commentListVariants}
        >
          {mockupComments.length > 0 ? (
            mockupComments.map((comment, index) => (
              <CommentItem key={index} variants={CommentItemVariants}>
                <CommentHeader>
                  <CommentProfile>
                    <ProfileImage
                      src={"/images/DefaultProfile.jpg"}
                      alt="profile"
                    />
                    <ProfileName>Username_User</ProfileName>
                  </CommentProfile>
                  <CommentMenu>
                    <AnimatePresence mode="wait">
                      {(menuMode === "edit" || menuMode === "delete") &&
                        commentEditId === comment.id && (
                          <CommentMenuPassword
                            key={menuMode}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={CommentMenuPasswordVariants}
                            onSubmit={(e) => handleSubmit(e, comment.password)}
                          >
                            <input
                              type="password"
                              placeholder="비밀번호"
                              value={inputPassword}
                              onChange={(e) => setInputPassword(e.target.value)}
                              minLength={4}
                              ref={passwordRef}
                            />
                            <div>
                              <input
                                type="submit"
                                value={menuMode === "edit" ? "수정" : "삭제"}
                              />
                              <input
                                type="button"
                                value="취소"
                                onClick={handleCancel}
                              />
                            </div>
                          </CommentMenuPassword>
                        )}
                    </AnimatePresence>
                    {CommentIcons.delete({
                      onClick: () => handleDelete(comment.id),
                      style: {
                        stroke:
                          menuMode === "delete" && commentEditId === comment.id
                            ? "#AF53FF"
                            : "#ff3a3a",
                        transform:
                          menuMode === "delete" && commentEditId === comment.id
                            ? `scale(1.2)`
                            : `scale(1)`,
                        transition: "all 0.3s",
                      },
                    })}
                    {CommentIcons.edit({
                      onClick: () => handleEdit(comment.id),
                      style: {
                        stroke:
                          menuMode === "edit" && commentEditId === comment.id
                            ? "#AF53FF"
                            : "#aaa",
                        transform:
                          menuMode === "edit" && commentEditId === comment.id
                            ? `scale(1.2)`
                            : `scale(1)`,
                        transition: "all 0.3s",
                      },
                    })}
                    {CommentIcons.share({
                      onClick: () => handleShare(comment.id),
                      style: {
                        stroke:
                          menuMode === "share" && commentEditId === comment.id
                            ? "#AF53FF"
                            : "#aaa",
                        transform:
                          menuMode === "share" && commentEditId === comment.id
                            ? `scale(1.2)`
                            : `scale(1)`,
                        transition: "all 0.3s",
                      },
                    })}
                  </CommentMenu>
                </CommentHeader>
                <CommentInfo>{comment.content}</CommentInfo>
              </CommentItem>
            ))
          ) : (
            <NoComments>
              {CommentIcons.noComments()}
              <p>
                No Comments...{" "}
                <span onClick={() => setIsModalOpen(true)}>Write One?</span>
              </p>
            </NoComments>
          )}
        </CommentsContent>
      </Container>
    </>
  );
};

export default CommentsList;
