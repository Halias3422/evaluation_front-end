import { useEffect, useState } from "react";
import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";

const Navbar = () => {
  const [docWidth, setDocWidth] = useState<number>(-1);

  const resizeNavbar = () => {
    setDocWidth(document.documentElement.clientWidth);
  };

  useEffect(() => {
    addEventListener("resize", () => resizeNavbar());
    resizeNavbar();
  }, []);

  if (docWidth == -1) {
    return <></>;
  }

  return (
    <header>{docWidth < 769 ? <MobileNavbar /> : <DesktopNavbar />}</header>
  );
};

export default Navbar;
