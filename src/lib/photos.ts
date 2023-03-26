import fs from "fs";
import matter from "gray-matter";
import path from "path";

const photosDirectory = path.join(process.cwd(), "/content/photos/");

export const getOnePhotoByFileName = async (fileName: string) => {
  const allPhotos = await getAllPhotos();
  const photo = allPhotos.filter((file) => file.title.startsWith(fileName))[0];
  return photo;
};

export const getAllPhotos = async () => {
  const files = fs.readdirSync(photosDirectory);
  const parsedPhotos = await Promise.all(
    files.map(async (photoFile) => {
      const readFile = fs.readFileSync(photosDirectory + photoFile, "utf-8");
      const { data: photo } = matter(readFile);
      return {
        ...photo,
      };
    })
  );
  return parsedPhotos;
};
