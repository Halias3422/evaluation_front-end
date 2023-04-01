import { Photo } from "@/interfaces/photos";
import { getAllPhotos } from "@/lib/photos";
import styled from "styled-components";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar/Navbar";
import { getAllCategories } from "@/lib/categories";
import { Category } from "@/interfaces/categories";
import PageContext from "@/context/pageContext";
import { pagesPaths } from "@/interfaces/pages";

const Galerie = ({
  photos,
  categories,
}: {
  photos: Photo[];
  categories: Category[];
}) => {
  const [navbarWidth, setNavbarWidth] = useState<number>(0);
  const { pageContext } = useContext(PageContext);
  useEffect(() => {
    const galleryContainer = document.getElementById("galeryPage");
    if (galleryContainer) {
      if (pageContext.previousPath.length === 0) {
        galleryContainer.style.display = "block";
      }
      galleryContainer.addEventListener("animationend", () => {
        if (
          galleryContainer.offsetHeight === 0 &&
          galleryContainer.className.includes("slideOut")
        ) {
          galleryContainer.style.display = "none";
        } else if (galleryContainer.className.includes("slideIn")) {
        }
      });
      galleryContainer.addEventListener("animationstart", () => {
        if (galleryContainer.className.includes("slideIn")) {
          galleryContainer.style.display = "block";
          if (document.documentElement.offsetWidth > 1024) {
            galleryContainer.style.width = `calc(100% - ${
              document.getElementById("headerElement")?.offsetWidth
            }px`;
          }
        }
      });
      window.addEventListener("resize", () => {
        if (document.documentElement.offsetWidth < 1024) {
          galleryContainer.style.width = "100%";
        } else {
          galleryContainer.style.width = `calc(100% - ${
            document.getElementById("headerElement")?.offsetWidth
          }px`;
        }
      });
    }
  }, []);

  const handlePhotosDisplay = (offset: number) => {
    const rowImages = [];
    for (let i = offset; i < photos.length; i += 3) {
      const { image, width, height } = photos[i].imageSmall;
      rowImages.push(
        <PhotoImage
          key={i}
          src={image}
          alt={photos[i].title}
          title={photos[i].title}
          width={width / 1}
          height={height / 1}
        />
      );
    }
    return [...rowImages];
  };

  return (
    <>
      {pageContext.currentPath === pagesPaths.galery && (
        <Navbar setNavbarWidth={setNavbarWidth} categories={categories} />
      )}
      <GalleryContainer id="galeryPage" $offsetLeft={navbarWidth}>
        <PhotosContainer>
          <ImagesColumn>{handlePhotosDisplay(0)}</ImagesColumn>
          <ImagesColumn>{handlePhotosDisplay(1)}</ImagesColumn>
          <ImagesColumn>{handlePhotosDisplay(2)}</ImagesColumn>
        </PhotosContainer>
      </GalleryContainer>
    </>
  );
};

const GalleryContainer = styled.div<{ $offsetLeft: number }>`
  width: 100%;
  display: none;
`;

const PhotosContainer = styled.div`
  width: 90%;
  max-width: 1400px;
  margin: 0 auto;
  margin-top: 150px;
  margin-bottom: 150px;
  @media screen and (min-width: 1024px) {
    gap: 1vw;
    display: flex;
  }
  @media screen and (min-width: 1900px) {
    margin-left: 11%;
  }
`;

const ImagesColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 30px;
  @media screen and (min-width: 1024px) {
    margin-bottom: 0px;
    gap: 1vw;
  }
`;

const PhotoImage = styled(Image)`
  max-width: 100%;
  margin: 0 auto;
  height: auto;
  object-fit: contain;
  @media screen and (min-width: 1024px) {
    margin: unset;
  }
`;

export const getStaticProps = async () => {
  const photos = await getAllPhotos();
  const categories = await getAllCategories();
  return {
    props: {
      photos,
      categories,
    },
  };
};

export default Galerie;
