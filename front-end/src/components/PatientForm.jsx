import { styled } from "@mui/material/styles";
import { TextField, Button, Divider, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import LoadingButton from "@mui/lab/LoadingButton";
import ToastedSnack from "../components/ToastedSnack";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import api from "../services/api";

const PatientForm = () => {
  const { register, control, reset, watch, resetField, setValue, getValues, formState: { errors }, handleSubmit } = useForm();
  const [open, setAlert] = useState({ msg: "", type: "success", show: false });
  const [ufInfos, setUfInfo] = useState([]);
  const [birthdate, setBirthdate] = useState();
  const [loading, setLoading] = useState(false);
  const watchAllFields = watch();
  const person = ['name', 'email'];
  const address = ['city', 'street', 'number', 'neighborhood'];

  const capitalizeFirstLetter = ([first, ...rest], locale = navigator.language) =>
    first === undefined ? '' : first.toLocaleUpperCase(locale) + rest.join('')

  const onClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ ...open, show: false });
  };

  const handleChange = (newValue) => {
    setBirthdate(newValue);
  };

  const findZip = (e) => {
    e.preventDefault();
    if (getValues('zipCode').length === 8) {
      setLoading(true);
      axios
        .get(`https://viacep.com.br/ws/${getValues('zipCode')}/json/`)
        .then((res) => {
          const { uf, logradouro, localidade, bairro, erro } = res.data;
          if (erro) {
            resetField('uf');
            resetField('street');
            resetField('city');
            resetField('neighborhood');
            setAlert({ msg: "CEP Inválido", type: "error", show: true });
            return;
          }
          setValue('uf', uf);
          setValue('street', logradouro);
          setValue('city', localidade);
          setValue('neighborhood', bairro);
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

  function submitPatient(data) {
    setLoading(true);
    console.log(data)
    const jsonObj = {
      ...data,
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
      <ToastedSnack msg={open.msg} type={open.type} open={open.show} onClose={onClose} />
      <form onSubmit={handleSubmit((data) => submitPatient(data))}>
        <RegisterTitle>Registrar Novo Paciente:</RegisterTitle>

        {person.map((el, index) =>
          <InputTag key={el + index}
            {...register(el, { required: true })}
            error={errors.el?.type}
            helperText={errors.el?.type && "Campo obrigatório"}
            type={el}
            id={el}
            label={capitalizeFirstLetter(el)}
            variant="outlined"
          />
        )}

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Birthdate"
            inputFormat="DD/MM/YYYY"
            value={birthdate}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <div>
          <Divider textAlign="left">Endereço</Divider>
        </div>
        <ZipDiv>
          <InputTag
            {...register("zipCode", { required: true, maxLength: 8, minLength: 8 })}
            error={errors.zipCode?.type}
            helperText={errors.zipCode?.type && "Somente números, 8 dígitos"}
            inputProps={{ maxLength: 8 }}
            id="zipCode"
            label="CEP"
            variant="outlined"
          />
          <LoadingZipButton
            disabled={!(getValues('zipCode')?.length === 8)}
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
            {...register("uf")}
            value={watchAllFields.uf}
            labelId="uf-label"
            label="UF"
            id="uf"
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

        {address.map((el, index) =>
          <InputTag key={el + index}
            {...register(el, { required: true })}
            error={errors.el?.type}
            value={watchAllFields.el}
            helperText={errors.el?.type && "Campo Obrigatório"}
            id={el}
            label={capitalizeFirstLetter(el)}
            variant="outlined"
          />
        )}

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