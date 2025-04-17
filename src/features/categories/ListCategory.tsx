import { Box, Button } from '@mui/material';
import { GridFilterModel } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from './categorySlice';
import { CategoryTable } from './components/CategoryTable';

export const ListCategory = () => {
  const { data, isFetching, error } = useGetCategoriesQuery();
  const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();

  const [rowsPerPage, setRowsPerPage] = useState([10, 25, 50, 100]);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState('');

  const { enqueueSnackbar } = useSnackbar();

  async function handleDeleteCategory(id: string) {
    await deleteCategory({ id });
  }

  function handleOnPageChange(page: number) {
    console.log(page);
  }

  function handleOnPageSizeChange(perPage: number) {
    console.log(perPage);
  }

  function handleOnFilterChange(filterModel: GridFilterModel) {
    console.log(filterModel);
  }

  useEffect(() => {
    if (deleteCategoryStatus.isSuccess) {
      enqueueSnackbar('Success deleting category!', { variant: 'success' });
    }
    if (deleteCategoryStatus.error) {
      enqueueSnackbar('Error deleting category!', { variant: 'error' });
    }
  }, [deleteCategoryStatus, enqueueSnackbar]);

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
        perPage={perPage}
        rowsPerPage={rowsPerPage}
        handleDelete={handleDeleteCategory}
        handleOnPageChange={handleOnPageChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
        handleFilter={handleOnFilterChange}
      />
    </Box>
  );
};
