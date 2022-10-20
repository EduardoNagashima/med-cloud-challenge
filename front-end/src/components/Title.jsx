import styled from 'styled-components';

export default function Title({name}) {
  return (
    <TitleDiv>
      {name ? <TitleName>{name}</TitleName> : <TitleName>MedCloud Challange</TitleName>}
    </TitleDiv>
  );
}

const TitleDiv = styled.div`
    
`;

const TitleName = styled.h3`
    font-size: 70px;
    margin: 0;
    margin-bottom: 70px;
    color: #ffffff;
    font-family: 'Manrope', sans-serif;
`;
