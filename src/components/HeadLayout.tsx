import { Head } from "next/document";

const HeadLayout = () => {
  return (
    <Head>
      <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
    </Head>
  );
};

export default HeadLayout;
