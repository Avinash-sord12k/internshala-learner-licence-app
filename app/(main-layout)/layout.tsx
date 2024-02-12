import PrimarySearchAppBar from '@/components/specific/main-layout/Appbar'
import Footer from '@/components/specific/main-layout/Footer'
import { Box } from '@mui/material'
import React from 'react'

const MainLayout = ({ children }: {
  children: React.ReactNode
}) => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      gap: 0,
      alignItems: 'stretch',
      justifyContent: 'stretch',
    }}>
      <PrimarySearchAppBar />
      <Box sx={{ flex: 1 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  )
}

export default MainLayout
