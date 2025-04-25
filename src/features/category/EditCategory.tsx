import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Page } from '../../components/Page';
import { Category } from '../../types/Category';
import {
  initialState,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from './categorySlice';
import { CategoryForm } from './components/CategoryForm';

export const EditCategory = () => {
  const id = useParams().id || '';
  const { data: category, isFetching } = useGetCategoryByIdQuery({ id });

  const [categoryState, setCategoryState] = useState<Category>(initialState);
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
    <Page title='Edit Category'>
      <CategoryForm
        category={categoryState}
        isDisabled={status.isLoading}
        isLoading={isFetching}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleToggle={handleToggle}
      />
    </Page>
  );
};
