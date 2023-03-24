import SvgHamburgerMenu from "@/svgs/HamburgerMenu";
import styled from "styled-components";
import Logo from "./Logo";

const MobileNavbar = () => {
  return (
    <NavbarContainer>
      <Logo width={64} height={64} />
      <HamburgerContainer>
        <SvgHamburgerMenu />
      </HamburgerContainer>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5%;
`;

const HamburgerContainer = styled.div`
  cursor: pointer;
`;

export default MobileNavbar;
