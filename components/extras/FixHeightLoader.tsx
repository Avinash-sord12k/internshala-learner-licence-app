import { Skeleton } from '@mui/material'
import React from 'react'

const FixHeightLoader = ({
  height = '100%',
}: {
  height?: string;
}) => {
  return (
    <Skeleton
      variant="rounded"
      animation="wave"
      sx={{
        height,
        borderRadius: '1rem',
        backgroundColor: '#fff',
        mb: '1rem',
      }}
    />
  )
}

export default FixHeightLoader
