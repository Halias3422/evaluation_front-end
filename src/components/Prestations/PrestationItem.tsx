import { Prestation } from "@/interfaces/prestations";
import { copse, patua, roboto } from "@/styles/fonts";
import styled from "styled-components";

const PrestationItem = ({
  prestation,
  index,
}: {
  prestation: Prestation;
  index: number;
}) => {
  return (
    <PrestationItemContainer
      className={roboto.className}
      $isOdd={index % 2 !== 0}
    >
      <h2 className={copse.className}>"{prestation.title}"</h2>
      <Divider />
      <p>{prestation.description}</p>
      <PriceContainer className={patua.className}>
        {prestation.price}
      </PriceContainer>
    </PrestationItemContainer>
  );
};

const PrestationItemContainer = styled.article<{ $isOdd: boolean }>`
  width: 60vw;
  margin: 0 auto;
  text-align: center;
  padding: 20px 30px;
  border: ${(props) => `2px solid ${props.theme.white}`};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: ${(props) =>
    props.$isOdd ? props.theme.lightGrey : props.theme.darkGrey};
  color: ${(props) => props.theme.white};
  h2 {
    margin-top: 5px;
    font-size: 24px;
  }
  p {
    font-size: 16px;
  }
  @media screen and (min-width: 1024px) {
    width: auto;
    margin: unset;
    h2 {
      font-size: 28px;
    }
    p {
      font-size: 18px;
    }
  }
`;

const Divider = styled.div`
  width: 90%;
  border: ${(props) => `1px solid ${props.theme.white}`};
  margin: 0 auto;
  margin-top: -10px;
  margin-bottom: 10px;
`;

const PriceContainer = styled.p`
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.darkGrey};
  font-weight: 900;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  border-radius: 24px;
  padding: 10px 30px;
  font-size: 24px !important;
  @media screen and (min-width: 1024px) {
    font-size: 28px !important;
  }
`;

export default PrestationItem;
