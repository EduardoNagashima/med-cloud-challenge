/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import styled from 'styled-components';
import Box from '@mui/system/Box';

export default function Container(props){
  return (
    <ContainerSection>
      {props.children}
    </ContainerSection>
  );
}

const ContainerSection = styled(Box)`
    width: 1300px;
    min-height: 700px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    border-top: 10px solid #08316A;
    border-radius: 0px 10px 10px 10px;
    background: rgb(255,255,255);
    background: linear-gradient(180deg, rgba(255,255,255,1) 0%, 
    rgba(245,245,245,1) 100%);
    box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
`;
