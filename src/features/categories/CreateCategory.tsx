import { Box, Paper, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { Category, createCategory, emptyCategory } from './categorySlice';
import { CategoryForm } from './components/CategoryForm';

export const CreateCategory = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [categoryState, setCategoryState] = useState<Category>(emptyCategory);
  const dispatch = useAppDispatch();
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
    dispatch(createCategory(categoryState));
    enqueueSnackbar('Category created successfully!', { variant: 'success' });
  }

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
