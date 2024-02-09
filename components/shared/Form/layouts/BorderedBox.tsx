import { Box } from "@mui/material"
import React from "react"

const BorderedBox = ({ children, sx, darker = false }: { children: React.ReactNode, sx?: any, darker?: boolean }) => {
  return (
    <Box sx={{
      border: `1px solid ${darker ? '#bbb' : '#dedede'}`,
      borderRadius: '5px',
      padding: '1rem',
      marginBottom: '10px',
      overflow: 'hidden',
      '& > *': {
        marginBottom: '10px',
      },
      ...sx
    }}>
      {children}
    </Box>
  )
}

export default BorderedBox