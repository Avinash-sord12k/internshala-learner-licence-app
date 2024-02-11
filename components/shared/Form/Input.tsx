import { Box, TextField } from '@mui/material';
import React from 'react';

interface InputProps {
  id: string;
  type?: string;
  label: string;
  name: string;
  required?: boolean;
  fullWidth?: boolean;
  register?: any;
  extraProps?: any;
  inputProps?: {
    endAdornment?: React.ReactNode;
  };
  error?: any;
  fref?: any;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((
  {
    id,
    type = 'text',
    label = '',
    name,
    required = false,
    fullWidth,
    register,
    error,
    inputProps,
    extraProps,
  }: InputProps,
  ref
) => (
  <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    mb: '1rem',
  }}>
    <label htmlFor={id}>{label}{required && "*"}</label>
    <TextField
      multiline={type === 'textarea'}
      rows={type === 'textarea' ? 4 : undefined}
      id={id}
      type={type}
      variant='outlined'
      fullWidth={fullWidth}
      InputProps={inputProps}
      error={!!error}
      helperText={error?.message}
      sx={{ ...extraProps?.sx, width: 'auto' }}
      inputRef={ref}
      {...(register && register(name, { required }))}
      {...extraProps}
    />
  </Box>
)
);

Input.displayName = 'Input';

export default Input;
