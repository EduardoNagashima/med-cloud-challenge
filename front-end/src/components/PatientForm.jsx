import { styled } from "@mui/material/styles";
import {
  TextField,
  Button,
  Divider,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import LoadingButton from "@mui/lab/LoadingButton";
import DataPicker from "../components/DataPicker";
import ToastedSnack from "../components/ToastedSnack";
import { useEffect, useState } from "react";
import axios from "axios";
import api from "../services/api";

const PatientForm = () => {
  const [patientInfo, setPatientInfo] = useState({ name: "", email: "" });
  const [birthdate, setBirthdate] = useState("01/01/2000");
  const [adress, setAdress] = useState({
    uf: "",
    city: "",
    number: "",
    street: "",
    neighborhood: "",
  });
  const [zipCode, setZipCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [ufInfos, setUfInfo] = useState([]);
  const [open, setAlert] = useState({ msg: "", type: "success", show: false });

  const onClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ ...open, show: false });
  };

  const handleChange = (event) => {
    setAdress({ ...adress, uf: event.target.value });
  };

  const findZip = (e) => {
    e.preventDefault();
    if (zipCode.length === 8) {
      setLoading(true);
      axios
        .get(`https://viacep.com.br/ws/${zipCode}/json/`)
        .then((res) => {
          const { uf, logradouro, localidade, bairro, erro } = res.data;
          if (erro) {
            setAdress({
              uf: "",
              number: "",
              city: "",
              street: "",
              neighborhood: "",
            });
            setAlert({ msg: "CEP Inválido", type: "error", show: true });
            return;
          }
          setAdress({
            ...adress,
            uf: uf,
            city: localidade,
            street: logradouro,
            neighborhood: bairro,
          });
          setAlert({ msg: "CEP Resgatado", type: "success", show: true });
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    axios
      .get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((res) => {
        setUfInfo(res.data);
      });
  }, [open]);

  function submitPatient(e) {
    e.preventDefault();
    if (birthdate === "01/01/2000") {
      setAlert({
        msg: "Coloque uma data de nascimento válida!!",
        type: "warning",
        show: true,
      });
      return;
    }
    setLoading(true);
    const jsonObj = {
      ...patientInfo,
      ...adress,
      zipCode,
      birthdate,
    };
    api
      .post("/patients", jsonObj)
      .then((res) => {
        setAlert({
          msg: "Paciente Cadastrado com sucesso!",
          type: "success",
          show: true,
        });
      })
      .catch((err) => {
        console.error(err.response);
        setAlert({
          msg: `Erro ao cadastrar paciente. ${err.response?.data}`,
          type: "error",
          show: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <FormDiv>
      <ToastedSnack
        msg={open.msg}
        type={open.type}
        open={open.show}
        onClose={onClose}
      />
      <form onSubmit={submitPatient}>
        <RegisterTitle>Registrar Novo Paciente:</RegisterTitle>
        <InputTag
          required
          value={patientInfo.name}
          onChange={(e) => {
            setPatientInfo({ ...patientInfo, name: e.target.value });
          }}
          id="name"
          label="Nome Completo"
          variant="outlined"
        />
        <InputTag
          required
          value={patientInfo.email}
          onChange={(e) => {
            setPatientInfo({ ...patientInfo, email: e.target.value });
          }}
          id="email"
          label="E-mail"
          variant="outlined"
        />
        <DataPicker birthdate={birthdate} setBirthdate={setBirthdate} />
        <div>
          <Divider textAlign="left">Endereço</Divider>
        </div>
        <ZipDiv>
          <InputTag
            required
            error={isNaN(zipCode)}
            helperText={isNaN(zipCode) ? "Somente números" : ""}
            inputProps={{ maxLength: 8 }}
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            id="zipCode"
            label="CEP"
            variant="outlined"
          />
          <LoadingZipButton
            disabled={!(zipCode.length === 8) || isNaN(zipCode)}
            onClick={findZip}
            endIcon={<TravelExploreIcon />}
            loading={loading}
            loadingPosition="end"
            variant="contained"
          ></LoadingZipButton>
        </ZipDiv>
        <FormControl>
          <InputLabel id="uf-label">UF</InputLabel>
          <StyledSelect
            required
            labelId="uf-label"
            label="UF"
            id="uf"
            value={adress.uf}
            onChange={handleChange}
          >
            {ufInfos.map((el, index) => {
              return (
                <MenuItem key={el.nome + index} value={el.sigla}>
                  {el.sigla}
                </MenuItem>
              );
            })}
          </StyledSelect>
        </FormControl>
        <InputTag
          required
          value={adress.city}
          onChange={(e) => {
            setAdress({ ...adress, city: e.target.value });
          }}
          id="city"
          label="Cidade"
          variant="outlined"
        />
        <InputTag
          required
          value={adress.street}
          onChange={(e) => {
            setAdress({ ...adress, street: e.target.value });
          }}
          id="street"
          label="Logradouro"
          variant="outlined"
        />
        <InputTag
          required
          error={isNaN(adress.number)}
          helperText={isNaN(adress.number) ? "Somente números" : ""}
          value={adress.number}
          onChange={(e) => {
            setAdress({ ...adress, number: e.target.value });
          }}
          id="number"
          label="Número"
          variant="outlined"
        />
        <InputTag
          required
          value={adress.neighborhood}
          onChange={(e) => {
            setAdress({ ...adress, neighborhood: e.target.value });
          }}
          id="neighborhood"
          label="Bairro"
          variant="outlined"
        />
        <button disabled={loading}>
          {" "}
          <FormButton disabled={loading} variant="contained">
            Cadastrar
          </FormButton>
        </button>
      </form>
    </FormDiv>
  );
};

const FormButton = styled(Button)`
  width: 609px;
  margin-left: -5px;
  font-size: 18px;
  font-weight: 700;
`;

const ZipDiv = styled("div")`
  display: flex;
  gap: 10px;
`;

const LoadingZipButton = styled(LoadingButton)`
  height: 55px;
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledSelect = styled(Select)`
  margin-bottom: 10px;
`;

const RegisterTitle = styled("p")`
  text-align: start;
  font-size: 25px;
  margin: 0px;
  margin-bottom: 10px;
  font-family: "Libre Franklin", sans-serif;
`;

const FormDiv = styled("div")`
  overflow: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 750px;
  padding: 20px;
  display: flex;
  form {
    display: flex;
    flex-direction: column;
  }
  button {
    border: none;
  }
`;

const InputTag = styled(TextField)`
  width: 100%;
  margin-bottom: 10px;
`;

export default PatientForm;
