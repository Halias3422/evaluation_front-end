import Favicon from "@/components/Favicon";
import Navbar from "@/components/Navbar/Navbar";
import GlobalStyle from "@/styles/GlobalStyle";
import colorscheme from "@/styles/colorscheme";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={colorscheme}>
      <Favicon />
      <GlobalStyle />
      <Navbar />
      <main>
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  );
}
