import { Box, Typography } from '@mui/material'
import React from 'react'

const Copyright = () => {
  return (
    <Box sx={{
      textAlign: 'center',
      '& a': {
        textDecoration: 'none',
        color: 'inherit',
        fontWeight: 600,
        ml: '.5rem',
      },
    }}>
      <Typography variant='body1' fontWeight={500} fontSize={'.9rem'}>
        &copy; {new Date().getFullYear()} Big Deal | All Rights Reserved
      </Typography>
      <Typography variant='body1' fontWeight={500} fontSize={'.9rem'}>
        Desigend and Developed by
        <a href="https://www.stackkaroo.com" target="_blank" rel="noopener noreferrer">Stackkaroo</a>
      </Typography>
    </Box>
  )
}

export default Copyright
