'use client';
import React from 'react';
import { AppBar, Toolbar, Typography, Container, IconButton, styled, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import config from '@/config';


const FooterWrapper = styled(AppBar)`
  && {
    margin-top: ${({ theme }) => theme.spacing(4)};
    padding-top: ${({ theme }) => theme.spacing(2)};
    padding-bottom: ${({ theme }) => theme.spacing(2)};
    background-color: ${({ theme }) => theme.palette.primary.main}; // Customize background color
    color: ${({ theme }) => theme.palette.common.white};
  }
`;

const SocialIcon = styled(IconButton)`
  && {
    color: ${({ theme }) => theme.palette.common.white};
    margin-right: ${({ theme }) => theme.spacing(1)};
  }
`;

const CopyrightText = styled(Typography)`
  && {
    margin-top: ${({ theme }) => theme.spacing(1)};
  }
`;

const Footer = () => {
  return (
    <FooterWrapper position="static">
      <Container>
        <Toolbar>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            '& img': {
              marginRight: 1,
              filter: 'invert(1)',
            },
          }}>
            <Image
              src="/images/icon.png"
              alt="Logo"
              width={40}
              height={40}
            />
            <Typography variant="subtitle1" component="div">
              {config.Appname}
            </Typography>
          </Box>

          <div style={{ flexGrow: 1 }} />

          <SocialIcon>
            <MenuIcon />
          </SocialIcon>
          <SocialIcon>
            <MenuIcon />
          </SocialIcon>
          <SocialIcon>
            <MenuIcon />
          </SocialIcon>
        </Toolbar>

        <CopyrightText variant="body2" align="center">
          © 2024 Your Company. All rights reserved.
        </CopyrightText>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
