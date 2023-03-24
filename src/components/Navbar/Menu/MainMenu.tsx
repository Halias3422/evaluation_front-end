import { patua } from "@/styles/fonts";
import Link from "next/link";
import styled from "styled-components";

const MainMenu = () => {
  return (
    <MainMenuContainer className={patua.className}>
      <Link href="/galerie" className="link textHoverEffect">
        <p>Galerie</p>
      </Link>
      <MenuDivider />
      <Link href="/tarifs-et-prestations" className="link textHoverEffect">
        <p>
          Tarifs
          <br />
          et
          <br />
          prestations
        </p>
      </Link>
      <MenuDivider />
      <Link href="/contact" className="link textHoverEffect">
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
