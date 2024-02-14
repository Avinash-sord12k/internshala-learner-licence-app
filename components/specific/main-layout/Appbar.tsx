'use client';
import config from '@/config';
import { useSession } from '@/context/session';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import MoreIcon from '@mui/icons-material/MoreVert';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Button, Container, Skeleton, Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import * as React from 'react';
import { logout } from '../auth/actions/logout';



export default function PrimarySearchAppBar() {

  const { sessionUser, loading, refetch } = useSession();

  if (!sessionUser && !loading) {
    refetch?.();
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Dashboard</MenuItem>
      <MenuItem onClick={() => { logout(); handleMenuClose(); }}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const IfNotSession = () => (
    loading
      ? <Stack direction="row" gap={2} alignItems={'center'}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rounded" width={100} height={20} />
      </Stack>
      : <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Link href="/login">
          <Button>
            Login
          </Button>
        </Link>
        <Link href="/register">
          <Button>
            Register
          </Button>
        </Link>
      </Box>
  )

  return (
    <Box>
      <AppBar position="static">
        <Container>
          <Toolbar sx={{
            px: '0 !important',
          }}>
            {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton> */}

            <Box sx={{ flexGrow: 1 }}>
              <Stack
                direction="row"
                spacing={2}
                alignItems={'baseline'}
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  gap: 2,
                  '& a': {
                    textDecoration: 'none',
                    color: 'white',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  },
                }}
              >
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                    cursor: 'pointer'
                  }}
                >
                  {config.Appname}
                </Typography>
                {config.PublicPageAppbarLinks.map((link) => (
                  <Link href={link.url} key={link.title}>
                    <Typography
                      lineHeight={1}
                      variant="subtitle1"
                      component="p"
                      fontWeight={400} gutterBottom>
                      {link.title}
                    </Typography>
                  </Link>
                ))}
              </Stack>
            </Box>

            {sessionUser?.id ?
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                  <Badge badgeContent={4} color="error">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Box>
              : <IfNotSession />}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box >
  );
}