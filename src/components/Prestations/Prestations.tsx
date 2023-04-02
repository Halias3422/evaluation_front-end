import { Prestation } from "@/interfaces/prestations";
import { pageAnimationsHandler } from "@/lib/pageAnimationsHandler";
import { useEffect } from "react";
import styled from "styled-components";
import PrestationItem from "./PrestationItem";

const Prestations = ({ prestations }: { prestations: Prestation[] }) => {
  useEffect(() => {
    const prestationsContainer = document.getElementById("prestationsPage");
    if (prestationsContainer) {
      pageAnimationsHandler(prestationsContainer);
    }
  }, []);

  const handlePrestationsDisplay = (offset: number) => {
    const columnPrestations = [];
    for (let i = offset; i < prestations.length; i += 3) {
      columnPrestations.push(
        <PrestationItem key={i} prestation={prestations[i]} index={i} />
      );
    }
    return [...columnPrestations];
  };

  return (
    <PrestationsContainer id="prestationsPage">
      <PrestationsColumnsWrapper>
        <PrestationsColumn>{handlePrestationsDisplay(0)}</PrestationsColumn>
        <PrestationsColumn>{handlePrestationsDisplay(1)}</PrestationsColumn>
        <PrestationsColumn>{handlePrestationsDisplay(2)}</PrestationsColumn>
      </PrestationsColumnsWrapper>
    </PrestationsContainer>
  );
};

const PrestationsContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: none;
  position: absolute;
`;

const PrestationsColumnsWrapper = styled.div`
  width: 90%;
  max-width: 1400px;
  margin: 0 auto;
  margin-top: 150px;
  margin-bottom: 150px;
  h2 {
    text-align: center;
  }
  @media screen and (min-width: 1024px) {
    gap: 1vw;
    display: flex;
    width: 70%;
    padding-left: 20vw;
  }
  @media screen and (min-width: 1625px) {
    width: 80%;
    padding-left: 18vw;
  }
  @media screen and (min-width: 2101px) {
    width: 90%;
    padding-left: 0px;
  }
`;

const PrestationsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 30px;
  @media screen and (min-width: 1024px) {
    margin-bottom: 0px;
    flex: 1;
    gap: 1vw;
  }
`;

export default Prestations;
