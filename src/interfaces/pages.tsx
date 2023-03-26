import { Dispatch, SetStateAction } from "react";

export interface PagePath {
  contextLoaded: boolean;
  previousPath: string;
  currentPath: string;
}

export interface PageContextData {
  pageContext: PagePath;
  setPageContext: Dispatch<SetStateAction<PagePath>>;
}
export const pagesComponentsInfo = {
  ["/galerie"]: {
    id: "galeryPage",
    position: "down",
  },
  ["/tarifs-et-prestations"]: {
    id: "tarificationPage",
    position: "right",
  },
  ["/contact"]: { id: "contactPage", position: "left" },
  ["/"]: { id: "homePage", position: "top" },
};

export const pagesPaths = {
  galery: "/galerie",
  tarification: "/tarifs-et-prestations",
  contact: "/contact",
  home: "/",
};
