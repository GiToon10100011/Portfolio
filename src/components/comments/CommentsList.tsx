import React from "react";
import { styled } from "styled-components";

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
  height: 100%;
`;

const CommentItem = styled.div`
  width: 100%;
  height: 200px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.itemsBorder};
  border-radius: ${({ theme }) => theme.borderRadius.light};
  margin-bottom: 20px;
`;

const CommentsList = () => {
  return (
    <Container>
      <CommentsHeader>Comments</CommentsHeader>
      <CommentsContent>
        {Array.from({ length: 20 }).map((_, index) => (
          <CommentItem key={index}></CommentItem>
        ))}
      </CommentsContent>
    </Container>
  );
};

export default CommentsList;
