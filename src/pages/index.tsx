import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import * as NetlifyIdentity from "netlify-identity-widget";
import { getAllPhotos, getOnePhotoByFileName } from "@/lib/photos";
import { Photo } from "@/interfaces/photos";
import Navbar from "@/components/Navbar/Navbar";
import HomeContent from "@/components/Home/HomeContent";
import PageContext from "@/context/pageContext";
import Galerie from "./galerie";
import { pagesComponentsInfo, pagesPaths } from "@/interfaces/pages";
import NotFound from "./404";
import { setSlideClass, slideClassesList } from "@/interfaces/transitions";
import styled from "styled-components";
import { getAllCategories } from "@/lib/categories";
import { Category } from "@/interfaces/categories";
import { internalRouter } from "@/lib/internalRouter";

interface HomeProps {
  backgroundPhoto: Photo;
  photos: Photo[];
  categories: Category[];
}
const Home = ({ ...props }: HomeProps) => {
  const { backgroundPhoto, photos, categories } = props;
  const { pageContext, setPageContext } = useContext(PageContext);

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
    internalRouter(pageContext, setPageContext);
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
      <HomeContent backgroundPhoto={backgroundPhoto} categories={categories} />
      <Galerie photos={photos} categories={categories} />
    </>
  );
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
