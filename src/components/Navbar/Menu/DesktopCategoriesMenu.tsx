import { Category } from "@/interfaces/categories";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";

const DesktopCategoriesMenu = ({ categories }: { categories: Category[] }) => {
  const [categoriesMenus, setCategoriesMenus] = useState<HTMLElement[]>([]);

  const handleCategoryMenuClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    categoriesMenus.map((category) => {
      category.classList.remove("selectedCategoryMenu");
    });
    e.currentTarget.classList.add("selectedCategoryMenu");
    if (e.currentTarget.textContent !== "Toutes") {
      history.pushState(
        null,
        "",
        `/galerie/${e.currentTarget.textContent?.toLowerCase()}`
      );
    } else {
      history.pushState(null, "", "/galerie");
    }
  };

  useEffect(() => {
    const allCategoriesMenus: HTMLElement[] = [];
    allCategoriesMenus.push(
      document.getElementById("allCategories") as HTMLElement
    );
    allCategoriesMenus[0].classList.add("selectedCategoryMenu");
    categories.map((category: Category, index: number) => {
      allCategoriesMenus.push(
        document.getElementById(category.name + index) as HTMLElement
      );
    });
    setCategoriesMenus(allCategoriesMenus as HTMLElement[]);
  }, []);

  return (
    <CategoriesContainer className="appearingWidthObject">
      <Title className="link ">Catégories</Title>
      <CategoryMenuItem
        id="allCategories"
        href="/galerie"
        className="link textHoverEffect appearingWidthObject"
        onClick={(e) => handleCategoryMenuClick(e)}
      >
        Toutes
      </CategoryMenuItem>
      {categories.map((category: Category, index: number) => {
        return (
          <CategoryMenuItem
            href={`/categorie/${category.name}`}
            className="link textHoverEffect appearingWidthObject"
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
  margin-bottom: 12px;
  overflow: hidden;
`;

const Title = styled.h3`
  margin: 0px;
  margin-bottom: 4px;
  background-color: ${(props) => props.theme.lightGrey};
  width: 100%;
  animation: 0.1s appearing-padding forwards,
    0.8s ease-in appearing-width-object;
  @keyframes appearing-padding {
    from {
      padding: 0px;
    }
    to {
      padding: 10px 35px;
    }
  }
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
