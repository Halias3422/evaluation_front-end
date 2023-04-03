import { useContext, useEffect, useState } from "react";
import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";
import styled from "styled-components";
import PageContext from "@/context/pageContext";
import { Category } from "@/interfaces/categories";

const Navbar = ({ categories }: { categories: Category[] }) => {
  const [docWidth, setDocWidth] = useState<number>(-1);
  const [isHome, setIsHome] = useState<boolean>(false);
  const { pageContext } = useContext(PageContext);

  const resizeNavbar = () => {
    setDocWidth(document.documentElement.clientWidth);
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
    <>
      <Header id="headerElement" className="appearingObject">
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
    </>
  );
};

const Header = styled.header`
  width: 100%;
  z-index: 10;
  position: fixed;
  top: 0px;
  opacity: 0;
  @media screen and (min-width: 1024px) {
    width: fit-content;
    max-height: 100%;
    position: fixed;
    overflow: scroll;
    scrollbar-width: none;
  }
`;
export default Navbar;
