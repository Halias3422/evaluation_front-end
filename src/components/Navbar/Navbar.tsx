import { useEffect, useState } from "react";
import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";
import styled from "styled-components";

const Navbar = () => {
  const [docWidth, setDocWidth] = useState<number>(-1);
  const [isHome, setIsHome] = useState<boolean>(false);

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

  return (
    <Header id="headerElement" className={isHome ? "appearingObject" : ""}>
      {docWidth < 1024 ? (
        <MobileNavbar />
      ) : (
        <DesktopNavbar docWidth={docWidth} />
      )}
    </Header>
  );
};

const Header = styled.header`
  opacity: 0;
  position: fixed;
  width: 100%;
  z-index: 10;
  @media screen and (min-width: 1024px) {
    width: fit-content;
  }
`;
export default Navbar;
