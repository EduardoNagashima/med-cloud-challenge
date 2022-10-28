import { styled } from "@mui/material/styles";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import doctorPicture from "../assets/doctor.webp";
import PatientForm from "../components/PatientForm";

export default function Register() {
  return (
    <Container>
      <Navbar select={"Adicionar"} />
      <FormSection>
        <PatientForm />
        <SideImage src={doctorPicture} alt="paciente-e-doutor" />
      </FormSection>
    </Container>
  );
}

const FormSection = styled("section")`
  display: flex;
`;

const SideImage = styled("img")`
  box-sizing: border-box;
  border-left: 10px solid #08316a;
  object-fit: cover;
  width: 50%;
  height: 750px;
  border-radius: 0px 10px 10px 200px;
`;
