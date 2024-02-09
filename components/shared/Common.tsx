import { Box, Typography } from '@mui/material'
import React from 'react'
import GoBackButton from '../extras/GoBackButton'
import GlobalSidebarToggler from './sidebarToggler'

interface PageHeadingProps {
  title: string,
  subtitle?: string,
  nonFrontPage?: boolean,
}

export const PageHeading = ({ title, subtitle, nonFrontPage = false }: PageHeadingProps) => {
  return (
    <Box mb={5} sx={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: '1rem',
      p: '1rem',
      borderRadius: '1rem',
      backgroundColor: '#fff',
      // backgroundColor: 'primary.main',
      boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
      boxSizing: 'border-box',
    }}>
      {/* {nonFrontPage && <GoBackButton />} */}
      <GlobalSidebarToggler />
      <Box>
        <Typography variant='h2' sx={{
          fontWeight: 'bold',
          color: 'primary.main',
          mb: '0.2rem', 
        }}>
          {title}
        </Typography>
        {subtitle &&
          <Typography variant='subtitle2' sx={{
            fontWeight: 'normal',
            color: '#333'
          }}>
            {subtitle}
          </Typography>}
      </Box>
    </Box>
  )
}

export const TopicHeading = ({ title, subtitle }: PageHeadingProps) => {
  return (
    <Box mt={10} mb={5}>
      <Typography variant='h6' sx={{
        fontWeight: 'bold',
        color: '#333',
      }}>
        {title}
      </Typography>
      {subtitle &&
        <Typography variant='body2' sx={{
          fontWeight: 'light',
          color: '#777'
        }}>
          {subtitle}
        </Typography>}
    </Box>
  )
}


export const Section = ({ children, sx }: { children: React.ReactNode, sx?: any }) => (
  <Box sx={{
    p: 4,
    backgroundColor: '#f1f1f1',
    // color: '#',
    borderRadius: 4,
    ...sx
  }}>
    {children}
  </Box>
)

export const SectionTitle = ({ title }: { title: string }) => (
  <Typography variant="h6" fontWeight={700} color={'#555'}>
    {title}
  </Typography>
)