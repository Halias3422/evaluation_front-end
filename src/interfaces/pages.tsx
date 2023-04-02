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
    id: "galleryPage",
    position: "down",
    opposite: "top",
  },
  ["/tarifs-et-prestations"]: {
    id: "prestationsPage",
    position: "right",
    opposite: "left",
  },
  ["/contact"]: { id: "contactPage", position: "left", opposite: "right" },
  ["/"]: { id: "homePage", position: "top", opposite: "down" },
};

export const pagesPaths = {
  gallery: "/galerie",
  tarification: "/tarifs-et-prestations",
  contact: "/contact",
  home: "/",
};
