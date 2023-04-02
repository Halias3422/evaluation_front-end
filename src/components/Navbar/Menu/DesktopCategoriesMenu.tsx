import PageContext from "@/context/pageContext";
import { Category } from "@/interfaces/categories";
import { pagesPaths } from "@/interfaces/pages";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const DesktopCategoriesMenu = ({ categories }: { categories: Category[] }) => {
  const { pageContext, setPageContext } = useContext(PageContext);
  const [categoriesMenus, setCategoriesMenus] = useState<HTMLElement[]>([]);

  const handleCategoryMenuClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    categoriesMenus.map((category) => {
      category.classList.remove("selectedCategoryMenu");
      category.classList.add("textHoverEffect");
    });
    e.currentTarget.classList.add("selectedCategoryMenu");
    e.currentTarget.classList.remove("textHoverEffect");
    const formattedCategory = e.currentTarget.text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    setPageContext({
      ...pageContext,
      previousPath: window.location.pathname,
      currentPath:
        e.currentTarget.text === "Toutes"
          ? pagesPaths.gallery
          : pagesPaths.gallery + "/" + formattedCategory,
    });
  };

  useEffect(() => {
    const allCategoriesMenus: HTMLElement[] = [];
    allCategoriesMenus.push(
      document.getElementById("allCategories") as HTMLElement
    );
    categories.map((category: Category, index: number) => {
      allCategoriesMenus.push(
        document.getElementById(category.name + index) as HTMLElement
      );
    });
    const selectedLinkIndex = allCategoriesMenus.findIndex((linkElem) => {
      return (linkElem as HTMLAnchorElement).href === window.location.href;
    });
    allCategoriesMenus[selectedLinkIndex].classList.add("selectedCategoryMenu");
    allCategoriesMenus[selectedLinkIndex].classList.remove("textHoverEffect");
    setCategoriesMenus(allCategoriesMenus as HTMLElement[]);
  }, []);

  return (
    <CategoriesContainer className="appearingHeightObject">
      <Title className="link">Catégories</Title>
      <CategoryMenuItem
        id="allCategories"
        href={pagesPaths.gallery}
        className="link textHoverEffect appearingHeightObject"
        onClick={(e) => handleCategoryMenuClick(e)}
      >
        Toutes
      </CategoryMenuItem>
      {categories.map((category: Category, index: number) => {
        return (
          <CategoryMenuItem
            href={
              pagesPaths.gallery +
              "/" +
              category.name
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
            }
            className="link textHoverEffect appearingHeightObject"
            key={category.name + index}
            id={category.name + index}
            onClick={(e) => handleCategoryMenuClick(e)}
          >
            {category.name}
          </CategoryMenuItem>
        );
      })}
    </CategoriesContainer>
  );
};

const CategoriesContainer = styled.div`
  width: 100%;
  margin-top: 26px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10px;
  border: ${(props) => `1px solid ${props.theme.white}`};
  border-radius: 6px;
  overflow: hidden;
`;

const Title = styled.h3`
  margin: 0px;
  padding: 15px 35px;
  background-color: ${(props) => props.theme.lightGrey};
  width: 100%;
`;

const CategoryMenuItem = styled(Link)`
  font-size: 18px !important;
  text-align: center;
  padding: 12px 0px;
  animation: 0.8s ease-in appearing-width-object;
  width: 95% !important;
  opacity: 1;
  @media screen and (min-width: 1024px) {
    font-size: 20px !important;
  }
  @media screen and (min-width: 1200px) {
    font-size: 22px !important;
  }
`;

export default DesktopCategoriesMenu;
