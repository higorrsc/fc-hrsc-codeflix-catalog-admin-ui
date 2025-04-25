import { Box, Button, Typography } from '@mui/material';
import { GridFilterModel } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { initialOptions } from '../../config/defaults';
import { GenreTable } from './components/GenreTable';
import { useDeleteGenreMutation, useGetGenresQuery } from './genreSlice';

export const ListGenre = () => {
  const [options, setOptions] = useState(initialOptions);

  const { data, isFetching, error } = useGetGenresQuery(options);
  const [deleteGenre, deleteGenreStatus] = useDeleteGenreMutation();

  const { enqueueSnackbar } = useSnackbar();

  async function handleDeleteGenre(id: string) {
    await deleteGenre({ id });
  }

  function handleOnPageChange(page: number) {
    setOptions((prev) => ({ ...prev, page: page + 1 }));
  }

  function handleOnPageSizeChange(perPage: number) {
    setOptions((prev) => ({ ...prev, perPage }));
  }

  function handleOnFilterChange(filterModel: GridFilterModel) {
    const search = filterModel.quickFilterValues?.join('') ?? '';
    setOptions((prev) => ({ ...prev, search }));
  }

  useEffect(() => {
    if (deleteGenreStatus.isSuccess) {
      enqueueSnackbar('Success deleting genre!', { variant: 'success' });
    }
    if (deleteGenreStatus.error) {
      enqueueSnackbar('Error deleting genre!', { variant: 'error' });
    }
  }, [deleteGenreStatus, enqueueSnackbar]);

  if (error) {
    return <Typography>Error fetching genres.</Typography>;
  }

  return (
    <Box maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
      <Box display='flex' justifyContent='flex-end'>
        <Button
          variant='contained'
          color='secondary'
          component={Link}
          to='/genres/create'
          style={{ marginBottom: '1rem' }}
        >
          New Genre
        </Button>
      </Box>
      <GenreTable
        data={data}
        isFetching={isFetching}
        page={options.page - 1}
        perPage={options.perPage}
        rowsPerPage={options.rowsPerPage}
        handleDelete={handleDeleteGenre}
        handleOnPageChange={handleOnPageChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
        handleFilter={handleOnFilterChange}
      />
    </Box>
  );
};
