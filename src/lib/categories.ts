import fs from "fs";
import matter from "gray-matter";
import path from "path";

const categoriesDirectory = path.join(process.cwd(), "/content/categories");

export const getAllCategories = async () => {
  const files = fs.readdirSync(categoriesDirectory);
  const parsedCategories = files.map((categoryFile) => {
    const readFile = fs.readFileSync(
      categoriesDirectory + "/" + categoryFile,
      "utf-8"
    );
    const { data: category } = matter(readFile);
    return {
      name: category.name,
    };
  });
  return parsedCategories;
};
