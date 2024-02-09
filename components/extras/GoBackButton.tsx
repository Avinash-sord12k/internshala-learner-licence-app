"use client";
import { Box, IconButton } from '@mui/material'
import { useRouter } from 'next/navigation';
import React from 'react'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

const GoBackButton = ({
  size = "medium",
}: {
  size?: "small" | "medium" | "large"
}) => {
  const router = useRouter();
  return (
    <IconButton size={size} onClick={() => {
      router.back();
    }}>
      <ArrowBackOutlinedIcon />
    </IconButton>
  )
}

export const WrappedGoBackButton = () => {
  return (
    <Box mb={5}> <GoBackButton /></Box>
  )
};

export default GoBackButton
