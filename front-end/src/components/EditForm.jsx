import * as React from "react";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SwitchDisabled from "./SwitchDisabled";
import Loading from "./Loading";
import { Button, FormControl, InputLabel, MenuItem } from "@mui/material";
import { useEffect } from "react";
import DeleteButton from "./DeleteButton";
import api from "../services/api";
import Select from "@mui/material/Select";
import RefreshContext from "../contexts/RefreshContext";
import ToastedSnack from "./ToastedSnack";
import SelectedContext from "../contexts/SelectedContext";

const EditForm = ({ patient }) => {
  const { count, setCount } = React.useContext(RefreshContext);
  const { setSelected } = React.useContext(SelectedContext);
  const [edit, setEdit] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [editValues, setEditValues] = React.useState(patient);
  const [birthdate, setBirthdate] = React.useState(patient.birthdate);

  const [open, setAlert] = React.useState({
    msg: "",
    type: "success",
    show: false,
  });

  const UFs = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MS",
    "MT",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];

  const getPatient = (id) => {
    api.get(`patients/${id}`).then((res) => {
      setSelected(res.data);
    });
  };

  const onClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ ...open, show: false });
  };

  const handleChange = (event) => {
    setEditValues({ ...editValues, uf: event.target.value });
  };

  useEffect(() => {
    setEditValues({ ...patient });
  }, [patient, count]);

  const submitEdit = (e) => {
    e.preventDefault();
    setLoading(true);
    api
      .put(`/patients/${editValues.id}`, {
        ...editValues,
        birthdate: birthdate,
      })
      .then((res) => {
        if (res.status === 204) {
          setAlert({
            msg: `Paciente editado com sucesso!`,
            type: "success",
            show: true,
          });
        }
        setCount(count + 1);
      })
      .catch((err) => {
        console.error(err);
        setAlert({
          msg: `Erro ao editar o paciente!  ${err.response.data}`,
          type: "error",
          show: true,
        });
      })
      .finally(() => {
        getPatient(editValues.id);
        setLoading(false);
      });
  };

  return (
    <EditFormBox disabled={loading} noValidate>
      <ToastedSnack
        msg={open.msg}
        type={open.type}
        open={open.show}
        onClose={onClose}
      />
      {loading ? (
        <Loading
          type={"bubbles"}
          color={"#6699CC"}
          height={"50%"}
          width={"100%"}
        />
      ) : (
        <form>
          <TextField
            required
            onChange={(e) =>
              setEditValues({ ...editValues, name: e.target.value })
            }
            disabled={edit}
            sx={{ width: "100%" }}
            value={editValues.name}
            label="Nome"
            variant="filled"
          />
          <TextField
            required
            onChange={(e) =>
              setEditValues({ ...editValues, email: e.target.value })
            }
            disabled={edit}
            sx={{ width: "100%" }}
            value={editValues.email}
            label="Email"
            variant="filled"
          />
          <TextField
            required
            onChange={(e) =>
              setEditValues({ ...editValues, zipCode: e.target.value })
            }
            disabled={edit}
            sx={{ width: "100%" }}
            value={editValues.zipCode}
            label="CEP"
            variant="filled"
          />
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="uf-label">UF</InputLabel>
            <Select
              disabled={edit}
              required
              variant="filled"
              labelId="uf-label"
              label="UF"
              id="uf"
              value={editValues.uf}
              onChange={handleChange}
            >
              {UFs.map((el, index) => {
                return (
                  <MenuItem key={el + index} value={el}>
                    {el}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <TextField
            required
            onChange={(e) =>
              setEditValues({ ...editValues, city: e.target.value })
            }
            disabled={edit}
            sx={{ width: "100%" }}
            value={editValues.city}
            label="Cidade"
            variant="filled"
          />
          <TextField
            required
            onChange={(e) =>
              setEditValues({ ...editValues, street: e.target.value })
            }
            disabled={edit}
            sx={{ width: "100%" }}
            value={editValues.street}
            label="Logradouro"
            variant="filled"
          />
          <TextField
            required
            onChange={(e) =>
              setEditValues({ ...editValues, number: e.target.value })
            }
            disabled={edit}
            sx={{ width: "100%" }}
            value={editValues.number}
            label="Número"
            variant="filled"
          />
          <TextField
            required
            onChange={(e) =>
              setEditValues({ ...editValues, neighborhood: e.target.value })
            }
            disabled={edit}
            sx={{ width: "100%", mb: "20px" }}
            value={editValues.neighborhood}
            label="Bairro"
            variant="filled"
          />
          <ConfirmEditDiv>

            <Button
              onClick={submitEdit}
              sx={{ alignSelf: "center" }}
              disabled={edit}
              variant="text"
            >
              Editar
            </Button>
          </ConfirmEditDiv>
          <IconsDiv>
            <SwitchDisabled edit={edit} setEdit={setEdit} />
            <DeleteButton setAlert={setAlert} disabled={edit} id={patient.id} />
          </IconsDiv>
        </form>
      )}
    </EditFormBox>
  );
};

const IconsDiv = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const EditFormBox = styled(Box)`
  width: 100%;
  overflow: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ConfirmEditDiv = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default EditForm;
