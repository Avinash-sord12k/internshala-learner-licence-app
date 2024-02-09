"use client";
import React from 'react'
import { useDrawChart } from './drawers';
import { Box } from '@mui/material';

type LineChartDataProps = {
  title: string;
  data: number[];
  labels: string[];
}

const LineChart = (data: LineChartDataProps) => {
  const { chartRef } = useDrawChart(data);
  return (
    <Box
      className="animate__animated animate__fadeInUp"
      sx={{
        backgroundColor: '#fff',
        borderRadius: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        animationDelay: '0.5s',
      }}>
      <canvas ref={chartRef} />
    </Box>
  )
}

export default LineChart
