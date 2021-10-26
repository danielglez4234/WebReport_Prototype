import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DateTimePicker from '@material-ui/lab/DateTimePicker';

export default function BasicDateTimePicker() {
  const [valueStart, setValueStart] = React.useState(new Date());
  const [valueEnd, setValueEnd] = React.useState(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="Start Date"
        value={valueStart}
        onChange={(newValue) => {
          setValueStart(newValue);
        }}
        className="peform-query-input"
      />

      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="End Date"
        value={valueEnd}
        onChange={(newValue) => {
          setValueEnd(newValue);
        }}
        className="peform-query-input"
      />
    </LocalizationProvider>

  );
}
