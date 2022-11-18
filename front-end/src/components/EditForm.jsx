import * as React from "react";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import dayjs from 'dayjs'
import "dayjs/locale/pt-br";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
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
import { useForm, Controller } from "react-hook-form";

const EditForm = ({ patient }) => {
  const { count, setCount } = React.useContext(RefreshContext);
  const { setSelected } = React.useContext(SelectedContext);
  const [edit, setEdit] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const { register, control, handleSubmit, setValue, formState: { errors } } = useForm({ defaultValues: patient });
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

  useEffect(() => {
    setValue('id', patient.id)
    setValue('name', patient.name);
    setValue('email', patient.email);
    setValue('zipCode', patient.zipCode);
    setValue('uf', patient.uf);
    setValue('city', patient.city);
    setValue('street', patient.street);
    setValue('number', patient.number);
    setValue('neighborhood', patient.neighborhood);
  }, [patient, count]);

  function submitEdit(data) {
    setLoading(true);
    api
      .put(`/patients/${patient.id}`, {
        ...data, birthdate: new Date(dayjs(data.birthdate))
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
        getPatient(patient.id);
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
        <form onSubmit={handleSubmit((data) => submitEdit(data))}>
          <TextField
            {...register('name', { required: true })}
            disabled={edit}
            error={errors?.name}
            name='name'
            sx={{ width: "100%" }}
            label="Nome"
            variant="filled"
          />
          <TextField
            type="email"
            {...register('email', { required: true })}
            error={errors?.email}
            name="email"
            disabled={edit}
            sx={{ width: "100%" }}
            label="Email"
            variant="filled"
          />
          <TextField
            {...register('zipCode', { required: true, maxLength: 8, minLength: 8, pattern: /^[0-9]{8}$/ })}
            disabled={edit}
            error={errors?.zipCode}
            sx={{ width: "100%" }}
            label="CEP"
            variant="filled"
          />

          <Controller
            name="uf"
            control={control}
            rules={{ required: true }}
            render={({ field }) =>
              <FormControl variant="filled" sx={{ width: "100%" }}>
                <InputLabel id='uf-label'>UF</InputLabel>
                <Select {...field} disabled={edit} error={errors?.uf} defaultValue="" labelId="uf-label" id="uf" label='UF'>
                  {UFs.map((el, index) =>
                    <MenuItem key={el + index} value={el}>
                      <span>{el}</span>
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            }
          />
          <TextField
            {...register('city', { required: true })}
            disabled={edit}
            error={errors?.city}
            sx={{ width: "100%" }}
            label="Cidade"
            variant="filled"
          />
          <TextField
            {...register('street', { required: true })}
            disabled={edit}
            error={errors?.street}
            sx={{ width: "100%" }}
            label="Logradouro"
            variant="filled"
          />
          <TextField
            {...register('number', { required: true, pattern: /^[0-9]*$/ })}
            disabled={edit}
            error={errors?.number}
            sx={{ width: "100%" }}
            label="Número"
            variant="filled"
          />
          <TextField
            {...register('neighborhood', { required: true })}
            disabled={edit}
            error={errors?.neighborhood}
            sx={{ width: "100%", mb: "20px" }}
            label="Bairro"
            variant="filled"
          />
          <ConfirmEditDiv>
            <Controller
              name="birthdate"
              control={control}
              render={({ field: { ref, ...rest } }) =>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"pt-br"}>
                  <DesktopDatePicker
                    label="Birthdate"
                    disabled={edit}
                    inputFormat="DD/MM/YYYY"
                    renderInput={(params) => <TextField {...params} />}
                    {...rest}
                  />
                </LocalizationProvider>
              }
            >
            </Controller>
            <Button
              type="submit"
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
