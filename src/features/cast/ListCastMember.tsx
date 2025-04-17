import { Box, Button, Typography } from '@mui/material';
import { GridFilterModel } from '@mui/x-data-grid';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  useDeleteCastMemberMutation,
  useGetCastMembersQuery,
} from './castMemberSlice';

const initialOptions = {
  page: 1,
  perPage: 10,
  rowsPerPage: [10, 25, 50, 100],
  search: '',
};

export const ListCastMember = () => {
  const [options, setOptions] = useState(initialOptions);

  const { data, isFetching, error } = useGetCastMembersQuery(options);
  const [deleteCastMember, status] = useDeleteCastMemberMutation();

  function handleOnPageChange(page: number) {
    options.page = page;
    setOptions({ ...options, page });
  }

  function handleOnPageSizeChange(perPage: number) {
    options.perPage = perPage;
    setOptions({ ...options, perPage });
  }

  function handleOnFilterChange(filterModel: GridFilterModel) {
    if (filterModel.quickFilterValues?.length) {
      const search = filterModel.quickFilterValues.join('');
      options.search = search;
      setOptions({ ...options, search });
    } else {
      setOptions({ ...options, search: '' });
    }
    return;
  }

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar('Success deleting category!', { variant: 'success' });
    }
    if (status.error) {
      enqueueSnackbar('Error deleting category!', { variant: 'error' });
    }
  }, [status]);

  if (error) {
    return <Typography>Error fetching cast members.</Typography>;
  }

  return (
    <Box maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
      <Box display='flex' justifyContent='flex-end'>
        <Button
          variant='contained'
          color='secondary'
          component={Link}
          to='/cast-members/create'
          style={{ marginBottom: '1rem' }}
        >
          New Cast Member
        </Button>
      </Box>
      {/* <CategoryTable
          data={data}
          isFetching={isFetching}
          perPage={perPage}
          rowsPerPage={rowsPerPage}
          handleDelete={handleDeleteCategory}
          handleOnPageChange={handleOnPageChange}
          handleOnPageSizeChange={handleOnPageSizeChange}
          handleFilter={handleOnFilterChange}
        /> */}
    </Box>
  );
};
