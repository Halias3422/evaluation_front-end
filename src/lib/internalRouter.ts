import { PagePath, pagesComponentsInfo, pagesPaths } from "@/interfaces/pages";
import { setSlideClass, slideClassesList } from "@/interfaces/transitions";
import { Dispatch, SetStateAction } from "react";

const retreivePageInfo = (pagePath: string) => {
  const info =
    pagesComponentsInfo[pagePath as keyof typeof pagesComponentsInfo];
  if (info) {
    const element = document.getElementById(info.id);
    return { info, element };
  }
  return { element: null };
};

export const internalRouter = (
  pageContext: PagePath,
  setPageContext: Dispatch<SetStateAction<PagePath>>,
  isPopState: boolean
) => {
  if (!isPopState && pageContext.currentPath !== window.location.pathname) {
    history.pushState(null, "", pageContext.currentPath);
  }
  if (pageContext.previousPath.length === 0) {
    setPageContext({
      ...pageContext,
      previousPath: "",
      currentPath: window.location.pathname,
    });
  }
  if (
    pageContext.contextLoaded &&
    pageContext.currentPath.length > 0 &&
    Object.values(pagesPaths).includes(pageContext.currentPath)
  ) {
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
      currentPage.element.classList.add("appearingObject");
      if (previousPage && previousPage.element) {
        currentPage.element.classList.add(
          setSlideClass[currentPage.info.position as keyof typeof setSlideClass]
            .slideIn
        );
      }
    }
  }
};
