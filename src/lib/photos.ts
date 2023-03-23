import fs from "fs";
import matter from "gray-matter";
import path from "path";

const photosDirectory = path.join(
  process.cwd(),
  "/content/photos/list-couple/"
);

export const getAllPhotos = async () => {
  const files = fs.readdirSync(photosDirectory);
  const parsedPhotos = files.map((photoFile) => {
    const readFile = fs.readFileSync(photosDirectory + photoFile, "utf-8");
    const { data: photo } = matter(readFile);
    return {
      ...photo,
    };
  });
  console.log("parsedPhotos = " + JSON.stringify(parsedPhotos));
  return parsedPhotos;
};
