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
    <div id="prestationsPage" className="pageContainer">
      <PrestationsColumnsWrapper className="pageContentWrapper">
        <PrestationsColumn>{handlePrestationsDisplay(0)}</PrestationsColumn>
        <PrestationsColumn>{handlePrestationsDisplay(1)}</PrestationsColumn>
        <PrestationsColumn>{handlePrestationsDisplay(2)}</PrestationsColumn>
      </PrestationsColumnsWrapper>
    </div>
  );
};

const PrestationsColumnsWrapper = styled.section`
  h2 {
    text-align: center;
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
