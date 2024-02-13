import Sidebar from '@/components/shared/Sidebar'
import config from '@/config'
import SidebarProvider from '@/context/sidebar'
import { UserRole } from '@/types/User.types'
import { Box } from '@mui/material'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

const AdminLayout = ({
  children
}: {
  children: React.ReactNode
}) => {

  const allowedRoles = [UserRole.ADMIN];
  
  const headerList = headers();
  const role = headerList.get('role');

  if (!role || !allowedRoles.includes(role as UserRole)) {
    redirect('/login');
  }

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
