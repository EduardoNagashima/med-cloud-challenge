import * as React from 'react';

import TextField from '@mui/material/TextField';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';


export default function DataPicker() {
  const [value, setValue] = React.useState(null);
  return (
    <LocalizationProvider dateFormats={'DD/MM/YYYY'} dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Data de Nascimento"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
