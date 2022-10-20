import styled from 'styled-components';
import Container from '../components/Container';
import Navbar from '../components/Navbar';
export default function About() {
  return (
    <Container>
      <Navbar select={'Sobre'}/>
      <AboutDiv>
        <p>Em Breve</p>
      </AboutDiv>
    </Container>
  );
}

const AboutDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    p {
        padding: 20px;
        font-family: 'Libre Franklin', sans-serif;
        font-size: 50px;
        font-weight: 700;
    }
`;
