import styled from "styled-components";
import Logo from "./Logo";
import MainMenu from "./Menu/MainMenu";
import SocialLinks from "./Menu/SocialLinks";
import { Dispatch, SetStateAction } from "react";

const DesktopNavbar = ({ docWidth }: { docWidth: number }) => {
  return (
    <NavbarContainer>
      <InsideContainer>
        <Logo dimensions={docWidth < 1400 ? 124 : 196} />
        <MainMenu />
        <Divider />
        <SocialLinks />
      </InsideContainer>
      <MainDivider />
    </NavbarContainer>
  );
};

const NavbarContainer = styled.div`
  min-height: 100vh;
  height: 100%;
  width: fit-content;
  display: flex;
  gap: 40px;
  @media screen and (min-width: 1200px) {
    gap: 60px;
  }
`;

const InsideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 42px;
  padding-top: 40px;
  padding-left: 50px;
  width: fit-content;
`;

const Divider = styled.div`
height; 0px;
width: 24px;
border: 1px solid ${(props) => props.theme.white};

`;

const MainDivider = styled.div`
  margin-top: 15vh;
  margin-bottom: 15vh;
  width: 0px;
  border: 1px solid ${(props) => props.theme.white};
`;

export default DesktopNavbar;
