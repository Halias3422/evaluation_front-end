import Head from "next/head";
import { useEffect } from "react";
import * as NetlifyIdentity from "netlify-identity-widget";
import styled from "styled-components";
import { getOnePhotoByFileName } from "@/lib/photos";
import { Photo } from "@/interfaces/photos";
import { abril } from "@/styles/fonts";

const Home = ({ backgroundPhoto }: { backgroundPhoto: Photo }) => {
  useEffect(() => {
    NetlifyIdentity.on("init", (user) => {
      if (!user) {
        NetlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
  }, []);

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
      <BackgroundImage $backgroundPhoto={backgroundPhoto} />
      <TitleContainer id="titleContainer" className="appearingObject">
        <h1 className={abril.className}>
          Charles Cantin
          <br />-<br />
          Photographe
        </h1>
      </TitleContainer>
    </>
  );
};

const BackgroundImage = styled.div<{ $backgroundPhoto: Photo }>`
  width: 100%;
  height: 100%;
  background-image: ${(props) => `url(${props.$backgroundPhoto.imageBig})`};
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

export const getStaticProps = async () => {
  const backgroundPhoto = await getOnePhotoByFileName(
    "Jeunes mariés au coucher du soleil"
  );
  return {
    props: {
      backgroundPhoto,
    },
  };
};

export default Home;
