import fs from "fs";
import path from "path";
import matter from "gray-matter";

const prestationsDirectory = path.join(process.cwd(), "/content/prestations");

export const getAllPrestations = async () => {
  const files = fs.readdirSync(prestationsDirectory);
  const parsedPrestations = files.map((prestationFile) => {
    const readFile = fs.readFileSync(
      prestationsDirectory + "/" + prestationFile,
      "utf-8"
    );
    const { data: prestation } = matter(readFile);
    return {
      title: prestation.title,
      description: prestation.description,
      price: prestation.price ? prestation.price + " €" : "sur mesure",
    };
  });
  return parsedPrestations;
};
