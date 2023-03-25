import { Photo } from "@/interfaces/photos";
import { getAllPhotos } from "@/lib/photos";

const Galerie = ({ photos }: { photos: Photo[] }) => {
  return <></>;
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
