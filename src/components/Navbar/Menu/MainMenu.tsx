import PageContext from "@/context/pageContext";
import { pagesPaths } from "@/interfaces/pages";
import { patua } from "@/styles/fonts";
import Link from "next/link";
import { Dispatch, MouseEvent, SetStateAction, useContext } from "react";
import styled from "styled-components";

const MainMenu = ({
  setMenuOpen,
}: {
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { pageContext, setPageContext } = useContext(PageContext);

  const handlePageClick = (event: MouseEvent<HTMLAnchorElement>) => {
    setMenuOpen(false);
    event.preventDefault();
    Object.values(pagesPaths).map((path) => {
      if (path === event.currentTarget.pathname) {
        setPageContext({
          ...pageContext,
          contextLoaded: true,
          previousPath: window.location.pathname,
          currentPath: event.currentTarget.pathname,
        });
      }
    });
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
