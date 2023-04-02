import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import * as NetlifyIdentity from "netlify-identity-widget";
import { getAllPhotos, getOnePhotoByFileName } from "@/lib/photos";
import { Photo } from "@/interfaces/photos";
import HomeContent from "@/components/Home/HomeContent";
import PageContext from "@/context/pageContext";
import { getAllCategories } from "@/lib/categories";
import { Category } from "@/interfaces/categories";
import { internalRouter } from "@/lib/internalRouter";
import Galerie from "@/components/Galerie/Galerie";
import { pagesPaths } from "@/interfaces/pages";
import Navbar from "@/components/Navbar/Navbar";
import styled from "styled-components";

interface HomeProps {
  backgroundPhoto: Photo;
  photos: Photo[];
  categories: Category[];
}
const Home = ({ ...props }: HomeProps) => {
  const { backgroundPhoto, photos, categories } = props;
  const [navbarWidth, setNavbarWidth] = useState<number>(0);
  const [popState, setPopState] = useState<boolean>(false);
  const { pageContext, setPageContext } = useContext(PageContext);

  useEffect(() => {
    NetlifyIdentity.on("init", (user) => {
      if (!user) {
        NetlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
    window.addEventListener("popstate", (e) => {
      location.reload();
    });
  }, []);

  useEffect(() => {
    if (pageContext.contextLoaded) {
      if (
        pageContext.currentPath !== window.location.pathname ||
        !pageContext.previousPath
      ) {
        internalRouter(pageContext, setPageContext, popState);
      }
      setPopState(false);
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
      <ContentContainer>
        <Navbar setNavbarWidth={setNavbarWidth} categories={categories} />
        <HomeContent
          backgroundPhoto={backgroundPhoto}
          categories={categories}
        />
        <Galerie photos={photos} categories={categories} />
      </ContentContainer>
    </>
  );
};

const ContentContainer = styled.main`
  width: 100%;
  height: 100%;
  min-height: fit-content;
  @media screen and (min-width: 1024px) {
    display: flex;
  }
`;

export const getStaticPaths = async () => {
  const categories = await getAllCategories();
  const categoriesPaths = [];
  for (const category of categories) {
    const formattedCategory = category.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    categoriesPaths.push(pagesPaths.gallery + "/" + formattedCategory);
  }
  return {
    paths: Object.values(pagesPaths).concat(categoriesPaths),
    fallback: false,
  };
};

export const getStaticProps = async () => {
  const backgroundPhoto = await getOnePhotoByFileName(
    "Jeunes mariés au coucher du soleil"
  );
  const photos = await getAllPhotos();
  const categories = await getAllCategories();
  return {
    props: {
      photos,
      backgroundPhoto,
      categories,
    },
  };
};

export default Home;
