import { Box, Typography } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import { CreateCastMember } from './features/cast/CreateCastMember';
import { EditCastMember } from './features/cast/EditCastMember';
import { ListCastMember } from './features/cast/ListCastMember';
import { CreateCategory } from './features/category/CreateCategory';
import { EditCategory } from './features/category/EditCategory';
import { ListCategory } from './features/category/ListCategory';
import { CreateGenre } from './features/genre/CreateGenre';
import { EditGenre } from './features/genre/EditGenre';
import { ListGenre } from './features/genre/ListGenre';
import { UploadList } from './features/upload/UploadList';
import { CreateVideo } from './features/video/CreateVideo';
import { EditVideo } from './features/video/EditVideo';
import { ListVideo } from './features/video/ListVideo';

export default function App() {
  return (
    <Layout>
      <UploadList />
      <Routes>
        {/* Login */}
        <Route path='/login' element={<Login />} />
        {/* Home */}
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <ListCategory />
            </ProtectedRoute>
          }
        />
        {/* Categories */}
        <Route
          path='/categories'
          element={
            <ProtectedRoute>
              <ListCategory />
            </ProtectedRoute>
          }
        />
        <Route
          path='/categories/create'
          element={
            <ProtectedRoute>
              <CreateCategory />
            </ProtectedRoute>
          }
        />
        <Route
          path='/categories/edit/:id'
          element={
            <ProtectedRoute>
              <EditCategory />
            </ProtectedRoute>
          }
        />
        {/* Cast Members */}
        <Route
          path='/cast-members'
          element={
            <ProtectedRoute>
              <ListCastMember />
            </ProtectedRoute>
          }
        />
        <Route
          path='/cast-members/create'
          element={
            <ProtectedRoute>
              <CreateCastMember />
            </ProtectedRoute>
          }
        />
        <Route
          path='/cast-members/edit/:id'
          element={
            <ProtectedRoute>
              <EditCastMember />
            </ProtectedRoute>
          }
        />
        {/* Genres */}
        <Route
          path='/genres'
          element={
            <ProtectedRoute>
              <ListGenre />
            </ProtectedRoute>
          }
        />
        <Route
          path='/genres/create'
          element={
            <ProtectedRoute>
              <CreateGenre />
            </ProtectedRoute>
          }
        />
        <Route
          path='/genres/edit/:id'
          element={
            <ProtectedRoute>
              <EditGenre />
            </ProtectedRoute>
          }
        />
        {/* Video */}
        <Route
          path='/videos'
          element={
            <ProtectedRoute>
              <ListVideo />
            </ProtectedRoute>
          }
        />
        <Route
          path='/videos/create'
          element={
            <ProtectedRoute>
              <CreateVideo />
            </ProtectedRoute>
          }
        />
        <Route
          path='/videos/edit/:id'
          element={
            <ProtectedRoute>
              <EditVideo />
            </ProtectedRoute>
          }
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
  );
}
