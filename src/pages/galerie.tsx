import Image from "next/image";
import { getAllPhotos } from "@/lib/photos";
import { Photo } from "@/interfaces/photos";

const Galerie = ({ photos }: { photos: Photo[] }) => {
  return (
    <main>
      {photos.map((photo: any, index: number) => {
        return (
          <div key={index}>
            <p>{photo.title}</p>
            <p>{photo.date}</p>
            <Image src={photo.imageSmall} alt="alt" width="600" height="600" />
            <p>{photo.category}</p>
          </div>
        );
      })}
    </main>
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

export default Galerie;
