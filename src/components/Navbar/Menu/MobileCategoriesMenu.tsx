import { Category } from "@/interfaces/categories";
import { patua } from "@/styles/fonts";
import SvgArrowDown from "@/svgs/ArrowDown";
import { useEffect } from "react";
import styled from "styled-components";

const MobileCategoriesMenu = ({ categories }: { categories: Category[] }) => {
  useEffect(() => {
    const menu = document.getElementById(
      "mobileCategoriesMenu"
    ) as HTMLDivElement;
    if (menu) {
      menu.addEventListener("click", () => {
        const select = document.getElementById(
          "categoriesSelect"
        ) as HTMLSelectElement;
        select.toggleAttribute("open");
      });
    }
  }, []);
  return (
    <CategoriesMenuContainer id="mobileCategoriesMenu">
      <Select
        id="categoriesSelect"
        className={patua.className}
        name="categoriesSelect"
      >
        <option value="Toutes">Toutes</option>
        {categories.map((category) => {
          return (
            <option key={category.name} value={category.name}>
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
  appearance: none;
  border: ${(props) => `1px solid ${props.theme.lightGrey}`};
  border-radius: 4px 0px 0px 4px;
  color: ${(props) => props.theme.darkGrey};
`;

export default MobileCategoriesMenu;
