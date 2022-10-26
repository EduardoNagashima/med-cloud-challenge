import { Box } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import PatientCard from "../components/PatientCard";
import RefreshContext from "../contexts/RefreshContext";
import PatientList from "../components/PatientList";
import Loading from "../components/Loading";
import api from "../services/api";
import Pagination from "../components/Pagintation";
import OrderButton from "../components/OrderButton";
import SelectedContext from "../contexts/SelectedContext";

export default function Patients() {
  const { count, setCount } = useContext(RefreshContext);
  const { selected, setSelected } = useContext(SelectedContext);
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState([]);
  const type = JSON.parse(localStorage.getItem("type"));

  useEffect(() => {
    api
      .get(`/patients${type ? `?type=${type}` : ""}`, { take: 100, skip: 0 })
      .then((res) => {
        setPatients(res.data);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  }, [count, type]);

  return (
    <Container>
      <RefreshContext.Provider value={{ count, setCount }}>
        <Navbar select={"Pacientes"} />
        <PatientSection>
          <PatientListDiv>
            <PatientBox>
              {loading ? (
                <Loading type={"bars"} color={"#6699CC"} />
              ) : patients.length > 0 ? (
                <ShowPatients>
                  <OrderButton />
                  <PatientList patients={patients} setSelected={setSelected} />
                  <Pagination />
                </ShowPatients>
              ) : (
                <h2>Sem Pacientes no momento</h2>
              )}
            </PatientBox>
          </PatientListDiv>
          <Sidebar selected={selected.name}>
            {selected.id && <PatientCard patient={selected} />}
          </Sidebar>
        </PatientSection>
      </RefreshContext.Provider>
    </Container>
  );
}

const ShowPatients = styled("div")`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const PatientBox = styled(Box)`
  overflow: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 30px;
`;

const PatientSection = styled("div")`
  height: 100%;
  display: flex;
  background-color: rgba(231, 231, 231, 0.8);
`;

const PatientListDiv = styled("div")`
  width: 100%;
`;

const Sidebar = styled("div")`
  display: ${(props) => (props.selected ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;
