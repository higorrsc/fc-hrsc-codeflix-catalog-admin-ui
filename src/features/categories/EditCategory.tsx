import { Box, Paper, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Category } from '../../types/Category';
import {
  emptyCategory,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from './categorySlice';
import { CategoryForm } from './components/CategoryForm';

export const EditCategory = () => {
  const id = useParams().id || '';
  const { data: category, isFetching } = useGetCategoryByIdQuery({ id });

  const [categoryState, setCategoryState] = useState<Category>(emptyCategory);
  const [updateCategory, status] = useUpdateCategoryMutation();

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoryState({ ...categoryState, [name]: value });
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCategoryState({ ...categoryState, [name]: checked });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await updateCategory(categoryState);
  }

  useEffect(() => {
    if (category) {
      setCategoryState(category.data);
    }
    if (status.isSuccess) {
      enqueueSnackbar('Category updated successfully!', { variant: 'success' });
    }
    if (status.error) {
      enqueueSnackbar('Error updating category!', { variant: 'error' });
    }
  }, [category, status, enqueueSnackbar]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant='h4'>Edit Category</Typography>
          </Box>
        </Box>
        <CategoryForm
          category={categoryState}
          isDisabled={status.isLoading}
          isLoading={isFetching}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleToggle={handleToggle}
        />
      </Paper>
    </Box>
  );
};
