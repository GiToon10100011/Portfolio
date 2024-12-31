import React, {
  useEffect,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { styled } from "styled-components";
import { CommentIcons } from "../../Icons";
import { commentsProjectStore, responsiveStore } from "../../stores";
import { AnimatePresence, motion } from "framer-motion";
import Alert from "./Alert";
import Confirm from "./Confirm";
import { INode } from "../../routes/Comments";
import { PulseLoader } from "react-spinners";

interface ICommentsList {
  setIsModalOpen: (isOpen: boolean) => void;
  commentEditId: string | null;
  setCommentEditId: (id: string | null) => void;
  head: INode | null;
  setHead: Dispatch<SetStateAction<INode | null>>;
  isCommentAdded: boolean;
  setIsCommentAdded: (isAdded: boolean) => void;
}

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
  cursor: pointer;
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
  @media (max-width: 768px) {
    font-size: 20px;
    svg {
      width: 240px;
      height: 240px;
      stroke-width: 0.4;
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

const CommentProfile = styled(motion.div)`
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
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ProfileCreatedAt = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.lightBorder};
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
  .comment-menu-icons {
    display: flex;
    align-items: center;
    gap: 14px;
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
    &::-ms-reveal {
      display: none;
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

// const ShareCommentMenu = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 14px;
// `;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  @media (max-width: 768px) {
    height: 400px;
    overflow-y: scroll;
    scrollbar-width: none;
    ${CommentsHeader} {
      width: 100%;
      font-size: 24px;
      padding-bottom: 14px;
      background: ${({ theme }) => theme.colors.background};
      z-index: 2;
      margin-bottom: 20px;
    }
    ${CommentsContent} {
      height: fit-content;
      padding-bottom: 20px;
    }
    ${CommentItem} {
      padding: 20px;
      ${CommentHeader} {
        margin-bottom: 14px;
        ${CommentProfile} {
          width: 100%;
          gap: 10px;
          min-width: 200px;
          ${ProfileImage} {
            width: 40px;
            height: 40px;
          }
          ${ProfileName} {
            font-size: 18px;
            gap: 6px;
          }
          ${ProfileCreatedAt} {
            font-size: 12px;
          }
        }
        ${CommentMenu} {
          width: 100%;
          gap: 10px;
          justify-content: space-between;
          .comment-menu-icons {
            flex: 1;
            width: 100%;
            justify-content: flex-end;
            gap: 10px;
          }
          ${CommentMenuPassword} {
            flex: 1;
            gap: 0px;
            input[type="password"],
            input[type="text"] {
              width: 100%;
              min-width: 110px;
              height: auto;
              font-size: 14px;
            }
            div {
              input[type="submit"],
              input[type="button"] {
                font-size: 14px;
                padding: 12px 4px;
              }
            }
          }
          svg {
            width: 16px;
            height: 16px;
          }
        }
      }
      ${CommentInfo} {
        font-size: 14px;
      }
    }
  }
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
  animate: (custom: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.3,
      type: "tween",
    },
  }),
  exit: {
    opacity: 0,
    x: -50,
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

const CommentProfileVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.6,
      type: "tween",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      type: "tween",
    },
  },
};

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 100%;
`;

const CommentsList = ({
  setIsModalOpen,
  commentEditId,
  setCommentEditId,
  head,
  setHead,
  isCommentAdded,
  setIsCommentAdded,
}: ICommentsList) => {
  const { commentsProject } = commentsProjectStore();
  const { isResponsive } = responsiveStore();
  const passwordRef = useRef<HTMLInputElement>(null);
  const [inputPassword, setInputPassword] = useState<string>("");
  const [menuMode, setMenuMode] = useState<string | null>(null);
  const [isShared, setIsShared] = useState<boolean>(false);
  const scrollTimeout = useRef<NodeJS.Timeout>();

  //비번입력 후의 확인/취소 여부
  const [isEditValid, setIsEditValid] = useState<boolean>(false);
  const [isDeleteValid, setIsDeleteValid] = useState<boolean>(false);
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [isProjectLoading, setIsProjectLoading] = useState(false);

  const handleShare = (id: string) => {
    if (isShared) {
      return;
    }
    setCommentEditId(id);
    setMenuMode("share");
    setIsShared(true);

    // Get the project ID from the current hash
    const projectId = window.location.hash.split("?")[0].replace("#", "");

    // Create a clean share URL
    const shareUrl = `${window.location.origin}${window.location.pathname}#${projectId}?comment=${id}`;

    navigator.clipboard.writeText(shareUrl);
    setTimeout(() => setIsShared(false), 1000);
  };

  const handleEdit = (id: string) => {
    setCommentEditId(id);
    setMenuMode("edit");
  };

  const handleDelete = (id: string) => {
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
      setMenuMode(null);
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

  const goToCommentsTop = () => {
    const commentsContent = document.querySelector(".comments-content");
    if (commentsContent) {
      commentsContent.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // // Extract comment ID from hash if it exists
  // const getCommentIdFromHash = () => {
  //   const hash = window.location.hash;
  //   const match = hash.match(/comment=([^&]*)/);
  //   return match ? match[1] : null;
  // };

  useEffect(() => {
    setInputPassword("");
  }, [menuMode]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  // Watch for project changes
  useEffect(() => {
    setIsProjectLoading(true);
  }, [commentsProject]); // Only trigger on project change

  useEffect(() => {
    if (isCommentAdded) {
      const commentsContent = document.querySelector(".comments-content");
      if (commentsContent) {
        commentsContent.scrollTo({
          top: commentsContent.scrollHeight,
          behavior: "smooth",
        });
        setIsCommentAdded(false);
      }
    }
  }, [isCommentAdded]);

  const renderComments = (
    current: INode | null,
    depth: number = 0,
    isLastNode: boolean = true
  ): ReactNode => {
    if (!current || isProjectLoading) {
      if (isLastNode) {
        // Set project loading to false when recursion is complete
        setTimeout(() => setIsProjectLoading(false), 300);
      }

      if (isProjectLoading) {
        return (
          <LoadingWrapper>
            <PulseLoader color="#AF53FF" size={10} />
          </LoadingWrapper>
        );
      }
    }

    if (!current) {
      return (
        <NoComments>
          {CommentIcons.noComments()}
          <p>
            No Comments...{" "}
            <span onClick={() => setIsModalOpen(true)}>Write One?</span>
          </p>
        </NoComments>
      );
    }

    const result = (
      <AnimatePresence>
        <CommentItem
          key={current.data.id}
          id={`comment-${current.data.id}`}
          variants={CommentItemVariants}
          custom={depth}
        >
          <CommentHeader>
            {!isResponsive ? (
              <CommentProfile>
                <ProfileImage
                  src={"/images/DefaultProfile.jpg"}
                  alt="profile"
                />
                <ProfileName>
                  {current.data.username}
                  <ProfileCreatedAt>{current.data.createdAt}</ProfileCreatedAt>
                </ProfileName>
              </CommentProfile>
            ) : (menuMode === "edit" || menuMode === "delete") &&
              commentEditId === current.data.id ? null : (
              <AnimatePresence mode="wait">
                <CommentProfile
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={CommentProfileVariants}
                  layout
                >
                  <ProfileImage
                    src={"/images/DefaultProfile.jpg"}
                    alt="profile"
                  />
                  <ProfileName>
                    {current.data.username}
                    <ProfileCreatedAt>
                      {current.data.createdAt}
                    </ProfileCreatedAt>
                  </ProfileName>
                </CommentProfile>
              </AnimatePresence>
            )}
            <CommentMenu>
              <AnimatePresence mode="wait">
                {(menuMode === "edit" || menuMode === "delete") &&
                  commentEditId === current.data.id && (
                    <CommentMenuPassword
                      key={menuMode}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={CommentMenuPasswordVariants}
                      onSubmit={(e) => handleSubmit(e, current.data.password)}
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
              <div className="comment-menu-icons">
                {CommentIcons.delete({
                  onClick: () => handleDelete(current.data.id),
                  style: {
                    stroke:
                      menuMode === "delete" && commentEditId === current.data.id
                        ? "#AF53FF"
                        : "#ff3a3a",
                    transform:
                      menuMode === "delete" && commentEditId === current.data.id
                        ? `scale(1.2)`
                        : `scale(1)`,
                    transition: "all 0.3s",
                  },
                })}
                {CommentIcons.edit({
                  onClick: () => handleEdit(current.data.id),
                  style: {
                    stroke:
                      menuMode === "edit" && commentEditId === current.data.id
                        ? "#AF53FF"
                        : "#aaa",
                    transform:
                      menuMode === "edit" && commentEditId === current.data.id
                        ? `scale(1.2)`
                        : `scale(1)`,
                    transition: "all 0.3s",
                  },
                })}
                {CommentIcons.share({
                  onClick: () => handleShare(current.data.id),
                  $isShared:
                    menuMode === "share" &&
                    commentEditId === current.data.id &&
                    isShared,
                })}
              </div>
            </CommentMenu>
          </CommentHeader>
          <CommentInfo>{current.data.content}</CommentInfo>
        </CommentItem>
        {current.next && renderComments(current.next, depth + 1, false)}
      </AnimatePresence>
    );

    // If we're at the last node, mark loading as complete
    if (!current.next && isLastNode) {
      setIsProjectLoading;
    }

    return result;
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isConfirmOpen && isDeleteValid && (
          <Confirm
            setIsConfirmOpen={setIsConfirmOpen}
            currentComment={commentEditId}
            head={head}
            setHead={setHead}
            setCommentEditId={setCommentEditId}
          />
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {(isAlert || isShared) && <Alert isShared={isShared} />}
      </AnimatePresence>
      <Container>
        <CommentsHeader onClick={goToCommentsTop}>Comments</CommentsHeader>
        <CommentsContent
          key={head?.data.id}
          className="comments-content"
          initial="initial"
          animate="animate"
          variants={commentListVariants}
        >
          {renderComments(head)}
        </CommentsContent>
      </Container>
    </>
  );
};

export default CommentsList;
