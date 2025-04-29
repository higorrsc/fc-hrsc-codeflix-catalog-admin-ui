import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import { SnackbarProvider } from 'notistack';
import React, { useState } from 'react';
import { drawerWidth } from '../config/defaults';
import { useAppTheme } from '../hooks/useAppTheme';
import { Header } from './Header';
import { ResponsiveDrawer } from './ResponsiveDrawer';

export function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentTheme, toggleCurrentTheme] = useAppTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <AppBar
          position='fixed'
          sx={{
            width: { sm: `calc(100%) - ${drawerWidth}px` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Header
            theme={currentTheme.palette.mode}
            toggleTheme={toggleCurrentTheme}
            onDrawerToggle={handleDrawerToggle}
          />
        </AppBar>
        <ResponsiveDrawer open={mobileOpen} onClose={handleDrawerToggle} />
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={2000}
        >
          <Container maxWidth='lg' sx={{ color: 'white', my: 12 }}>
            {children}
          </Container>
        </SnackbarProvider>
      </Box>
    </ThemeProvider>
  );
}
