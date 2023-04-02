import styled from "styled-components";
import Image from "next/image";
import { Dispatch, SetStateAction, useContext } from "react";
import PageContext from "@/context/pageContext";
import { pagesPaths } from "@/interfaces/pages";

const Logo = ({
  setMenuOpen,
}: {
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { pageContext, setPageContext } = useContext(PageContext);

  const handleLogoClick = () => {
    setMenuOpen(false);
    setPageContext({
      ...pageContext,
      previousPath: window.location.pathname,
      currentPath: pagesPaths.home,
    });
    document
      .getElementsByClassName("selectedMenuLink")?.[0]
      ?.classList.remove("selectedMenuLink");
  };
  return (
    <LogoContainer className="objectHoverEffect">
      <LogoImage
        src="/logo.webp"
        alt="Charles Cantin logo"
        width={142}
        height={142}
        onClick={() => handleLogoClick()}
        title="Retourner à l'Accueil"
      />
    </LogoContainer>
  );
};
const LogoContainer = styled.div`
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 56px;
  height: 56px;
  @media screen and (min-width: 481px) {
    width: 69px;
    height: 69px;
  }
  @media screen and (min-width: 769px) {
    width: 96px;
    height: 96px;
  }
  @media screen and (min-width: 1024px) {
    width: 112px;
    height: 112px;
  }
  @media screen and (min-width: 1800px) {
    width: 142px;
    height: 142px;
  }
`;

const LogoImage = styled(Image)`
  cursor: pointer;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  @media screen and (min-width: 481px) {
    width: 69px;
    height: 69px;
  }
  @media screen and (min-width: 769px) {
    width: 96px;
    height: 96px;
  }
  @media screen and (min-width: 1024px) {
    width: 112px;
    height: 112px;
  }
  @media screen and (min-width: 1800px) {
    width: 142px;
    height: 142px;
  }
`;

export default Logo;
