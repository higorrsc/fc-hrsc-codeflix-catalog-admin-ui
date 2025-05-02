import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Page } from '../../components/Page';
import { GenreForm } from './components/GenreForm';
import {
  initialState,
  useGetAllCategoriesQuery,
  useGetGenreByIdQuery,
  useUpdateGenreMutation,
} from './genreSlice';
import { Genre } from './types';
import { mapGenreToForm } from './utils';

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

    await updateGenre(mapGenreToForm(genreState));
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
    <Page title='Edit Genre'>
      <GenreForm
        genre={genreState}
        categories={categories?.data}
        isLoading={status.isLoading}
        isDisabled={isDisabled || status.isLoading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        // handleToggle={handleToggle}
      />
    </Page>
  );
};
