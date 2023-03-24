import SvgHamburgerMenu from "@/svgs/HamburgerMenu";
import styled from "styled-components";
import Logo from "./Logo";
import { useEffect, useState } from "react";
import MainMenu from "./Menu/MainMenu";
import SocialLinks from "./Menu/SocialLinks";

const MobileNavbar = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const menu = document.getElementById("menuContainer") as HTMLDivElement;
    if (menu) {
      menu.addEventListener("animationend", (e) => {
        if (e.animationName === "closeMenu") {
          menu.style.display = "none";
        }
      });
    }
  }, []);

  useEffect(() => {
    const menu = document.getElementById("menuContainer") as HTMLDivElement;
    if (menuOpen && menu) {
      menu.style.display = "block";
    }
  }, [menuOpen]);
  return (
    <>
      <NavbarContainer>
        <Logo width={64} height={64} />
        <HamburgerContainer onClick={() => setMenuOpen(!menuOpen)}>
          <SvgHamburgerMenu />
        </HamburgerContainer>
      </NavbarContainer>
      <MenuContainer id="menuContainer" $menuOpen={menuOpen}>
        <MainMenu />
        <SocialLinks />
      </MenuContainer>
    </>
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

const MenuContainer = styled.div<{ $menuOpen: boolean }>`
  overflow: hidden;
  display: none;
  border-radius: 0 0 16px 16px;
  height: ${(props) => (props.$menuOpen ? `365px;` : `0px;`)};
  border-bottom: 2px solid ${(props) => props.theme.white};
  background: ${(props) =>
    `linear-gradient(${props.theme.darkGrey}, ${props.theme.lightGrey})`};
  ${(props) =>
    props.$menuOpen
      ? `animation openMenu ease-out 0.6s;`
      : `animation closeMenu ease-out 0.4s;`};
  @keyframes openMenu {
    from {
      height: 0px;
    }
    to {
      height: 365px;
    }
  }
  @keyframes closeMenu {
    from {
      height: 365px;
    }
    to {
      height: 0px;
    }
  }
`;

export default MobileNavbar;
