'use client';

import { Autocomplete, TextField, Typography } from '@mui/material';
import React from 'react'
import { Controller } from 'react-hook-form';

type CustomAutocompleteProps = {
  name: string;
  label: string;
  control: any;
  options: any;
  error?: any;
}

const CustomAutocomplete = ({
  name,
  control,
  options,
  label,
  error,
}:CustomAutocompleteProps) => {
  return (
    <>
      <Typography variant='body1' sx={{ fontWeight: 500, fontSize: '1rem', color: '#555', marginBottom: 1 }}>
        {label}
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Autocomplete
            multiple
            fullWidth
            freeSolo
            disablePortal
            options={options}
            value={field.value}
            onChange={(event, newValue) => {
              field.onChange(newValue);
            }}
            renderInput={(params) =>
              <TextField
                variant='outlined'
                {...params} />}
          />
        )}
      />
       <Typography variant="body2" color="erro" fontSize={'small'} fontWeight={'thin'} mb={2}>
        {error?.message}
      </Typography>
    </>
  )
}

export default CustomAutocomplete