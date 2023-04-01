import Favicon from "@/components/Favicon";
import PageContext from "@/context/pageContext";
import { PagePath } from "@/interfaces/pages";
import GlobalStyle from "@/styles/GlobalStyle";
import colorscheme from "@/styles/colorscheme";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";

export default function App({ Component, pageProps }: AppProps) {
  const [pageContext, setPageContext] = useState<PagePath>({
    contextLoaded: false,
    previousPath: "",
    currentPath: "",
  });

  useEffect(() => {
    setPageContext({
      ...pageContext,
      currentPath: window.location.pathname,
    });
  }, []);

  return (
    <ThemeProvider theme={colorscheme}>
      <Favicon />
      <GlobalStyle />
      <PageContext.Provider value={{ pageContext, setPageContext }}>
        <Component {...pageProps} />
      </PageContext.Provider>
    </ThemeProvider>
  );
}
