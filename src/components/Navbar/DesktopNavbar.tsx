import styled from "styled-components";
import Logo from "./Logo";
import Menu from "./Menu/Menu";
import { Category } from "@/interfaces/categories";

const DesktopNavbar = ({
  categories,
  docWidth,
}: {
  categories: Category[];
  docWidth: number;
}) => {
  return (
    <NavbarContainer>
      <InsideContainer>
        <Logo />
        <Menu
          setMenuOpen={() => {}}
          categories={categories}
          docWidth={docWidth}
        />
      </InsideContainer>
      <MainDivider />
    </NavbarContainer>
  );
};

const NavbarContainer = styled.div`
  min-height: 100vh;
  height: 100%;
  width: fit-content;
  display: flex;
  @media screen and (min-width: 1200px) {
  }
`;

const InsideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  margin: 40px 50px 0px 50px;
  width: fit-content;
`;

const MainDivider = styled.div`
  margin-top: 15vh;
  margin-bottom: 15vh;
  width: 0px;
  border: 1px solid ${(props) => props.theme.white};
`;

export default DesktopNavbar;
