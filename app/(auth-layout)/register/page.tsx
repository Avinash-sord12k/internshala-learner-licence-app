import RegisterForm from '@/components/specific/auth/RegisterForm'
import { Box } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const RegisterPage = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      backgroundColor: '#fff',
      borderRadius: '10px', 
      padding: '2rem',
      boxShadow: '0px 0px 20px 0px #0000001a',
    }}>
      <RegisterForm />
      <Link href="/login">Register</Link>
    </Box>
  )
}

export default RegisterPage
