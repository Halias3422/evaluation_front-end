import PageContext from "@/context/pageContext";
import { Category } from "@/interfaces/categories";
import { pagesPaths } from "@/interfaces/pages";
import { patua } from "@/styles/fonts";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const MobileCategoriesMenu = ({ categories }: { categories: Category[] }) => {
  const { pageContext, setPageContext } = useContext(PageContext);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    if (selectedCategory.length > 0) {
      const formattedCategory = selectedCategory;
      setPageContext({
        ...pageContext,
        previousPath: window.location.pathname,
        currentPath:
          selectedCategory === "Toutes"
            ? pagesPaths.gallery
            : pagesPaths.gallery + "/" + formattedCategory,
      });
    } else {
      let urlCategory = window.location.pathname
        .replace(pagesPaths.gallery, "")
        .replace("/", "");
      setSelectedCategory(urlCategory);
    }
  }, [selectedCategory]);

  return (
    <CategoriesMenuContainer id="mobileCategoriesMenu">
      <Select
        id="categoriesSelect"
        className={patua.className}
        name="categoriesSelect"
        onChange={(e) => setSelectedCategory(e.currentTarget.value)}
        value={selectedCategory}
      >
        <option value="Toutes">Toutes</option>
        {categories.map((category) => {
          return (
            <option
              key={category.name}
              value={category.name
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")}
            >
              {category.name}
            </option>
          );
        })}
      </Select>
    </CategoriesMenuContainer>
  );
};

const CategoriesMenuContainer = styled.div`
  border: ${(props) => `1px solid ${props.theme.white}`};
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  align-items: center;
`;

const Select = styled.select`
  font-size: 20px;
  text-align: center;
  padding: 5px 3vw;
  border: ${(props) => `1px solid ${props.theme.lightGrey}`};
  border-radius: 4px 0px 0px 4px;
  color: ${(props) => props.theme.darkGrey};
`;

export default MobileCategoriesMenu;
