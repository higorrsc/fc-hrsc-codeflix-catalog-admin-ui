import { Typography } from '@mui/material';
import { Box, ThemeProvider } from '@mui/system';
import { SnackbarProvider } from 'notistack';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Layout } from './components/Layout';
import { appTheme } from './config/theme';
import { CreateCastMember } from './features/cast/CreateCastMember';
import { EditCastMember } from './features/cast/EditCastMember';
import { ListCastMember } from './features/cast/ListCastMember';
import { CreateCategory } from './features/categories/CreateCategory';
import { EditCategory } from './features/categories/EditCategory';
import { ListCategory } from './features/categories/ListCategory';

export default function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={2000}
      >
        <Box
          component='main'
          sx={{
            height: '100vh',
            backgroundColor: (theme) => theme.palette.grey[900],
          }}
        >
          <Header />
          <Layout>
            <Routes>
              <Route path='/' element={<ListCategory />} />
              {/* Categories */}
              <Route path='/categories' element={<ListCategory />} />
              <Route path='/categories/create' element={<CreateCategory />} />
              <Route path='/categories/edit/:id' element={<EditCategory />} />
              {/* Cast Members */}
              <Route path='/cast-members' element={<ListCastMember />} />
              <Route
                path='/cast-members/create'
                element={<CreateCastMember />}
              />
              <Route
                path='/cast-members/edit/:id'
                element={<EditCastMember />}
              />
              {/* 404 */}
              <Route
                path='*'
                element={
                  <Box sx={{ color: 'white' }}>
                    <Typography variant='h1'>404</Typography>
                    <Typography variant='h2'>Page not found</Typography>
                  </Box>
                }
              />
            </Routes>
          </Layout>
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
