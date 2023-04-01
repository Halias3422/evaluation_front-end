import PageContext from "@/context/pageContext";
import { pagesPaths } from "@/interfaces/pages";
import { patua } from "@/styles/fonts";
import { Dispatch, MouseEvent, SetStateAction, useContext } from "react";
import styled from "styled-components";
import SocialLinks from "./SocialLinks";
import CommonLinks from "./CommonLinks";
import DesktopCategoriesMenu from "./DesktopCategoriesMenu";
import { Category } from "@/interfaces/categories";

const Menu = ({
  setMenuOpen,
  categories,
  docWidth,
}: {
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  categories: Category[];
  docWidth: number;
}) => {
  const { pageContext, setPageContext } = useContext(PageContext);

  const handlePageClick = (event: MouseEvent<HTMLAnchorElement>) => {
    setMenuOpen(false);
    event.preventDefault();
    Object.values(pagesPaths).map((path) => {
      if (path === event.currentTarget.pathname) {
        setPageContext({
          contextLoaded: true,
          previousPath: window.location.pathname,
          currentPath: event.currentTarget.pathname,
        });
      }
    });
    document
      .getElementsByClassName("selectedMenuLink")?.[0]
      ?.classList.remove("selectedMenuLink");
    event.currentTarget
      .getElementsByTagName("p")[0]
      .classList.add("selectedMenuLink");
  };

  return (
    <MenuContainer className={patua.className}>
      <CommonLinks handlePageClick={handlePageClick} />
      {pageContext.currentPath.includes("galerie") && docWidth > 1024 && (
        <DesktopCategoriesMenu categories={categories} />
      )}
      <SocialLinks />
    </MenuContainer>
  );
};

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  height: fit-content;
  min-height: 330px;
`;

export default Menu;
