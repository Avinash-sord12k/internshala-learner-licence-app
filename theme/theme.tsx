import { Montserrat } from 'next/font/google'
import { createTheme } from '@mui/material/styles'

import { Colors } from './colors';
import BorderedBox from '../components/shared/Form/layouts/BorderedBox';

const font = Montserrat({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin-ext'],
  display: 'swap'
})

declare module '@mui/material/styles' {
  interface Components {
    BorderedBox: {}
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

  shape: {
    borderRadius: 0
  },

  components: {
    BorderedBox: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: `1px solid ${Colors.primary}`
        }
      },
    }
  }
})