import { patua } from "@/styles/fonts";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

const NotFound = () => {
  const router = useRouter();
  return (
    <ContentContainer id="notFoundPage" className="mainTheme">
      <h1 className={patua.className}>
        Oups, il semblerait que cette page n'existe pas !
      </h1>
      <ImageNotFound
        src="/old-car.webp"
        width="640"
        height="427"
        alt="voiture abandonnée"
      />
      <Link
        className="link objectHoverEffect"
        href="/"
        onClick={() => (window.location.href = "/")}
      >
        Revenir à l'accueil
      </Link>
    </ContentContainer>
  );
};

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 100%;
  gap: 7% !important;
  h1 {
    margin: 0px;
    @media screen and (min-width: 1024px) {
      font-size: 36px;
    }
    @media screen and (min-width: 1801px) {
      font-size: 42px;
    }
  }
  a {
    background-color: ${(props) => props.theme.white};
    width: fit-content;
    color: ${(props) => props.theme.darkGrey};
    font-weight: 900;
    padding: 10px 40px;
    border-radius: 24px;
  }
`;

const ImageNotFound = styled(Image)`
  max-width: 80%;
  height: auto;
`;

export default NotFound;
