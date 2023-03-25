import SvgHamburgerMenu from "@/svgs/HamburgerMenu";
import styled from "styled-components";
import Logo from "./Logo";
import { useEffect, useState } from "react";
import MainMenu from "./Menu/MainMenu";
import SocialLinks from "./Menu/SocialLinks";

const MobileNavbar = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isHome, setIsHome] = useState<boolean>(false);

  useEffect(() => {
    const menu = document.getElementById("menuContainer") as HTMLDivElement;
    if (menu) {
      menu.addEventListener("animationend", (e) => {
        if (e.animationName === "closeMenu") {
          menu.style.display = "none";
        }
      });
    }
    if (window.location.pathname === "/") {
      setIsHome(true);
    }
  }, []);

  useEffect(() => {
    const menu = document.getElementById("menuContainer") as HTMLDivElement;
    if (menuOpen && menu) {
      menu.style.display = "flex";
    }
  }, [menuOpen]);

  return (
    <>
      <NavbarContainer $setBackground={isHome && menuOpen}>
        <Logo dimensions={96} />
        <HamburgerContainer onClick={() => setMenuOpen(!menuOpen)}>
          <SvgHamburgerMenu />
        </HamburgerContainer>
      </NavbarContainer>
      <MenuContainer id="menuContainer" $menuOpen={menuOpen} $isHome={isHome}>
        <MainMenu />
        <SocialLinks />
      </MenuContainer>
    </>
  );
};

const NavbarContainer = styled.div<{ $setBackground: boolean }>`
  display: flex;
  position: sticky;
  justify-content: space-between;
  align-items: center;
  padding: 5%;
		${(props) =>
      props.$setBackground
        ? `animation: color-background ease-out 0.6s forwards;`
        : `animation: uncolor-background ease-out 0.6s`};
	@keyframes color-background {
		from {
			background-color: rgba(0, 0, 0, 0);
		}
		to {
			background-color: ${(props) => props.theme.darkGrey};
		}
		}
	@keyframes uncolor-background {
		from {
			background-color: ${(props) => props.theme.darkGrey};
		}
		to {
			background-color: rgba(0, 0, 0, 0);
		}

	}
  }
`;

const HamburgerContainer = styled.div`
  cursor: pointer;
`;

const MenuContainer = styled.div<{ $menuOpen: boolean; $isHome: boolean }>`
  overflow: hidden;
  display: none;
  flex-direction: column;
  gap: 42px;
  border-radius: 0 0 16px 16px;
  height: ${(props) => (props.$menuOpen ? `375px;` : `0px;`)};
  border-bottom: 2px solid ${(props) => props.theme.white};
  background: ${(props) =>
    `linear-gradient(${props.theme.darkGrey}, ${props.theme.lightGrey})`};
  ${(props) =>
    props.$menuOpen
      ? `animation openMenu ease-out 0.6s forwards;`
      : `animation closeMenu ease-out 0.6s;`};
  @keyframes openMenu {
    from {
      height: 0px;
      opacity: 0;
    }
    to {
      height: 375px;
      opacity: 1;
    }
  }
  @keyframes closeMenu {
    from {
      height: 375px;
      opacity: 1;
    }
    to {
      height: 0px;
      opacity: 0;
    }
  }
`;

export default MobileNavbar;
