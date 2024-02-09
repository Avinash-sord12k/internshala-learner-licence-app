import { Box } from '@mui/material'
import React from 'react'

const AuthLayout = ({ children }: {
  children: React.ReactNode
}) => {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#ffffff',
      // opacity: '0.3',
      background: 'repeating-linear-gradient(45deg, #52b20250, #52b20250 5px, #52b20220 5px, #52b20220 25px)',
    }}>
      {children}
    </Box >
  )
}

export default AuthLayout
