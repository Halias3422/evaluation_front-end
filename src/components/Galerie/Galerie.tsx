import { DisplayedPhotos, Photo } from "@/interfaces/photos";
import styled from "styled-components";
import { SyntheticEvent, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Category } from "@/interfaces/categories";
import { pageAnimationsHandler } from "@/lib/pageAnimationsHandler";
import PageContext from "@/context/pageContext";
import { pagesPaths } from "@/interfaces/pages";
import SvgCross from "@/svgs/Cross";
import LoadingAnim from "@/svgs/LoadingAnim";

const Galerie = ({ photos }: { photos: Photo[]; categories: Category[] }) => {
  const { pageContext } = useContext(PageContext);
  const [fullScreenPhoto, setFullScreenPhoto] = useState<Photo | null>(null);
  const [displayedPhotos, setDisplayedPhotos] = useState<DisplayedPhotos>({
    category: "",
    photos: photos,
    column1: [],
    column2: [],
    column3: [],
  });
  const [fullScreenIsLoading, setFullScreenIsLoading] = useState<boolean>(true);

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const selectedPhoto = photos.find(
      (photo) => photo.title === e.currentTarget.title
    );
    if (selectedPhoto) {
      setFullScreenIsLoading(true);
      setFullScreenPhoto(selectedPhoto);
    }
  };

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
          priority
          key={i}
          src={image}
          alt={displayedPhotos.photos[i].title}
          title={displayedPhotos.photos[i].title}
          width={width}
          height={height}
          className="objectHoverEffect"
          onClick={handleImageClick}
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

  const handleFullScreenPhotoLoad = (e: SyntheticEvent<HTMLDivElement>) => {
    e.currentTarget.addEventListener("animationend", () => {
      const svg = document.getElementById("svgContainer");
      if (svg) {
        svg.classList.remove("appearingObject");
      }
    });
    e.currentTarget.addEventListener("click", (e) => {
      const image = document.getElementById("fullScreenImage");
      if (!image?.contains(e.target as HTMLElement)) {
        setFullScreenPhoto(null);
      }
    });
  };

  const handleImageGrowth = () => {
    setFullScreenIsLoading(false);
    const imageContainer = document.getElementById("fullScreenImageContainer");
    if (imageContainer) {
      imageContainer.style.animation = "1.2s image-grow ease forwards";
    }
  };

  return (
    <>
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
      {fullScreenPhoto && (
        <PopUpBackground onLoad={(e) => handleFullScreenPhotoLoad(e)}>
          <SvgContainer
            id="svgContainer"
            className="appearingObject"
            onClick={() => setFullScreenPhoto(null)}
          >
            <SvgCross />
          </SvgContainer>
          <ImageContainer id="fullScreenImageContainer">
            {fullScreenIsLoading && <LoadingAnim />}
            <FullScreenImage
              priority
              id="fullScreenImage"
              src={fullScreenPhoto.imageBig.image}
              alt={fullScreenPhoto.title}
              fill
              onLoad={handleImageGrowth}
              sizes="80vw"
            />
          </ImageContainer>
        </PopUpBackground>
      )}
    </>
  );
};

const PopUpBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 20;
  animation: 1s color-background forwards;
  display: flex;
  align-items: center;
  justify-content: center;
  @keyframes color-background {
    from {
      background-color: rgba(0, 0, 0, 0);
    }
    to {
      background-color: rgba(0, 0, 0, 0.8);
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  @keyframes image-grow {
    from {
      width: 150px;
      height: 150px;
    }
    to {
      width: 85%;
      height: 85%;
    }
  }
`;

const FullScreenImage = styled(Image)`
  object-fit: contain;
`;

const SvgContainer = styled.div`
  position: absolute;
  top: 2%;
  right: 2%;
	cursor: pointer;
  }
	&:hover {
		opacity: 1 !important;
		animation: 2s svgHoverEffect infinite linear ;
		@keyframes svgHoverEffect {
		 100% {
			transform: rotate(360deg);
		}
		}
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
  cursor: pointer;
  @media screen and (min-width: 1024px) {
    margin: unset;
  }
`;

export default Galerie;
