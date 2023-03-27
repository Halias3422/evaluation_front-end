import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";
import styled from "styled-components";
import PageContext from "@/context/pageContext";
import { Category } from "@/interfaces/categories";

const Navbar = ({
  setNavbarWidth,
  categories,
}: {
  setNavbarWidth: Dispatch<SetStateAction<number>>;
  categories: Category[];
}) => {
  const [docWidth, setDocWidth] = useState<number>(-1);
  const [isHome, setIsHome] = useState<boolean>(false);
  const { pageContext } = useContext(PageContext);

  const resizeNavbar = () => {
    setDocWidth(document.documentElement.clientWidth);
    const navbar = document.getElementById("headerElement");
    if (navbar) {
      setNavbarWidth(navbar.offsetWidth);
    }
  };

  useEffect(() => {
    addEventListener("resize", () => resizeNavbar());
    resizeNavbar();
    if (window.location.pathname === "/") {
      setIsHome(true);
    }
  }, []);

  useEffect(() => {
    if (pageContext.contextLoaded && pageContext.currentPath.length > 0) {
      setIsHome(pageContext.currentPath === "/" ? true : false);
    }
  }, [pageContext.currentPath]);

  return (
    <Header
      id="headerElement"
      $isHome={isHome}
      $docWidth={docWidth}
      className={isHome ? "appearingObject" : ""}
    >
      {docWidth < 1024 ? (
        <MobileNavbar
          isHome={isHome}
          categories={categories}
          docWidth={docWidth}
        />
      ) : (
        <DesktopNavbar categories={categories} docWidth={docWidth} />
      )}
    </Header>
  );
};

const Header = styled.header<{ $isHome: boolean; $docWidth: number }>`
  opacity: ${(props) => (!props.$isHome && props.$docWidth > -1 ? "1" : "0")};
  position: fixed;
  width: 100%;
  z-index: 10;
  @media screen and (min-width: 1024px) {
    width: fit-content;
    position: ${(props) => (props.$isHome ? `fixed` : "sticky")};
  }
`;
export default Navbar;
