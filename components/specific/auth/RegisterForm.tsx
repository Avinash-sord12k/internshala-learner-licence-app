"use client"
import { Box, Button, CircularProgress, IconButton } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form';
import Input from '@/components/shared/Form/Input';
import { useAlert } from '@/components/extras/Alert';
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import RegisterResolver from '@/resolvers/RegisterResolver'
import { yupResolver } from '@hookform/resolvers/yup';
import { AnimatePresence, motion } from 'framer-motion';
import { useRegisterMutation } from '@/store/api/auth';

const RegisterForm = () => {

  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(RegisterResolver),
    });

  const { setAlert } = useAlert();

  const [registerUser, { isLoading }] = useRegisterMutation();

  const handleRegister = async (data: any) => {
    console.log("--> submitted data: ", data);
    registerUser({...data}).unwrap().then((res: any) => {
      console.log("--> res: ", res);
    }
    ).catch((err: any) => {
      console.log("--> err: ", err);
      setAlert({
        text: err?.message ?? "Invalid username or password",
        severity: 'error',
      })
    });
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <form onSubmit={handleSubmit(handleRegister)} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '3rem',
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0rem',
          }}>
            <Box sx={{
              display: 'flex',
              gap: '1rem',
            }}>
              <Input
                required
                id='Register-firstname'
                type='text'
                name='firstname'
                register={register}
                error={errors.firstname}
                label="First Name" />

              <Input
                required
                id='Register-lastname'
                type='text'
                name='lastname'
                register={register}
                error={errors.firstname}
                label="Lastname" />
            </Box>

            <Input
              required
              id='Register-email'
              type='text'
              name='email'
              register={register}
              error={errors.email}
              label="Email" />

            <Input
              required
              id='Register-mobileNumber'
              type='text'
              name='mobileNumber'
              register={register}
              error={errors.mobileNumber}
              label="Mobile Number" />

            <Input
              required
              id='Register-address'
              type='textarea'
              name='address'
              register={register}
              error={errors.address}
              label="Address" />

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
          <Box>
            <Button
              fullWidth
              variant='contained'
              type='submit'
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
      </motion.div>
    </AnimatePresence>
  )
}

export default RegisterForm
