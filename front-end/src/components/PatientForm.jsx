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
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import api from "../services/api";

const PatientForm = () => {
  const { register, control, resetField, setValue, watch, getValues, formState: { errors }, handleSubmit } = useForm({ defaultValues: { name: '', email: '', city: '', uf: '', street: '', neighborhood: '', number: '' } });
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
            resetField('neighborhoopatientsSagad');
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

        <Controller
          name="uf"
          control={control}
          rules={{ required: true }}
          render={({ field }) =>
            <FormControl sx={{ width: "100%", marginBottom: '10px' }}>
              <InputLabel id='uf-label'>UF</InputLabel>
              <Select {...field} error={errors?.uf} defaultValue="" labelId="uf-label" id="uf" label='UF'>
                {UFs.map((el, index) =>
                  <MenuItem key={el + index} value={el}>
                    <span>{el}</span>
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          }
        />

        <Controller name='city' rules={{ required: true }} control={control} render={({ field }) =>
          <InputTag
            {...field}
            error={errors?.city}
            helperText={errors?.city && "Campo Obrigatório"}
            label='Cidade'
            variant="outlined"
          />
        } />

        <Controller name="street" rules={{ required: true }} control={control} render={({ field }) =>
          <InputTag
            {...field}
            error={errors?.street}
            helperText={errors?.street && "Campo Obrigatório"}
            label='Logradouro'
            variant="outlined"
          />
        } />

        <Controller name="number" rules={{ required: true, pattern: /^[0-9]*$/ }} control={control} render={({ field }) =>
          <InputTag
            {...field}
            error={errors?.number}
            helperText={errors?.number && "Somente números"}
            label='Número'
            variant="outlined"
          />
        } />

        <Controller name="neighborhood" rules={{ required: true }} control={control} render={({ field }) =>
          <InputTag
            {...field}
            error={errors?.neighborhood}
            helperText={errors?.neighborhood && "Campo Obrigatório"}
            label='Bairro'
            variant="outlined"
          />
        } />

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