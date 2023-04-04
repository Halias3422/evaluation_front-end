import styled from "styled-components";

const LoadingAnim = () => {
  return (
    <Spinner viewBox="0 0 50 50">
      <Circle cx="25" cy="25" r="20" fill="none" />
    </Spinner>
  );
};

const Spinner = styled.svg`
  position: absolute;
  float: center;
  animation: rotate 2s linear infinite;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -25px;
  width: 100px;
  height: 100px;

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Circle = styled.circle`
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
  stroke: hsl(255 0% 100%);
  stroke-width: 4;

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

export default LoadingAnim;
