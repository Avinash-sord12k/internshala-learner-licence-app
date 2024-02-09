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
      height: '100vh'
    }}>
      {children}
    </Box>
  )
}

export default AuthLayout
