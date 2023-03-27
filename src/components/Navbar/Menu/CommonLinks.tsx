import { pagesPaths } from "@/interfaces/pages";
import Link from "next/link";
import styled from "styled-components";

const CommonLinks = ({
  handlePageClick,
}: {
  handlePageClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) => {
  return (
    <>
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
      <MenuDivider />
    </>
  );
};

const MenuDivider = styled.div`
  height: 0px;
  width: 24px;
  border: 1px solid ${(props) => props.theme.white};
`;

export default CommonLinks;
