import styled from "styled-components";
import Image from "next/image";

const Logo = ({ width, height }: { width: number; height: number }) => {
  return (
    <LogoContainer className="objectHoverEffect">
      <LogoImage
        src="/logo.webp"
        alt="Charles Cantin logo"
        width={width}
        height={height}
        onClick={() => (window.location.href = "/")}
        title="Retourner à l'Accueil"
      />
    </LogoContainer>
  );
};

const LogoContainer = styled.div`
  border-radius: 50%;
`;

const LogoImage = styled(Image)`
  cursor: pointer;
  border-radius: 50%;
`;

export default Logo;
