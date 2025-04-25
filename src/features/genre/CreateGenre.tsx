import { Box, Paper, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Genre } from '../../types/Genre';
import { mapGenreToForm } from '../../utils/Genre';
import { GenreForm } from './components/GenreForm';
import {
  initialState,
  useCreateGenreMutation,
  useGetAllCategoriesQuery,
} from './genreSlice';

export const CreateGenre = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [createGenre, status] = useCreateGenreMutation();
  const [isDisabled, setIsDisabled] = useState(false);
  const [genreState, setGenreState] = useState<Genre>(initialState);
  const { data: categories } = useGetAllCategoriesQuery();

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

    await createGenre(mapGenreToForm(genreState));
  }

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar('Genre created successfully!', { variant: 'success' });
      setIsDisabled(true);
    }
    if (status.error) {
      enqueueSnackbar('Error creating genre!', { variant: 'error' });
    }
  }, [status, enqueueSnackbar]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant='h4'>Create Genre</Typography>
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
