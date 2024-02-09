"use client"
import { Box, Button, CircularProgress, IconButton } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form';
import Input from '@/components/shared/Form/Input';
import { useAlert } from '@/components/extras/Alert';
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import RegisterResolver from '@/resolvers/RegisterResolver'
import { yupResolver } from '@hookform/resolvers/yup';

const RegisterForm = () => {

  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit, formState: {
      isLoading, errors } } = useForm({
        resolver: yupResolver(RegisterResolver),
      });

  const { setAlert } = useAlert();

  const handleRegister = async (data: any) => {
    console.log("--> submitted data: ", data);
    const result = await fetch('/api/auth/register', {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(result);
  }

  return (
    <form onSubmit={handleSubmit(handleRegister)} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '3rem',
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}>
        <Box>
          <Input
            required
            id='Register-email'
            type='text'
            name='email'
            register={register}
            error={errors.email}
            label="Email" />
        </Box>
        <Box>
          <Input
            required
            id='Register-password'
            type={showPassword ? 'text' : 'password'}
            name='password'
            register={register}
            error={errors.password}
            label="Password"
            inputProps={{
              endAdornment: <Box>
                <IconButton onClick={() => { setShowPassword(o => !o) }}>
                  {
                    showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />
                  }
                </IconButton>
              </Box>

            }} />
        </Box>
      </Box>
      <Box>
        <Button fullWidth variant='contained' type='submit'
          disabled={false}
        >
          Register
          <CircularProgress sx={{
            display: false ? 'inline-block' : 'none',
            marginLeft: '1rem',
            color: 'white',
          }} size={20} />
        </Button>
      </Box>
    </form>
  )
}

export default RegisterForm
