import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const SocialLinks = () => {
  return (
    <SocialLinksContainer>
      <Link href="https://www.facebook.com/fake-page">
        <Image
          src="/facebook.webp"
          alt="facebook"
          width="52"
          height="52"
          title="Mon compte Facebook"
        />
      </Link>
      <Link href="https://www.instragram.com/fake-page">
        <InstagramImage
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
  margin-top: 22px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 5%;
`;

const InstagramImage = styled(Image)`
  border-radius: 50%;
`;

export default SocialLinks;
