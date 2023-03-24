import Favicon from "@/components/Favicon";
import Navbar from "@/components/Navbar/Navbar";
import GlobalStyle from "@/styles/GlobalStyle";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Favicon />
      <GlobalStyle />
      <Navbar />
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}
