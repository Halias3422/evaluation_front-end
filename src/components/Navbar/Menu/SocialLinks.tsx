import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const SocialLinks = () => {
  return (
    <SocialLinksContainer>
      <Link href="https://www.facebook.com/fake-page-that-doesnt-exist">
        <SocialImage
          priority
          className="objectHoverEffect"
          src="/facebook.webp"
          alt="facebook"
          width="52"
          height="52"
          title="Mon compte Facebook"
        />
      </Link>
      <Link href="https://www.instragram.com/fake-page-that-doesnt-exist">
        <SocialImage
          priority
          className="objectHoverEffect"
          src="/instagram.webp"
          alt="instagram"
          width="52"
          height="52"
          title="Mon compte Instagram"
        />
      </Link>
    </SocialLinksContainer>
  );
};

const SocialLinksContainer = styled.div`
  margin: 0 auto;
  margin-top: 20px;
  width: 100%;
  max-width: 200px;
  display: flex;
  justify-content: space-evenly;
`;

const SocialImage = styled(Image)`
  border-radius: 50%;
`;

export default SocialLinks;
