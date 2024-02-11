import LoginForm from '@/components/specific/auth/LoginForm'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const LoginPage = () => {
  return (
    <Box sx={{
      padding: '1.5rem',
      backgroundColor: 'white',
      borderRadius: '1rem',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    }}>
      <LoginForm />
      <Box mt={2}>
        <Typography>Don't have an account?</Typography>
        <Link href="/register">Register</Link>
      </Box>
    </Box>
  )
}

export default LoginPage
