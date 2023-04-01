import SvgHamburgerMenu from "@/svgs/HamburgerMenu";
import styled from "styled-components";
import Logo from "./Logo";
import { useContext, useEffect, useState } from "react";
import Menu from "./Menu/Menu";
import { Category } from "@/interfaces/categories";
import MobileCategoriesMenu from "./Menu/MobileCategoriesMenu";
import PageContext from "@/context/pageContext";
import { pagesPaths } from "@/interfaces/pages";

const MobileNavbar = ({
  isHome,
  categories,
  docWidth,
}: {
  isHome: boolean;
  categories: Category[];
  docWidth: number;
}) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [$isLoaded, setIsLoaded] = useState<boolean>(false);
  const { pageContext } = useContext(PageContext);

  useEffect(() => {
    setIsLoaded(true);
    const menu = document.getElementById("menuContainer") as HTMLDivElement;
    if (menu) {
      menu.addEventListener("animationend", (e) => {
        if (e.animationName === "closeMenu") {
          menu.style.display = "none";
        }
      });
      document.addEventListener("click", (e) => {
        const header = document.getElementById("headerElement");
        if (header && menuOpen) {
          if (!header.contains(e.target as HTMLElement) || !e.target) {
            setMenuOpen(false);
          }
        }
      });
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
      <NavbarContainer
        $menuOpen={menuOpen}
        $isHome={isHome}
        $isLoaded={$isLoaded}
      >
        <Logo setMenuOpen={setMenuOpen} />
        {pageContext.currentPath.includes(pagesPaths.gallery) && (
          <MobileCategoriesMenu categories={categories} />
        )}
        <HamburgerContainer onClick={() => setMenuOpen(!menuOpen)}>
          <SvgHamburgerMenu />
        </HamburgerContainer>
      </NavbarContainer>
      <MenuContainer id="menuContainer" $menuOpen={menuOpen} $isHome={isHome}>
        <Menu
          setMenuOpen={setMenuOpen}
          categories={categories}
          docWidth={docWidth}
        />
      </MenuContainer>
    </>
  );
};

const NavbarContainer = styled.div<{
  $menuOpen: boolean;
  $isHome: boolean;
  $isLoaded: boolean;
}>`
  display: flex;
  position: sticky;
  justify-content: space-between;
  align-items: center;
  padding: 2% 5%;
		${(props) =>
      props.$menuOpen && props.$isHome
        ? `animation: color-background ease-out 0.6s forwards;`
        : props.$isHome && `animation: uncolor-background ease-out 0.6s`};
	${(props) =>
    props.$isLoaded && !props.$isHome
      ? `background-color: ${props.theme.darkGrey};`
      : "background-color: unset;"};
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
  height: ${(props) => (props.$menuOpen ? `415px;` : `0px;`)};
  border-bottom: 2px solid ${(props) => props.theme.white};
  background: ${(props) =>
    `linear-gradient(${props.theme.darkGrey}, ${props.theme.lightGrey})`};
  ${(props) =>
    props.$menuOpen
      ? `animation openMenu ease-out 0.6s forwards;`
      : `animation closeMenu ease-out 0.2s;`};
  @keyframes openMenu {
    from {
      height: 0px;
      opacity: 0;
    }
    to {
      height: 415px;
      opacity: 1;
    }
  }
  @keyframes closeMenu {
    from {
      height: 415px;
      opacity: 1;
    }
    to {
      height: 0px;
      opacity: 0;
    }
  }
`;

export default MobileNavbar;
