import { Box, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import * as React from 'react';
import { Controller } from 'react-hook-form';

export default function MaterialUIPickers({
  id,
  label,
  name,
  control,
  required = false,
  defaultTime = dayjs(),
}: {
  id: string;
  label: string;
  name: string;
  control: any;
  required?: boolean;
  defaultTime?: any;
}) {

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      mb: '1rem',
    }}>
      <label htmlFor={id}>{label}{required && "*"}</label>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultTime}
          render={({ field }) => (
            <DesktopDatePicker
              inputFormat="DD/MM/YYYY"
              {...field}
              renderInput={(params) =>
                <TextField id={id} fullWidth {...params} />}
            />
          )}
        />
      </LocalizationProvider>
    </Box>
  );
}