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
    categories.map((category: Category, index: number) => {
      allCategoriesMenus.push(
        document.getElementById(category.name + index) as HTMLElement
      );
    });
    setCategoriesMenus(allCategoriesMenus as HTMLElement[]);
  }, []);

  return (
    <CategoriesContainer>
      <Title className="link">Catégories</Title>
      <CategoryMenuItem
        id="allCategories"
        href="/galerie"
        className="link"
        onClick={(e) => handleCategoryMenuClick(e)}
      >
        Toutes
      </CategoryMenuItem>
      {categories.map((category: Category, index: number) => {
        return (
          <CategoryMenuItem
            href={`/categorie/${category.name}`}
            className="link"
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
  padding-bottom: 12px;
  border: ${(props) => `1px solid ${props.theme.white}`};
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 12px;
`;

const Title = styled.h3`
  margin: 0px;
  margin-bottom: 4px;
  padding: 15px 34px;
  background-color: ${(props) => props.theme.lightGrey};
  width: 100%;
`;

const CategoryMenuItem = styled(Link)`
  width: 95%;
  font-size: 18px;
  text-align: center;
  padding: 12px 0px;
  @media screen and (min-width: 1024px) {
    font-size: 20px;
  }
  @media screen and (min-width: 1200px) {
    font-size: 22px;
  }
`;

export default DesktopCategoriesMenu;
