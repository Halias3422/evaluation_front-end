import { Photo } from "@/interfaces/photos";
import { getAllPhotos } from "@/lib/photos";
import styled from "styled-components";
import { useEffect } from "react";
import Image from "next/image";

const Galerie = ({
  photos,
  offsetLeft,
}: {
  photos: Photo[];
  offsetLeft: number;
}) => {
  useEffect(() => {
    const galleryContainer = document.getElementById("galeryPage");
    if (galleryContainer) {
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
          galleryContainer.style.overflowY = "scroll";
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
    <GalleryContainer id="galeryPage" $offsetLeft={offsetLeft}>
      <PhotosContainer>
        <ImagesColumn>{handlePhotosDisplay(0)}</ImagesColumn>
        <ImagesColumn>{handlePhotosDisplay(1)}</ImagesColumn>
        <ImagesColumn>{handlePhotosDisplay(2)}</ImagesColumn>
      </PhotosContainer>
    </GalleryContainer>
  );
};

const GalleryContainer = styled.div<{ $offsetLeft: number }>`
  width: 100%;
  display: none;
  overflow: hidden;
`;

const PhotosContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  margin-top: 150px;
  margin-bottom: 150px;
  @media screen and (min-width: 1024px) {
    gap: 30px;
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
  return {
    props: {
      photos,
    },
  };
};

export default Galerie;
