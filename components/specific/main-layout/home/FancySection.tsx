import { Box, Container, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const FancySection = () => {
  return (
    <Box sx={{
      padding: 4,
    }}>
      <Container>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row-reverse',
          '@media (max-width: 1000px)': {
            px: 4,
            py: 8,
            flexDirection: 'column',
            gap: 4,
          },
          gap: { xs: 4, md: 8 },
        }}>
          <Box>
            <Typography variant="h4" component="h1" fontWeight={800} gutterBottom>
              Why Chose Us,
            </Typography>
            <Typography variant="subtitle1" component="p" fontWeight={400} gutterBottom>
              Get your lerner's driving license with ease.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quibusdam perferendis inventore ad tempora est distinctio cupiditate? Laborum, cum obcaecati?
            </Typography>
            <Typography variant="subtitle1" component="p" fontWeight={400} gutterBottom>
              Get your lerner's driving license with ease.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quibusdam perferendis inventore ad tempora est distinctio cupiditate? Laborum, cum obcaecati?
            </Typography>
            <Typography variant="subtitle1" component="p" fontWeight={400} gutterBottom>
              Get your lerner's driving license with ease.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quibusdam perferendis inventore ad tempora est distinctio cupiditate? Laborum, cum obcaecati?
            </Typography>

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
              src="/images/fancy-section.svg"
              alt="Hero Image"
              width={500}
              height={500} />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default FancySection
