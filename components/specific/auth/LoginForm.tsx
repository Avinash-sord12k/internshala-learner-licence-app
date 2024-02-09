"use client"
import { Box, Button, CircularProgress, IconButton } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form';
import Input from '@/components/shared/Form/Input';
import { useAlert } from '@/components/extras/Alert';
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import loginResolver from '@/resolvers/LoginResolver'
import { yupResolver } from '@hookform/resolvers/yup';
import { useSignInMutation } from '@/store/api/auth';
import { useRouter } from 'next/navigation';

const LoginForm = () => {

  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginResolver),
      });

  const { setAlert } = useAlert();
  const [logIn, { isLoading, error }] = useSignInMutation();
  const router = useRouter();

  const handleLogin = (data: any) => {
    console.log("--> submitted data: ", data);
    logIn(data).unwrap().then((res: any) => {
      console.log("--> res: ", res);
      router.push('/');
    }).catch((err: any) => {
      console.log("--> err: ", err);
      setAlert({
        text: err?.message ?? "Invalid username or password",
        severity: 'error',
      })
    });
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
          disabled={isLoading}
        >
          Login
          <CircularProgress sx={{
            display: isLoading ? 'inline-block' : 'none',
            marginLeft: '1rem',
            color: 'white',
          }} size={20} />
        </Button>
      </Box>
    </form>
  )
}

export default LoginForm
