import { Box, Button, Typography } from '@mui/material';
import { GridFilterModel } from '@mui/x-data-grid';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { initialOptions } from '../../config/defaults';
import {
  useDeleteCastMemberMutation,
  useGetCastMembersQuery,
} from './castMemberSlice';
import { CastMemberTable } from './components/CastMemberTable';

export const ListCastMember = () => {
  const [options, setOptions] = useState(initialOptions);

  const { data, isFetching, error } = useGetCastMembersQuery(options);
  const [deleteCastMember, status] = useDeleteCastMemberMutation();

  async function handleDeleteCastMember(id: string) {
    await deleteCastMember({ id });
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
      enqueueSnackbar('Success deleting cast member!', { variant: 'success' });
    }
    if (status.error) {
      enqueueSnackbar('Error deleting cast member!', { variant: 'error' });
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
      <CastMemberTable
        data={data}
        isFetching={isFetching}
        page={options.page - 1}
        perPage={options.perPage}
        rowsPerPage={options.rowsPerPage}
        handleDelete={handleDeleteCastMember}
        handleOnPageChange={handleOnPageChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
        handleFilter={handleOnFilterChange}
      />
    </Box>
  );
};
