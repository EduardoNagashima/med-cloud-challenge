import dayjs from 'dayjs'
import "dayjs/locale/pt-br";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { styled } from "@mui/material/styles";
import { TextField, Button, Divider, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import LoadingButton from "@mui/lab/LoadingButton";
import ToastedSnack from "../components/ToastedSnack";
import { useState } from "react";
import FormHelperText from '@mui/material/FormHelperText';
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import api from "../services/api";

const PatientForm = () => {
  const { register, control, resetField, setValue, watch, getValues, formState: { errors }, handleSubmit } = useForm();
  const [open, setAlert] = useState({ msg: "", type: "success", show: false });
  const [loading, setLoading] = useState(false);
  const watchZipCode = watch('zipCode');
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

  const onClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ ...open, show: false });
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

  function submitPatient(data) {
    setLoading(true);
    const jsonObj = {
      ...data, birthdate: new Date(dayjs(data.birthdate))
    };
    api
      .post("/patients", jsonObj)
      .then(() => {
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

        <InputTag
          {...register('name', { required: true })}
          error={errors.name?.type}
          helperText={errors.name?.type && "Campo obrigatório"}
          variant="outlined"
          label='Nome'
        />

        <InputTag
          {...register('email', { required: true })}
          error={errors.email?.type}
          helperText={errors.email?.type && "Campo obrigatório"}
          variant="outlined"
          label='E-mail'
        />

        <Controller
          name="birthdate"
          control={control}
          render={({ field: { ref, ...rest } }) =>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"pt-br"}>
              <DesktopDatePicker
                label="Birthdate"
                inputFormat="DD/MM/YYYY"
                renderInput={(params) => <TextField {...params} />}
                {...rest}
              />
            </LocalizationProvider>
          }
        >
        </Controller>

        <div>
          <Divider textAlign="left">Endereço</Divider>
        </div>
        <ZipDiv>
          <InputTag
            {...register("zipCode", { required: true, maxLength: 8, minLength: 8, pattern: /^[0-9]{8}$/ })}
            error={errors.zipCode?.type}
            helperText={errors.zipCode?.type && "Somente números, 8 dígitos"}
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
          <Controller
            name='uf'
            rules={{ required: true }}
            control={control}
            render={({ field: { onChange }, fieldState: { error } }) =>
              <StyledSelect
                defaultValue={''}
                onChange={onChange}
                error={error}
                value={watchZipCode}
                labelId="uf-label"
                label="UF"
                id="uf"
              >
                {UFs.map((el, index) => {
                  return (
                    <MenuItem key={el + index} value={el} >
                      {el}
                    </MenuItem>
                  );
                })}
                {error && <FormHelperText>Oi</FormHelperText>}
              </StyledSelect>
            }
          >
          </Controller>
        </FormControl>

        <InputTag
          {...register('city', { required: true })}
          error={errors?.city}
          helperText={errors?.city && "Campo Obrigatório"}
          label='Cidade'
          variant="outlined"
        />
        <InputTag
          {...register('street', { required: true })}
          error={errors?.street}
          helperText={errors?.street && "Campo Obrigatório"}
          label='Logradouro'
          variant="outlined"
        />
        <InputTag
          {...register('number', { required: true, pattern: /^[0-9]*$/ })}
          error={errors?.number}
          helperText={errors?.number && "Somente números"}
          label='Número'
          variant="outlined"
        />
        <InputTag
          {...register('neighborhood', { required: true })}
          error={errors?.neighborhood}
          helperText={errors?.neighborhood && "Campo Obrigatório"}
          label='Bairro'
          variant="outlined"
        />

        <button disabled={loading}>
          {" "}
          <FormButton type='submit' disabled={loading} variant="contained">
            Cadastrar
          </FormButton>
        </button>
      </form >
    </FormDiv >
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