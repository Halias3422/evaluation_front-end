import { slideClassesList } from "@/interfaces/transitions";

export const pageAnimationsHandler = (element: HTMLElement) => {
  element.addEventListener("animationend", () => {
    element.classList.remove("appearingObject");
    if (element.className.includes("slideOut")) {
      element.style.display = "none";
    }
    element.classList.remove(...slideClassesList);
  });
  element.addEventListener("animationstart", () => {
    if (element.className.includes("slideOut")) {
      element.style.display = "block";
      if (
        document.documentElement.offsetWidth > 1024 &&
        element.id !== "homePage"
      ) {
        const offsetWidth = document.getElementById("headerElement");
        element.style.width = `calc(100% - ${offsetWidth}px)`;
        element.style.left = offsetWidth + "px";
      }
    }
  });
};
