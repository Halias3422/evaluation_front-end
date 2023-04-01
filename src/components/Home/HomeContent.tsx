import PageContext from "@/context/pageContext";
import { pagesPaths } from "@/interfaces/pages";
import { Photo } from "@/interfaces/photos";
import { abril } from "@/styles/fonts";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../Navbar/Navbar";
import { Category } from "@/interfaces/categories";

const HomeContent = ({
  backgroundPhoto,
  categories,
}: {
  backgroundPhoto: Photo;
  categories: Category[];
}) => {
  const { pageContext } = useContext(PageContext);
  const [navbarWidth, setNavbarWidth] = useState<number>(0);

  useEffect(() => {
    const homeContainer = document.getElementById("homePage");
    if (homeContainer) {
      homeContainer.addEventListener("animationend", () => {
        if (homeContainer.offsetHeight === 0) {
          homeContainer.style.display = "none";
        }
      });
      homeContainer.addEventListener("animationstart", () => {
        if (homeContainer.offsetHeight === 0) {
          homeContainer.style.display = "block";
        }
      });
    }
  }, []);
  return (
    <>
      {pageContext.currentPath === pagesPaths.home && (
        <Navbar setNavbarWidth={setNavbarWidth} categories={categories} />
      )}
      <HomeContentContainer id="homePage">
        <BackgroundImage $backgroundPhoto={backgroundPhoto} />
        <TitleContainer id="titleContainer" className="appearingObject">
          <h1 className={abril.className}>
            Charles Cantin
            <br />-<br />
            Photographe
          </h1>
        </TitleContainer>
      </HomeContentContainer>
    </>
  );
};

const HomeContentContainer = styled.div`
  position: absolute;
  left: 0px;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const BackgroundImage = styled.div<{ $backgroundPhoto: Photo }>`
  width: 100%;
  height: 100%;
  background-image: ${(props) =>
    `url(${props.$backgroundPhoto.imageBig.image})`};
  background-size: cover;
  background-position: 20.5%;
  background-repeat: no-repeat;
  @media screen and (min-width: 769px) {
    background-position: center;
  }
`;

const TitleContainer = styled.div`
  h1 {
    margin: 0px;
    line-height: 1.2;
  }
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 24px;
  text-shadow: 0px 15px 10px ${(props) => props.theme.darkGrey};
  color: ${(props) => props.theme.white};
  background-color: rgba(0, 0, 0, 45%);
  @media screen and (min-width: 769px) {
    font-size: 36px;
  }
  @media screen and (min-width: 1024px) {
    font-size: 42px;
  }
  @media screen and (min-width: 1200px) {
    font-size: 46px;
  }
  @media screen and (min-width: 1400px) {
    font-size: 60px;
  }
`;

export default HomeContent;
