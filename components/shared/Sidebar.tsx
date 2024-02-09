"use client";
import React, { useMemo } from 'react';
import { Box, IconButton, Avatar, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Tooltip, Divider, useMediaQuery } from '@mui/material';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import LogoutIcon from '@mui/icons-material/Logout';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '../extras/Logo';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { useMutation } from '@apollo/client';
import LOGOUT_USER from '@/gql/auth/logout';
import { useSidebar } from '@/context/sidebar';
import BusinessIcon from '@mui/icons-material/Business';
import SavingsIcon from '@mui/icons-material/Savings';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import ReviewsIcon from '@mui/icons-material/Reviews';
interface Links {
  title: string;
  icon: React.ReactNode;
  url: string;
}

const Sidebar = ({ children }: { children: React.ReactNode }) => {

  const links: Links[] = useMemo(() => [
    {
      title: 'Sales',
      icon: <LoyaltyIcon />,
      url: '/',
    },
    {
      title: 'Products',
      icon: <Inventory2OutlinedIcon />,
      url: '/products',
    },
    {
      title: 'Brands',
      icon: <BusinessIcon />,
      url: '/brands',
    },
    {
      title: 'Deals',
      icon: <SavingsIcon />,
      url: '/deals',
    },
    {
      title: 'Categories',
      icon: <AccountTreeOutlinedIcon />,
      url: '/categories',
    },
    {
      title: 'Reviews',
      icon: <ReviewsIcon />,
      url: '/reviews',
    },
    {
      title: 'Groups',
      icon: <WidgetsIcon />,
      url: '/groups',
    },
    {
      title: 'Orders',
      icon: <LocalShippingOutlinedIcon />,
      url: '/orders',
    },
    {
      title: 'Coupons',
      icon: <CardGiftcardIcon />,
      url: '/coupons',
    },
    {
      title: 'Users',
      icon: <GroupOutlinedIcon />,
      url: '/users',
    },
    {
      title: 'Content',
      icon: <FolderOpenOutlinedIcon />,
      url: '/content',
    },
    {
      title: 'Profile',
      icon: <AccountCircleOutlinedIcon />,
      url: '/profile',
    },
    {
      title: 'Test Page',
      icon: <ScienceOutlinedIcon />,
      url: '/test',
    },
  ], []);

  const userData = null;

  const [logout] = useMutation(LOGOUT_USER);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(" --> error in logout", error);
    } finally {
      window.location.href = '/login';
    }
  }

  // const isMediumScreen = useMediaQuery('(max-width:960px)');
  // const [isCollapsed, setIsCollapsed] = React.useState<boolean>(true);
  // const [showText, setShowText] = React.useState<boolean>(false);
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
            // minWidth: isCollapsed ? '60px' : '100%',
            maxWidth: '100vw',
          },
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          transition: 'all 200ms ease-out',
          zIndex: 10,
          transform: isCollapsed && isMobile ? 'translateX(-100%)' : 'translateX(0)',
        }}>
        <List>
          <Logo
            sx={{
              justifyContent: !isCollapsed ? 'flex-start' : 'center',
              alignItems: 'center',
              borderRadius: isCollapsed ? '9999px' : '0px',
              overflow: 'hidden',
              width: '100%',
              pl: !isCollapsed ? '1rem' : '',
              mt: !isCollapsed ? '1rem' : '0rem',
              mb: '3rem',
              transition: 'width 200ms ease-out, height 200ms ease-out',
            }}
            width={!showText ? 40 : 60}
            height={!showText ? 40 : 60}
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
                          {item.icon}
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
          ml: isCollapsed ? 20 : 68,
          '@media (max-width: 1000px)': {
            ml: 20,
          },
          '@media (max-width: 600px)': {
            ml: 5,
          },
          mr: 5,
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
        <Box
          className="footer"
          sx={{
            bottom: 0,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 5,
            mb: 2,
            color: 'primary.main',
            fontSize: '1rem',
            '& a': {
              color: 'primary.main',
              textDecoration: 'none',
              ml: 1,
              fontWeight: 'bold',
              '&:hover': {
                color: 'primary.dark',
              }
            },
            '& *': {
              textAlign: 'center',
            }
          }}>
          <Box>&copy; {new Date().getFullYear()} Ecommerce - Big Deal | All Rights Reserved</Box>
          <Box>Desigend and Developed by
            <a href="https://www.stackkaroo.com" target="_blank" rel="noopener noreferrer">Stackkaroo</a>
          </Box>
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


