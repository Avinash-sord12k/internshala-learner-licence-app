import { Box } from "@mui/material"
import React from "react"

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
      justifyContent: 'stretch',
      '@media (max-width: 768px)': {
        flexDirection: 'column',
        maxWidth: '90vw',
      },
      gap: '20px',
      padding: '20px',
      width: '1024px',
      maxWidth: '80vw',
      '& > *': {
        flex: '1 1 50%',
      },
    }}>
      {children}
    </Box>
  )
}

export default FormWrapper