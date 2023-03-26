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

const Navbar = ({
  setNavbarWidth,
}: {
  setNavbarWidth: Dispatch<SetStateAction<number>>;
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
      className={isHome ? "appearingObject" : ""}
    >
      {docWidth < 1024 ? (
        <MobileNavbar />
      ) : (
        <DesktopNavbar docWidth={docWidth} />
      )}
    </Header>
  );
};

const Header = styled.header<{ $isHome: boolean }>`
  opacity: ${(props) => (props.$isHome ? 0 : 1)};
  position: fixed;
  width: 100%;
  z-index: 10;
  @media screen and (min-width: 1024px) {
    width: fit-content;
    position: ${(props) => (props.$isHome ? `fixed` : "sticky")};
    float: ${(props) => (props.$isHome ? "unset" : "left")};
  }
`;
export default Navbar;
