import { Montserrat } from 'next/font/google'
import { createTheme } from '@mui/material/styles'

import { Colors } from './colors';

const font = Montserrat({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin-ext'],
  display: 'swap'
})

declare module '@mui/material/styles' {
  interface Components {
    MainMenuFrameComponent: {},
    GameButtonComponent: {},
    Button: {}
  }
}

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: Colors.primary,
      contrastText: Colors.white
    },
    secondary: {
      main: Colors.secondary,
      contrastText: Colors.white
    },
    error: {
      main: Colors.danger
    },
    warning: {
      main: Colors.warning
    },
    info: {
      main: Colors.info
    },
  },
  typography: {
    fontFamily: font.style.fontFamily
  },

  components: {
    MainMenuFrameComponent: {
      styleOverrides: {
        root: {
          width: 250,
          height: 400,
          border: `12px ${Colors.primary}`,
          borderStyle: 'ridge solid',
          borderRadius: '36px',
        }
      }
    },
    GameButtonComponent: {
      styleOverrides: {
        root: {
          width: 200,
          height: 40,
          borderTop: `1px solid ${Colors.lime_green}`,
          borderLeft: `1px solid ${Colors.lime_green}`,
          background: Colors.secondary,
          clipPath: `polygon(
                        4% 0,
                        100% 0,
                        100% 80%,
                        94% 100%,
                        0 100%,
                        0 20%
                    )`,
          '&:hover': {
            border: 'none',
            background: Colors.primary
          }
        }
      }
    },
    Button: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 0,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
            scale: 1.1
          }
        },
        outlined: {
          border: `1px solid ${Colors.primary}`,
          '&:hover': {
            border: `1px solid ${Colors.primary}`,
          }
        },
      }
    }
  }
})