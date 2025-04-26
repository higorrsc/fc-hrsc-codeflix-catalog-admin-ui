import { createTheme } from '@mui/material';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: '#222222' },
    primary: { main: '#f5f5f1' },
    secondary: { main: '#e50914' },
    text: { primary: '#f5f5f1' },
  },
});

export const lightTheme = createTheme({
  palette: {
    background: {},
    mode: 'light',
    primary: { main: '#e50914' },
    secondary: { main: '#222222' },
    text: { primary: '#222222' },
  },
});
