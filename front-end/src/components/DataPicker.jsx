/* eslint-disable react/prop-types */
import 'dayjs/locale/pt-br';
import * as React from 'react';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function DataPicker(props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'pt-br'}>
        <DatePicker
          label="Data de Nascimento"
          value={props.birthdate || ''}
          onChange={(newValue) => {
            props.setBirthdate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
    </LocalizationProvider>
  );
}