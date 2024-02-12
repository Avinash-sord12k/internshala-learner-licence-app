// app/ThemeRegistry.tsx
'use client';
import { theme } from '@/theme/theme';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import React from 'react';


// This implementation is from emotion-js
// https://github.com/emotion-js/emotion/issues/2928#issuecomment-1319747902
export default function ThemeRegistry({
    children
}: {
    children: React.ReactNode
}) {


const themeWithResponsiveFont = responsiveFontSizes(theme);

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={themeWithResponsiveFont}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}