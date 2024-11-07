import React from "react";
import styled from "styled-components";
import { HomeIcon } from "../Icons";
import { useNavigate } from "react-router-dom";

const Container = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 80px;
  background: ${({ theme }) => theme.colors.background};
`;

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

const NavigationItem = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.text};
  font-size: 28px;
  font-weight: 450;
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

const Footer = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <InnerContainer>
        <NavigationMenu>
          <NavigationItem onClick={() => navigate("/")}>
            <IconContainer>
              <HomeIcon />
            </IconContainer>
            Home
          </NavigationItem>
          {/* <NavigationItem>
            <IconContainer>
            </IconContainer>
          </NavigationItem> */}
        </NavigationMenu>
      </InnerContainer>
    </Container>
  );
};

export default Footer;
