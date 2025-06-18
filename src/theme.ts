// theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#414535', // hookers-green
    },
    secondary: {
      main: '#c19875', // lion
    },
    background: {
      default: '#f5f5f5', // dutch-white (light)
      paper: '#96bbbb',   // ash-gray
    },
    text: {
      primary: '#414535', // black-olive
      secondary: '#f5f5f5',
    },
    // Inicialmente em 'light' ou 'dark' de acordo com a configuração do tema
    mode: 'light',
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default theme;
