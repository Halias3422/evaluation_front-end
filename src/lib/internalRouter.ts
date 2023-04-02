import { PagePath, pagesComponentsInfo, pagesPaths } from "@/interfaces/pages";
import { setSlideClass, slideClassesList } from "@/interfaces/transitions";
import { Dispatch, SetStateAction } from "react";

const retreivePageInfo = (pagePath: string) => {
  if (pagePath.startsWith(pagesPaths.gallery)) {
    pagePath = pagesPaths.gallery;
  }
  const info =
    pagesComponentsInfo[pagePath as keyof typeof pagesComponentsInfo];
  if (info) {
    const element = document.getElementById(info.id);
    return { info, element };
  }
  return { element: null };
};

const isGalleryInternalMove = (pageContext: PagePath) => {
  if (!Object.values(pagesPaths).includes(pageContext.currentPath)) {
    return true;
  }
  if (
    pageContext.currentPath.startsWith(pagesPaths.gallery) &&
    pageContext.previousPath.startsWith(pagesPaths.gallery)
  ) {
    return true;
  }
  return false;
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
    pageContext.currentPath.length > 0 &&
    (Object.values(pagesPaths).includes(pageContext.currentPath) ||
      pageContext.currentPath.startsWith(pagesPaths.gallery))
  ) {
    const currentPage = retreivePageInfo(pageContext.currentPath);
    let previousPage = null;
    if (
      pageContext.previousPath.length > 0 &&
      currentPage &&
      currentPage.info
    ) {
      previousPage = retreivePageInfo(pageContext.previousPath);
      if (previousPage.element) {
        previousPage.element.classList.remove(...slideClassesList);
        previousPage.element.classList.add(
          setSlideClass[currentPage.info.opposite as keyof typeof setSlideClass]
            .slideOut
        );
      }
    }
    if (currentPage.element) {
      currentPage.element.style.display = "block";
      currentPage.element.classList.remove(...slideClassesList);
      currentPage.element.classList.add("appearingObject");
      if (
        !isGalleryInternalMove(pageContext) &&
        previousPage &&
        previousPage.element
      ) {
        currentPage.element.classList.add(
          setSlideClass[currentPage.info.position as keyof typeof setSlideClass]
            .slideIn
        );
      }
    }
  }
};
