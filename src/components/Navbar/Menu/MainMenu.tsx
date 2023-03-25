import { pagesPaths } from "@/interfaces/pages";
import Galerie from "@/pages/galerie";
import { patua } from "@/styles/fonts";
import { AppProps } from "next/app";
import Link from "next/link";
import { MouseEvent } from "react";
import styled from "styled-components";

const MainMenu = ({ pageProps }: AppProps) => {
  const displayRightPageContent = (pathname: string) => {
    switch (pathname) {
      case pagesPaths.galery:
        return <Galerie {...pageProps} />;
      case pagesPaths.tarification:
        return <></>;
      case pagesPaths.contact:
        return <></>;
      default:
        return <></>;
    }
  };

  const handlePageClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    displayRightPageContent(event.currentTarget.pathname);
  };

  return (
    <MainMenuContainer className={patua.className}>
      <Link
        href={pagesPaths.galery}
        className="link textHoverEffect"
        onClick={(e) => handlePageClick(e)}
      >
        <p>Galerie</p>
      </Link>
      <MenuDivider />
      <Link
        href={pagesPaths.tarification}
        className="link textHoverEffect"
        onClick={(e) => handlePageClick(e)}
      >
        <p>
          Tarifs
          <br />
          et
          <br />
          prestations
        </p>
      </Link>
      <MenuDivider />
      <Link
        href={pagesPaths.contact}
        className="link textHoverEffect"
        onClick={(e) => handlePageClick(e)}
      >
        <p>Contact</p>
      </Link>
    </MainMenuContainer>
  );
};

const MainMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 250px;
`;

const MenuDivider = styled.div`
  height: 0px;
  width: 24px;
  border: 1px solid ${(props) => props.theme.white};
`;

export default MainMenu;
