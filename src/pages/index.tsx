import Head from "next/head";
import { useEffect } from "react";
import * as NetlifyIdentity from "netlify-identity-widget";
import { getAllPhotos } from "@/lib/photos";
import Image from "next/image";

const Home = ({ photos }: { photos: any[] }) => {
  photos.map((photo: any) => {
    console.log("photo CIII= " + JSON.stringify(photo));
  });
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
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {photos.map((photo: any) => {
          return (
            <>
              <p>{photo.title}</p>
              <p>{photo.date}</p>
              <Image src={photo.image} alt="alt" width="600" height="600" />
              <p>{photo.category}</p>
            </>
          );
        })}
      </main>
    </>
  );
};

export const getStaticProps = async () => {
  const photos = await getAllPhotos();
  return {
    props: {
      photos,
    },
  };
};

export default Home;
