'use client';
import React, { forwardRef } from 'react'
import Input from './Input'
import { Box, IconButton } from '@mui/material';
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';


interface PasswordInputProps {
  id: string;
  label: string;
  name: string;
  required?: boolean;
  fullWidth?: boolean;
  register?: any;
  extraProps?: any;
  error?: any;
}


const PasswordInput = ({
  id,
  name,
  label,
  required,
  fullWidth,
  register,
  error,
  extraProps,
}: PasswordInputProps) => {

  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <Input
      required={required}
      id={id}
      type={showPassword ? 'text' : 'password'}
      name={name}
      register={register}
      error={error}
      label={label}
      fullWidth={fullWidth}
      extraProps={{
        sx: {
          width: 'auto'
        },
         ...extraProps
      }}
      inputProps={{
        endAdornment: <Box>
          <IconButton onClick={() => { setShowPassword(o => !o) }}>
            {
              showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />
            }
          </IconButton>
        </Box>

      }} 
    />

  )
};

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput
