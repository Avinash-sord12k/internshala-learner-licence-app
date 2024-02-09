'use client';
import { IconButton } from '@mui/material';
import React from 'react'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useSidebar } from '@/context/sidebar';

const GlobalSidebarToggler = () => {
  const { setIsCollapsed} = useSidebar();
  return (
    <IconButton
      sx={{
        '@media (min-width: 600px)': {
          display: 'none',
        },
        color: 'white',
        backgroundColor: 'primary.main',
        borderRadius: '50%',
        p: 1,
        '&:hover': {
          backgroundColor: 'primary.dark',
        },
      }}
      onClick={() => {
        setIsCollapsed((prev) => !prev);
      }}
    >
      <MenuOutlinedIcon />
    </IconButton>
  )
}

export default GlobalSidebarToggler
