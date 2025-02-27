import styled from "styled-components";
import { HomeIcon, MenuIcon, ProfileIcon, WriteIcon } from "../Icons";
import { useNavigate } from "react-router-dom";
import { cursorChangingStore } from "../stores";
import { Dispatch, SetStateAction, useEffect } from "react";
import { motion } from "framer-motion";

interface IFooter {
  icon?: string;
  mode?: string;
  setMode?: Dispatch<SetStateAction<string>>;
  setIsModalOpen?: Dispatch<SetStateAction<boolean>>;
  setCommentEditId?: Dispatch<SetStateAction<string | null>>;
}

const InnerContainer = styled.div`
  width: 1700px;
  height: 100%;
  margin: 0 auto;
  border-top: 1px solid ${({ theme }) => theme.colors.lightBorder};
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const NavigationMenu = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 60px;
`;

const NavigationItem = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 10px;
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.text};
  font-size: 28px;
  font-weight: 450;
  text-transform: capitalize;
  cursor: pointer;
`;

const IconContainer = styled.div`
  width: 30px;
  height: 30px;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

const Container = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 80px;
  background: ${({ theme }) => theme.colors.background};
  z-index: 2;
  @media (max-width: 768px) {
    height: 60px;
    ${InnerContainer} {
      width: 100%;
      padding: 0 10px;
    }
    ${NavigationMenu} {
      gap: 20px;
    }
    ${NavigationItem} {
      font-size: 16px;
    }
  }
`;

let IconSwitcher: JSX.Element;

const Footer = ({
  icon,
  mode,
  setMode,
  setIsModalOpen,
  setCommentEditId,
}: IFooter) => {
  const navigate = useNavigate();
  const { setCursorChanging } = cursorChangingStore();

  const changeMenuModes = () => {
    if (mode === "profile" && setMode) {
      setMode("menu");
    }
    if (mode === "menu" && setMode) {
      setMode("profile");
    }
    if (mode === "write" && setIsModalOpen) {
      setIsModalOpen(true);
    }
    if (mode === "write" && setCommentEditId) {
      setCommentEditId(null);
    }
  };

  switch (mode) {
    case "menu":
      IconSwitcher = <MenuIcon />;
      break;
    case "profile":
      IconSwitcher = <ProfileIcon />;
      break;
    case "write":
      IconSwitcher = <WriteIcon />;
      break;
    default:
      IconSwitcher = <></>;
  }

  useEffect(() => {
    return () => setCursorChanging(false);
  }, []);
  return (
    <Container>
      <InnerContainer>
        <NavigationMenu>
          {mode && (
            <NavigationItem
              onClick={mode ? changeMenuModes : undefined}
              onMouseEnter={() => setCursorChanging(true)}
              onMouseLeave={() => setCursorChanging(false)}
            >
              <IconContainer>{IconSwitcher}</IconContainer>
              {mode ? mode : icon}
            </NavigationItem>
          )}
          <NavigationItem
            onClick={() => navigate("/")}
            onMouseEnter={() => setCursorChanging(true)}
            onMouseLeave={() => setCursorChanging(false)}
          >
            <IconContainer>
              <HomeIcon />
            </IconContainer>
            home
          </NavigationItem>
        </NavigationMenu>
      </InnerContainer>
    </Container>
  );
};

export default Footer;
