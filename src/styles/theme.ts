import { createTheme, ThemeOptions } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#ce93d8',
    },
    background: {
      default: '#0a0a0a',
      paper: '#121212',
    },
  },
} as ThemeOptions);