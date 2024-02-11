"use client"
import { useAlert } from '@/components/extras/Alert';
import Input from '@/components/shared/Form/Input';
import loginResolver from '@/resolvers/LoginResolver';
import { yupResolver } from '@hookform/resolvers/yup';
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { Box, Button, CircularProgress, IconButton } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { loginAction } from './actions/login';
import { useRouter } from 'next/navigation';

const LoginForm = () => {

  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(loginResolver),
    });

  const { setAlert } = useAlert();
  const router = useRouter();
  const handleLogin = async (data: any) => {
    try {
      await loginAction(data);
      setAlert({
        text: 'User logged in successfully',
        severity: 'success',
      });
      router.push('/');
    } catch (error) {
      setAlert({
        text: 'User login failed',
        severity: 'error',
      });
    }

  }


  return (
    <form onSubmit={handleSubmit(handleLogin)} style={{
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
            id='login-email'
            type='text'
            name='email'
            register={register}
            error={errors.email}
            label="Email" />
        </Box>
        <Box>
          <Input
            required
            id='login-password'
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
          Login
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

export default LoginForm
