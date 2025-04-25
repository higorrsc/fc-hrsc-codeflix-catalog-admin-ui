import { Box, Button, Typography } from '@mui/material';
import { GridFilterModel } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { initialOptions } from '../../config/defaults';
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from './categorySlice';
import { CategoryTable } from './components/CategoryTable';

export const ListCategory = () => {
  const [options, setOptions] = useState(initialOptions);

  const { data, isFetching, error } = useGetCategoriesQuery(options);
  const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();

  const { enqueueSnackbar } = useSnackbar();

  async function handleDeleteCategory(id: string) {
    await deleteCategory({ id });
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
    if (deleteCategoryStatus.isSuccess) {
      enqueueSnackbar('Success deleting category!', { variant: 'success' });
    }
    if (deleteCategoryStatus.error) {
      enqueueSnackbar('Error deleting category!', { variant: 'error' });
    }
  }, [deleteCategoryStatus, enqueueSnackbar]);

  if (error) {
    return <Typography>Error fetching categories.</Typography>;
  }

  return (
    <Box maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
      <Box display='flex' justifyContent='flex-end'>
        <Button
          variant='contained'
          color='secondary'
          component={Link}
          to='/categories/create'
          style={{ marginBottom: '1rem' }}
        >
          New Category
        </Button>
      </Box>
      <CategoryTable
        data={data}
        isFetching={isFetching}
        page={options.page - 1}
        perPage={options.perPage}
        rowsPerPage={options.rowsPerPage}
        handleDelete={handleDeleteCategory}
        handleOnPageChange={handleOnPageChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
        handleFilter={handleOnFilterChange}
      />
    </Box>
  );
};
