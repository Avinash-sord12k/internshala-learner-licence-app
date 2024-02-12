import Sidebar from '@/components/shared/Sidebar'
import config from '@/config'
import SidebarProvider from '@/context/sidebar'
import { Box } from '@mui/material'
import React from 'react'

const LearnersLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <Box>
      <SidebarProvider>
        <Sidebar links={config.UserPages}>
          {children}
        </Sidebar>
      </SidebarProvider>
    </Box>
  )
}

export default LearnersLayout
