/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import styled from 'styled-components';

export default function Title({name}) {
  return (
    <TitleDiv>
      {name ? <TitleName>{name}</TitleName> : <TitleName>MedCloud Challange</TitleName>}
    </TitleDiv>
  );
}

const TitleDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const TitleName = styled.h1`
    font-size: 72px;
    color: #ffffff;
    font-family: 'Manrope', sans-serif;

`;
