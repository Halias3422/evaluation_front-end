import { Photo } from "@/interfaces/photos";
import styled from "styled-components";
import { useEffect } from "react";
import Image from "next/image";
import { Category } from "@/interfaces/categories";
import { pageAnimationsHandler } from "@/lib/pageAnimationsHandler";

const Galerie = ({ photos }: { photos: Photo[]; categories: Category[] }) => {
  useEffect(() => {
    const galleryContainer = document.getElementById("galeryPage");
    if (galleryContainer) {
      pageAnimationsHandler(galleryContainer);
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
    <GalleryContainer id="galleryPage">
      <PhotosContainer>
        <ImagesColumn>{handlePhotosDisplay(0)}</ImagesColumn>
        <ImagesColumn>{handlePhotosDisplay(1)}</ImagesColumn>
        <ImagesColumn>{handlePhotosDisplay(2)}</ImagesColumn>
      </PhotosContainer>
    </GalleryContainer>
  );
};

const GalleryContainer = styled.div`
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

export default Galerie;
