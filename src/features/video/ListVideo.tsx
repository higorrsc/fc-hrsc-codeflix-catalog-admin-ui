import { Box, Button, Typography } from '@mui/material';
import { GridFilterModel } from '@mui/x-data-grid';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { VideoTable } from './components/VideoTable';
import { useDeleteVideoMutation, useGetVideosQuery } from './videoSlice';

const initialOptions = {
  page: 1,
  perPage: 10,
  rowsPerPage: [10, 25, 50, 100],
  search: '',
};

export const ListVideo = () => {
  const [options, setOptions] = useState(initialOptions);

  const { data, isFetching, error } = useGetVideosQuery(options);
  const [deleteVideo, status] = useDeleteVideoMutation();

  async function handleDeleteVideo(id: string) {
    await deleteVideo({ id });
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
    if (status.isSuccess) {
      enqueueSnackbar('Success deleting video!', { variant: 'success' });
    }
    if (status.error) {
      enqueueSnackbar('Error deleting video!', { variant: 'error' });
    }
  }, [status]);

  if (error) {
    return <Typography>Error fetching videos.</Typography>;
  }

  return (
    <Box maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
      <Box display='flex' justifyContent='flex-end'>
        <Button
          variant='contained'
          color='secondary'
          component={Link}
          to='/videos/create'
          style={{ marginBottom: '1rem' }}
        >
          New Video
        </Button>
      </Box>
      <VideoTable
        data={data}
        isFetching={isFetching}
        page={options.page - 1}
        perPage={options.perPage}
        rowsPerPage={options.rowsPerPage}
        handleDelete={handleDeleteVideo}
        handleOnPageChange={handleOnPageChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
        handleFilter={handleOnFilterChange}
      />
    </Box>
  );
};
