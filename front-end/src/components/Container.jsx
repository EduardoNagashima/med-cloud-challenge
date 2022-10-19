import styled from 'styled-components';
import  Box  from '@mui/system/Box';

export default function Container(props){
    return(
    <ContainerSection>
        {props.children}
    </ContainerSection>
    )
}

const ContainerSection = styled(Box)`
    border-top: 5px solid #08316A;
    border-radius: 0px 0px 10px 10px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 1200px;
    height: auto;
    min-height:700px;
    background: rgb(255,255,255);
    background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(245,245,245,1) 100%);
    box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
`