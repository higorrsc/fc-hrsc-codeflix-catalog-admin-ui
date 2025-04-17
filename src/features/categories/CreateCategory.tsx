import { Box, Paper, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Category } from '../../types/Category';
import { emptyCategory, useCreateCategoryMutation } from './categorySlice';
import { CategoryForm } from './components/CategoryForm';

export const CreateCategory = () => {
  const [createCategory, status] = useCreateCategoryMutation();
  const [isDisabled, setIsDisabled] = useState(false);
  const [categoryState, setCategoryState] = useState<Category>(emptyCategory);

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
    await createCategory(categoryState);
  }

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar('Category created successfully!', { variant: 'success' });
      setIsDisabled(true);
    }
    if (status.error) {
      enqueueSnackbar('Error creating category!', { variant: 'error' });
    }
  }, [status, enqueueSnackbar]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant='h4'>Create Category</Typography>
          </Box>
        </Box>
        <CategoryForm
          category={categoryState}
          isDisabled={isDisabled}
          isLoading={false}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleToggle={handleToggle}
        />
      </Paper>
    </Box>
  );
};
