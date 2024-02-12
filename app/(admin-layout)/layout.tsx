import Sidebar from '@/components/shared/Sidebar'
import config from '@/config'
import SidebarProvider from '@/context/sidebar'
import { Box } from '@mui/material'
import React from 'react'

const AdminLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <Box>
      <SidebarProvider>
        <Sidebar links={config.AdminPages}>
          {children}
        </Sidebar>
      </SidebarProvider>
    </Box>
  )
}

export default AdminLayout
