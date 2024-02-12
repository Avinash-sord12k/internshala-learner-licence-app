import Sidebar from '@/components/shared/Sidebar'
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
        <Sidebar>
          {children}
        </Sidebar>
      </SidebarProvider>
    </Box>
  )
}

export default AdminLayout
