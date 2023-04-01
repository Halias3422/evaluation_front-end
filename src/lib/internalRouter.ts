import { PagePath, pagesComponentsInfo } from "@/interfaces/pages";
import { setSlideClass, slideClassesList } from "@/interfaces/transitions";
import { Dispatch, SetStateAction } from "react";

const retreivePageInfo = (pagePath: string) => {
  const info =
    pagesComponentsInfo[pagePath as keyof typeof pagesComponentsInfo];
  const element = document.getElementById(info.id);
  return { info, element };
};

export const internalRouter = (
  pageContext: PagePath,
  setPageContext: Dispatch<SetStateAction<PagePath>>
) => {
  if (pageContext.previousPath.length === 0) {
    document.getElementById("headerElement")?.classList.add("appearingObject");
    setPageContext({
      contextLoaded: true,
      previousPath: "",
      currentPath: window.location.pathname,
    });
  }
  if (pageContext.contextLoaded && pageContext.currentPath.length > 0) {
    let previousPage = null;
    if (pageContext.previousPath.length > 0) {
      previousPage = retreivePageInfo(pageContext.previousPath);
      if (previousPage.element) {
        previousPage.element.classList.remove(...slideClassesList);
        previousPage.element.classList.add(
          setSlideClass[
            previousPage.info.position as keyof typeof setSlideClass
          ].slideOut
        );
      }
    }
    const currentPage = retreivePageInfo(pageContext.currentPath);
    if (currentPage.element) {
      currentPage.element.style.display = "block";
      currentPage.element.classList.remove(...slideClassesList);
      if (previousPage && previousPage.element) {
        currentPage.element.classList.add(
          setSlideClass[currentPage.info.position as keyof typeof setSlideClass]
            .slideIn
        );
      }
      history.pushState(null, "", pageContext.currentPath);
    }
  }
};
