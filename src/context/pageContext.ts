import { PageContextData } from "@/interfaces/pages";
import { createContext } from "react";

const PageContext = createContext<PageContextData>({
  pageContext: {
    contextLoaded: false,
    previousPath: "",
    currentPath: "",
  },
  setPageContext: () => {},
});

export default PageContext;
