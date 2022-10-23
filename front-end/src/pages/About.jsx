import { Typography, Divider, Link } from "@mui/material";
import styled from "styled-components";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
export default function About() {
  return (
    <Container>
      <Navbar select={"Sobre"} />
      <AboutDiv>
        <Typography variant="h1" textAlign={"center"}>
          A Revolução Digital da Saúde Passa por Aqui Soluções
        </Typography>
        <Typography marginBottom={"20px"}>
          inovadoras que impactam positivamente milhões de vidas Pioneira em
          soluções Cloud-based para exames na América Latina desde 2010, temos
          como missão simplificar a gestão de exames com foco no paciente.
          Priorizando a experiência do paciente no centro dos processos, temos
          como visão melhorar a qualidade de vida dos mesmos através da
          Inteligência Artificial e Big Data. Por meio de valores como
          acessibilidade, empoderamento e inovação, caminhamos como uma das
          empresas globais na transformação digital da saúde, através de
          parcerias com empresas mundialmente conhecidas e associações médicas
          altamente acreditadas.
        </Typography>
        <div>
          <Divider />
        </div>
        <p>Site criado por:</p>
        <Link to="https://www.linkedin.com/in/eduardonagashima/">
          Eduardo Nagashima
        </Link>
      </AboutDiv>
    </Container>
  );
}

const AboutDiv = styled.div`
  padding: 20px;
`;
