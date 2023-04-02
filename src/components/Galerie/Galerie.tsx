import { DisplayedPhotos, Photo } from "@/interfaces/photos";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Category } from "@/interfaces/categories";
import { pageAnimationsHandler } from "@/lib/pageAnimationsHandler";
import PageContext from "@/context/pageContext";
import { pagesPaths } from "@/interfaces/pages";

const Galerie = ({ photos }: { photos: Photo[]; categories: Category[] }) => {
  const { pageContext } = useContext(PageContext);
  const [displayedPhotos, setDisplayedPhotos] = useState<DisplayedPhotos>({
    category: "",
    photos: photos,
    column1: [],
    column2: [],
    column3: [],
  });

  useEffect(() => {
    const galleryContainer = document.getElementById("galleryPage");
    if (galleryContainer) {
      pageAnimationsHandler(galleryContainer);
    }
    handleCategoryChange();
  }, []);

  const handlePhotosDisplay = (offset: number) => {
    const rowImages = [];
    for (let i = offset; i < displayedPhotos.photos.length; i += 3) {
      const { image, width, height } = displayedPhotos.photos[i].imageSmall;
      rowImages.push(
        <PhotoImage
          key={i}
          src={image}
          alt={displayedPhotos.photos[i].title}
          title={displayedPhotos.photos[i].title}
          width={width / 1}
          height={height / 1}
        />
      );
    }
    return rowImages;
  };

  const handleCategoryChange = () => {
    let filter = pageContext.currentPath.replace(pagesPaths.gallery, "");
    if (filter && filter[0] === "/") {
      filter = filter.substring(1);
    }
    if (pageContext.contextLoaded) {
      const filteredPhotos = photos.filter(
        (photo) =>
          photo.category[0]
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") === filter
      );
      setDisplayedPhotos({
        ...displayedPhotos,
        category: filter,
        photos: filter.length > 0 ? filteredPhotos : photos,
      });
    }
  };

  useEffect(() => {
    handleCategoryChange();
  }, [pageContext.currentPath]);

  useEffect(() => {
    setDisplayedPhotos({
      ...displayedPhotos,
      column1: handlePhotosDisplay(0),
      column2: handlePhotosDisplay(1),
      column3: handlePhotosDisplay(2),
    });
    document.getElementById("galleryPage")?.classList.add("appearingObject");
  }, [displayedPhotos.category]);

  return (
    <GalleryContainer id="galleryPage">
      <PhotosContainer>
        {displayedPhotos.photos.length > 0 ? (
          <>
            <ImagesColumn>{[...displayedPhotos.column1]}</ImagesColumn>
            <ImagesColumn>{[...displayedPhotos.column2]}</ImagesColumn>
            <ImagesColumn>{[...displayedPhotos.column3]}</ImagesColumn>
          </>
        ) : (
          <h2 className="mainTheme">
            Il n'y a actuellement aucune photo dans cette catégorie :(
          </h2>
        )}
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
  h2 {
    text-align: center;
  }
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
