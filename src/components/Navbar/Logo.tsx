import styled from "styled-components";
import Image from "next/image";

const Logo = ({ dimensions }: { dimensions: number }) => {
  return (
    <LogoContainer $dimensions={dimensions} className="objectHoverEffect">
      <LogoImage
        src="/logo.webp"
        alt="Charles Cantin logo"
        width={dimensions}
        height={dimensions}
        onClick={() => (window.location.href = "/")}
        title="Retourner à l'Accueil"
      />
    </LogoContainer>
  );
};
const LogoContainer = styled.div<{ $dimensions: number }>`
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: ${(props) => `${props.$dimensions / 1.2}px;`};
  height: ${(props) => `${props.$dimensions / 1.2}px`};
`;

const LogoImage = styled(Image)`
  cursor: pointer;
  border-radius: 50%;
`;

export default Logo;
