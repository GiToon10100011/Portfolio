import React from "react";
import { styled } from "styled-components";
import { CommentIcons } from "../../Icons";
import { useNavigate } from "react-router-dom";

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

const CommentsContent = styled.div`
  width: 100%;
  height: calc(100% - 100px);
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

const CommentItem = styled.div`
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
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
`;

const CommentInfo = styled.div`
  font-size: 18px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
`;

const CommentsList = ({
  setIsModalOpen,
}: {
  setIsModalOpen: (value: boolean) => void;
}) => {
  return (
    <Container>
      <CommentsHeader>Comments</CommentsHeader>
      <CommentsContent>
        <NoComments>
          {CommentIcons.noComments()}
          <p>
            No Comments...{" "}
            <span onClick={() => setIsModalOpen(true)}>Write One?</span>
          </p>
        </NoComments>
        {/* {Array.from({ length: 20 }).map((_, index) => (
          <CommentItem key={index}>
            <CommentHeader>
              <CommentProfile>
                <ProfileImage
                  src={"/images/DefaultProfile.jpg"}
                  alt="profile"
                />
                <ProfileName>Username_User</ProfileName>
              </CommentProfile>
              <CommentMenu>
                {CommentIcons.delete()}
                {CommentIcons.edit()}
                {CommentIcons.share()}
              </CommentMenu>
            </CommentHeader>
            <CommentInfo>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Assumenda suscipit ratione autem laboriosam magnam id tempora
              delectus, voluptatem, nihil optio, doloremque doloribus vero odit
              adipisci sequi dolor nostrum vitae pariatur. Nisi quisquam, magni
              excepturi rerum animi unde exercitationem facere illum error
              obcaecati quasi eum et sint hic cum, sapiente quas voluptas sequi
              fugiat temporibus expedita. Non qui voluptatibus aperiam id.
            </CommentInfo>
          </CommentItem>
        ))} */}
      </CommentsContent>
    </Container>
  );
};

export default CommentsList;
