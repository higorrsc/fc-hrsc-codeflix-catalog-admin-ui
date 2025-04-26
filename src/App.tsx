import { CssBaseline, Typography } from '@mui/material';
import { Box, ThemeProvider } from '@mui/system';
import { SnackbarProvider } from 'notistack';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Layout } from './components/Layout';
import { darkTheme, lightTheme } from './config/theme';
import { CreateCastMember } from './features/cast/CreateCastMember';
import { EditCastMember } from './features/cast/EditCastMember';
import { ListCastMember } from './features/cast/ListCastMember';
import { CreateCategory } from './features/category/CreateCategory';
import { EditCategory } from './features/category/EditCategory';
import { ListCategory } from './features/category/ListCategory';
import { CreateGenre } from './features/genre/CreateGenre';
import { EditGenre } from './features/genre/EditGenre';
import { ListGenre } from './features/genre/ListGenre';
import { CreateVideo } from './features/video/CreateVideo';
import { EditVideo } from './features/video/EditVideo';
import { ListVideo } from './features/video/ListVideo';

export default function App() {
  const [theme, setTheme] = useState(darkTheme);
  const toggleTheme = () => {
    const currentTheme = theme.palette.mode === 'dark' ? lightTheme : darkTheme;
    setTheme(currentTheme);
    localStorage.setItem('theme', currentTheme.palette.mode);
  };

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
      setTheme(currentTheme === 'dark' ? darkTheme : lightTheme);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={2000}
      >
        <Box component='main'>
          <Header theme={theme.palette.mode} toggleTheme={toggleTheme} />
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
              {/* Genres */}
              <Route path='/genres' element={<ListGenre />} />
              <Route path='/genres/create' element={<CreateGenre />} />
              <Route path='/genres/edit/:id' element={<EditGenre />} />
              {/* Video */}
              <Route path='/videos' element={<ListVideo />} />
              <Route path='/videos/create' element={<CreateVideo />} />
              <Route path='/videos/edit/:id' element={<EditVideo />} />
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
