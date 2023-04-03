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
    const columnImages = [];
    for (let i = offset; i < displayedPhotos.photos.length; i += 3) {
      const { image, width, height } = displayedPhotos.photos[i].imageSmall;
      columnImages.push(
        <PhotoImage
          key={i}
          src={image}
          alt={displayedPhotos.photos[i].title}
          title={displayedPhotos.photos[i].title}
          width={width}
          height={height}
        />
      );
    }
    return columnImages;
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
    if (pageContext.currentPath.includes(pagesPaths.gallery)) {
      handleCategoryChange();
    }
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
    <div id="galleryPage" className="pageContainer">
      <section className="pageContentWrapper">
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
      </section>
    </div>
  );
};

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
