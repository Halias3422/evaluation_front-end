import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import * as NetlifyIdentity from "netlify-identity-widget";
import { getAllPhotos, getOnePhotoByFileName } from "@/lib/photos";
import { Photo } from "@/interfaces/photos";
import Navbar from "@/components/Navbar/Navbar";
import HomeContent from "@/components/Home/HomeContent";
import PageContext from "@/context/pageContext";
import Galerie from "./galerie";
import { pagesComponentsInfo } from "@/interfaces/pages";
import NotFound from "./404";
import { setSlideClass, slideClassesList } from "@/interfaces/transitions";

interface HomeProps {
  backgroundPhoto: Photo;
  photos: Photo[];
}
const Home = ({ ...props }: HomeProps) => {
  const { backgroundPhoto, photos } = props;
  const { pageContext, setPageContext } = useContext(PageContext);
  const [navbarWidth, setNavbarWidth] = useState<number>(0);

  useEffect(() => {
    NetlifyIdentity.on("init", (user) => {
      if (!user) {
        NetlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
  }, []);

  useEffect(() => {
    if (
      pageContext.contextLoaded &&
      pageContext.currentPath.length > 0 &&
      pageContext.currentPath !== window.location.pathname
    ) {
      const previousPageInfo =
        pagesComponentsInfo[
          pageContext.previousPath as keyof typeof pagesComponentsInfo
        ];
      const currentPageInfo =
        pagesComponentsInfo[
          pageContext.currentPath as keyof typeof pagesComponentsInfo
        ];
      const previousElement = document.getElementById(
        previousPageInfo.id
      ) as HTMLDivElement;
      const currentElement = document.getElementById(
        currentPageInfo.id
      ) as HTMLDivElement;
      if (previousElement && currentElement) {
        currentElement.style.display = "block";
        previousElement.classList.remove(...slideClassesList);
        currentElement.classList.remove(...slideClassesList);
        previousElement.classList.add(
          setSlideClass[previousPageInfo.position as keyof typeof setSlideClass]
            .slideOut
        );
        currentElement.classList.add(
          setSlideClass[currentPageInfo.position as keyof typeof setSlideClass]
            .slideIn
        );
        history.pushState(null, "", pageContext.currentPath);
      }
    }
  }, [pageContext.currentPath]);

  return (
    <>
      <Head>
        <title>Charles Cantin - Photographe</title>
        <meta
          name="description"
          content="Je suis Charles Cantin et ce site est mon portfolio. Vous pourrez y trouver mes meilleures photos, consulter mes tarifs et prestations et prendre contact avec moi."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar setNavbarWidth={setNavbarWidth} />
      <main>
        <HomeContent backgroundPhoto={backgroundPhoto} />
        <Galerie photos={photos} offsetLeft={navbarWidth} />
      </main>
    </>
  );
};

export const getStaticProps = async () => {
  const backgroundPhoto = await getOnePhotoByFileName(
    "Jeunes mariés au coucher du soleil"
  );
  const photos = await getAllPhotos();
  return {
    props: {
      photos,
      backgroundPhoto,
    },
  };
};

export default Home;
