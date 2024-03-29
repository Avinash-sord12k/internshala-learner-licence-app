import { Box } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const Logo = ({
  width = 200,
  height = 200,
  sx,
}: {
  width?: number,
  height?: number,
  sx?: any,
}) => {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...sx,
      transition: 'all 200ms ease-out', 
      '& img': {
        transition: 'all 200ms ease-out', 
        filter: 'invert(1)',
      },
    }}>
      <Image src="/images/icon.png" alt="logo"
        width={width}
        height={height} />
    </Box>
  )
}

export default Logo
