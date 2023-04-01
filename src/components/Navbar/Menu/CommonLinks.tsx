import { pagesPaths } from "@/interfaces/pages";
import Link from "next/link";
import { useEffect } from "react";
import styled from "styled-components";

const CommonLinks = ({
  handlePageClick,
}: {
  handlePageClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) => {
  useEffect(() => {
    if (window.location.pathname !== "/") {
      Object.values(pagesPaths).map((path) => {
        if (window.location.pathname === path) {
          const selectedLink = document.getElementById(path + "Link");
          if (selectedLink) {
            selectedLink.classList.add("selectedMenuLink");
          }
        }
      });
    }
  }, []);

  return (
    <>
      <Link
        href={pagesPaths.gallery}
        id={pagesPaths.gallery + "Link"}
        className="link textHoverEffect"
        onClick={(e) => handlePageClick(e)}
      >
        <p>Galerie</p>
      </Link>
      <MenuDivider />
      <Link
        href={pagesPaths.tarification}
        id={pagesPaths.tarification + "Link"}
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
        id={pagesPaths.contact + "Link"}
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
