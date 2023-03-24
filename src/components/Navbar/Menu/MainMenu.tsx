import { patua } from "@/styles/fonts";
import Link from "next/link";
import styled from "styled-components";

const MainMenu = () => {
  return (
    <MainMenuContainer className={patua.className}>
      <Link href="/galerie" className="link">
        Galerie
      </Link>
      <MenuDivider />
      <Link href="/tarifs-et-prestations" className="link">
        Tarifs
        <br />
        et
        <br />
        prestations
      </Link>
      <MenuDivider />
      <Link href="/contact" className="link">
        Contact
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
