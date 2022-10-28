import { Typography, Divider, Link } from "@mui/material";
import styled from "styled-components";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import doctorCoffee from "../assets/doctorCoffee.webp";

export default function About() {
  return (
    <Container>
      <Navbar select={"Sobre"} />
      <AboutDiv>
        <Typography
          marginBottom={"20px"}
          variant="h1"
          fontWeight={"700"}
          fontSize={"50px"}
          textAlign={"center"}
        >
          A Revolução Digital da Saúde Passa por Aqui!
        </Typography>
        <ContentDiv>
          <Typography
            variant="h5"
            textAlign={"justify"}
            width={"60%"}
            fontSize={"26px"}
            margin={"20px 20px 0px 0px"}
          >
            Soluções inovadoras que impactam positivamente milhões de vidas
            Pioneira em soluções Cloud-based para exames na América Latina desde
            2010, temos como missão simplificar a gestão de exames com foco no
            paciente. Priorizando a experiência do paciente no centro dos
            processos, temos como visão melhorar a qualidade de vida dos mesmos
            através da Inteligência Artificial e Big Data. Por meio de valores
            como acessibilidade, empoderamento e inovação, caminhamos como uma
            das empresas globais na transformação digital da saúde, através de
            parcerias com empresas mundialmente conhecidas e associações médicas
            altamente acreditadas.
          </Typography>
          <img src={doctorCoffee} alt="" />
        </ContentDiv>
        <div>
          <Divider />
        </div>
        <Jaba>
          <p>Projeto criado por </p>
          <Link to="https://www.linkedin.com/in/eduardonagashima/">
            Eduardo Nagashima
          </Link>
        </Jaba>
      </AboutDiv>
    </Container>
  );
}

const ContentDiv = styled.div`
  display: flex;
  width: 100%;

  img {
    width: 50%;
    object-fit: cover;
    border-radius: 10px 200px 0px;
    margin-bottom: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  }
`;

const AboutDiv = styled.div`
  padding: 20px;
  height: 100%;
`;

const Jaba = styled.div`
  gap: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
