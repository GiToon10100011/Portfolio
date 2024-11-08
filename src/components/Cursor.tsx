import styled from "styled-components";
import { cursorChangingStore } from "../stores";
import React from "react";

const CursorElement = styled.div<{
  $cursorChanging: boolean;
  transform: string;
}>`
  position: fixed;
  top: 0;
  left: 0;
  background: ${({ theme, $cursorChanging }) =>
    $cursorChanging ? "none" : theme.colors.point};
  border-radius: 50%;
  width: ${({ $cursorChanging }) => ($cursorChanging ? "60px" : "30px")};
  height: ${({ $cursorChanging }) => ($cursorChanging ? "60px" : "30px")};
  border: ${({ $cursorChanging, theme }) =>
    !$cursorChanging ? "none" : `1px solid ${theme.colors.textPoint}`};
  z-index: 8;
  transition: all 0.6s;
  transform: ${({ transform }) => transform};
`;

const Cursor = ({ transform }: { transform: string }) => {
  const { cursorChanging } = cursorChangingStore();
  return (
    <CursorElement
      $cursorChanging={cursorChanging}
      transform={transform}
    ></CursorElement>
  );
};

export default React.memo(Cursor);
