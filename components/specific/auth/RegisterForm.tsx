"use client"
import { useAlert } from '@/components/extras/Alert';
import Input from '@/components/shared/Form/Input';
import RegisterResolver from '@/resolvers/RegisterResolver';
import { yupResolver } from '@hookform/resolvers/yup';
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { Box, Button, CircularProgress, IconButton } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useForm } from 'react-hook-form';
import { registerAction } from './actions/register';
import PasswordInput from '@/components/shared/Form/PasswordInput';

const RegisterForm = () => {

  const {
    register,
    handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(RegisterResolver),
    });

  const { setAlert } = useAlert();

  const handleRegister = async (data: any) => {
    console.log("--> submitted data: ", data);
    await registerAction(data).then(() => {
      setAlert({
        text: 'User registered successfully',
        severity: 'success',
      })
    }).catch((error) => {
      setAlert({
        text: 'User registration failed',
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
                name='firstName'
                register={register}
                error={errors.firstName}
                label="First Name" />

              <Input
                required
                id='Register-lastname'
                type='text'
                name='lastName'
                register={register}
                error={errors.firstName}
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

            <PasswordInput
              required
              id='Register-password'
              name='password'
              register={register}
              error={errors.password}
              label="Password"
            />
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
