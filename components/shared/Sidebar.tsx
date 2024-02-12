"use client";
import { useSidebar } from '@/context/sidebar';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Tooltip, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import Logo from '../extras/Logo';

interface Links {
  title: string;
  icon: any;
  url: string;
}

const Sidebar = ({ children, links }: {
  children: React.ReactNode,
  links: Links[]
}) => {

  const userData = null;

  const logout = async () => {
    console.log(" --> logout");
  }

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(" --> error in logout", error);
    } finally {
      window.location.href = '/login';
    }
  }

  const { isCollapsed, setShowText, showText, setIsCollapsed } = useSidebar();
  const isMobile = useMediaQuery('(max-width:600px)');

  const closeSidebar = () => {
    setIsCollapsed(true);
  }
  const openSidebar = () => {
    setIsCollapsed(false);
  }

  React.useEffect(() => {
    if (isCollapsed) {
      setShowText(false);
    } else {
      setTimeout(() => {
        setShowText(true);
      }, 200);
    }
  }, [isCollapsed]);

  const route = usePathname();
  const isActive: (href: string) => boolean = (href) => {
    if (href === '/') {
      return route === href;
    } else {
      return route.includes(href);
    }
  };


  return (
    <>
      <Stack
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh !important',
          minWidth: isCollapsed ? '60px' : '250px',
          maxWidth: isCollapsed ? '60px' : '250px',
          '@media (max-width: 600px)': {
            maxWidth: '100vw',
          },
          pt: '2rem',
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          transition: 'all 200ms ease-out',
          zIndex: 10,
          transform: isCollapsed && isMobile ? 'translateX(-100%)' : 'translateX(0)',
        }}>
        <List>
          <Logo
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
              width: '100%',
              mb: '3rem',
              transition: 'width 200ms ease-out, height 200ms ease-out',
            }}
            width={isCollapsed ? 40 : 60}
            height={isCollapsed ? 40 : 60}
          />

          <SidebarToggler
            isCollapsed={isCollapsed}
            openSidebar={openSidebar}
            closeSidebar={closeSidebar}
          />

          <Box sx={{
            maxHeight: 'calc(100vh - 200px)',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '5px',
              backgroundColor: '#transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'primary.dark',
              borderRadius: '5px',
            },
          }}>
            {links.map((item, index) => (
              <ListItem
                aria-selected={isActive(item.url)}
                data-selected={isActive(item.url)}
                key={index} disablePadding>
                <Link href={item.url} style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  width: '100%',
                }}>
                  <ListItemButton onClick={() => { isMobile && setIsCollapsed(true) }} >
                    <ListItemIcon sx={{
                      color: 'primary.contrastText',
                      minWidth: isCollapsed ? '0 !important' : '40px',
                    }}>
                      <Tooltip title={item.title} placement="right-end">
                        <div>
                          <item.icon />
                        </div>
                      </Tooltip>
                    </ListItemIcon>
                    <ListItemText primary={item.title}
                      sx={{
                        opacity: showText ? '100' : '0',
                        transition: 'opacity 100ms ease-out',
                        display: isCollapsed ? 'none' : 'inline'
                      }} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </Box>
        </List>
        <Box mt="auto" mb="1rem">
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleLogout()}>
                <ListItemIcon sx={{
                  color: 'primary.contrastText',
                }}>
                  <Tooltip title="Logout" placement="right-end">
                    <div>
                      <LogoutIcon />
                    </div>
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary="Logout"
                  sx={{
                    opacity: showText ? '100' : '0',
                    transition: 'opacity 100ms ease-out',
                    display: isCollapsed ? 'none' : 'inline'
                  }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              {false && userData
                ? <ListItemButton>
                  <ListItemIcon>
                    <Tooltip title="Profile Picture" placement="right-end">
                      <div>
                        <Avatar sx={{ width: 32, height: 32, marginRight: 1 }} src={''} alt="Avatar" />
                      </div>
                    </Tooltip>
                  </ListItemIcon>
                  <ListItemText primary={'first-name' + " " + 'last-name' || "User"}
                    sx={{
                      opacity: showText ? '100' : '0',
                      transition: 'opacity 100ms ease-out',
                      display: isCollapsed ? 'none' : 'inline'
                    }} />
                </ListItemButton>
                : null}
            </ListItem>
          </List>
        </Box>
      </Stack>
      <Box
        sx={{
          ml: isCollapsed ? 14 : 35,
          '@media (max-width: 1000px)': {
            ml: 13,
          },
          '@media (max-width: 600px)': {
            ml: 2,
          },
          mr: 2,
          py: 5,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          "& .main-body": {
            flexGrow: 1,
          },
          "& .footer": {
            flexGrow: 0,
          },
        }}>
        <Box className="main-body">
          {children}
        </Box>
      </Box>
    </>
  );
}

export default Sidebar;



const SidebarToggler = ({ isCollapsed, openSidebar, closeSidebar }: {
  isCollapsed: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
}) => (
  <Box sx={{
    position: 'absolute',
    top: '10vh',
    right: 0,
    transform: 'translate(50%, -50%)',
    '@media (max-width: 600px)': {
      transform: 'translate(-50%, -50%)',
      // display: 'none',
    },
    zIndex: 10,
    backgroundColor: 'primary.main',
    borderRadius: '50%',
    border: '2px solid #fff',
    '& .MuiButtonBase-root': {
      p: 0,
    },
    '& svg': {
      fontSize: '1.5rem',
      color: 'primary.contrastText',
    },
    '&:hover': {
      // backgroundColor: 'primary.main',
      filter: 'brightness(1.4)',
      '& svg': {
        color: 'primary.contrastText',
      },
    }
  }}>
    {isCollapsed
      ? <IconButton size='medium' onClick={openSidebar}>
        <ChevronRightOutlinedIcon />
      </IconButton>
      : <IconButton size='medium' onClick={closeSidebar}>
        <ChevronLeftOutlinedIcon />
      </IconButton>}
  </Box>
)


