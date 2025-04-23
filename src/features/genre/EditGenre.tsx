import { Box, Paper, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Genre } from 'src/types/Genre';
import { GenreForm } from './components/GenreForm';
import {
  initialState,
  useGetAllCategoriesQuery,
  useGetGenreByIdQuery,
  useUpdateGenreMutation,
} from './genreSlice';

export const EditGenre = () => {
  const id = useParams<{ id: string }>().id as string;
  const { enqueueSnackbar } = useSnackbar();
  const [isDisabled, setIsDisabled] = useState(false);
  const [genreState, setGenreState] = useState<Genre>(initialState);
  const [updateGenre, status] = useUpdateGenreMutation();
  const { data: categories } = useGetAllCategoriesQuery();
  const { data: genre, isFetching } = useGetGenreByIdQuery({ id });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGenreState({ ...genreState, [name]: value });
  };

  // const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, checked } = e.target;
  //   setGenreState({ ...genreState, [name]: checked });
  // };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await updateGenre({
      id: genreState.id,
      name: genreState.name,
      is_active: genreState.is_active,
      categories_id: genreState.categories?.map((category) => category.id),
    });
  }

  useEffect(() => {
    if (genre) {
      setGenreState(genre.data);
    }
  }, [genre]);

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar('Genre updated successfully!', { variant: 'success' });
      setIsDisabled(true);
    }
    if (status.error) {
      enqueueSnackbar('Error updating genre!', { variant: 'error' });
    }
  }, [status, enqueueSnackbar]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant='h4'>Edit Genre</Typography>
          </Box>
        </Box>
        <GenreForm
          genre={genreState}
          categories={categories?.data}
          isLoading={status.isLoading}
          isDisabled={isDisabled || status.isLoading}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          // handleToggle={handleToggle}
        />
      </Paper>
    </Box>
  );
};
