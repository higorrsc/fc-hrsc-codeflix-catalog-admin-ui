import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { keycloak } from '../keycloakConfig';

export function Header({
  theme,
  toggleTheme,
  onDrawerToggle,
}: {
  theme: string;
  toggleTheme: () => void;
  onDrawerToggle: () => void;
}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
            onClick={onDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Codeflix
          </Typography>
          <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color='inherit'>
            {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Button color='inherit' onClick={() => keycloak.logout()}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
