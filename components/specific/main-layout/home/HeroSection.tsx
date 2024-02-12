import { ArrowRightAltOutlined } from '@mui/icons-material'
import { Box, Button, Container, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HeroSection = () => {
  return (
    <Box sx={{
      width: '100%',
      backgroundColor: 'primary.main',
    }}>
      <Container>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          '@media (max-width: 1000px)': {
            px: 4,
            py: 8,
            flexDirection: 'column',
            gap: 4,
          },
          gap: 4,
        }}>
          <Box>
            <Typography variant="h4" component="h1" fontWeight={800} color={"HighlightText"}>
              Welcome,
            </Typography>
            <Typography variant="h3" component="h1" fontWeight={800} color={"HighlightText"}>
              To the Online Driving Test Platform
            </Typography>

            <Typography variant="h5" component="p" fontWeight={400} color={"HighlightText"}>
              Get your lerner's driving license with ease
            </Typography>

            <Box sx={{
              mt: 5,
            }}>
              <Link href="/signup" passHref>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  endIcon={
                    <ArrowRightAltOutlined />
                  }
                >
                  Get Started
                </Button>
              </Link>
            </Box>
          </Box>
          <Box sx={{
            '& img': {
              '@media (max-width: 1000px)': {
                width: '300px',
                height: '300px',
              },
              '@media (max-width: 600px)': {
                width: '240px',
                height: '240px',
              },
            }
          }}>
            <Image
              src="/images/hero-image.svg"
              alt="Hero Image"
              width={500}
              height={500} />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default HeroSection
