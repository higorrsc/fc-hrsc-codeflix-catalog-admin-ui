import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface Category {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

const category: Category = {
  id: 'ebf62d5c-12e5-57a0-947a-f6c72068f1f1',
  name: 'Olive',
  description: 'Earum quo at dolor tempore nisi.',
  is_active: true,
  deleted_at: null,
  created_at: '2022-08-15T10:59:09+0000',
  updated_at: '2022-08-15T10:59:09+0000',
};

export const initialState = [
  category,
  {
    ...category,
    id: 'a728fcc0-ced8-5155-84f7-a6ed95de2a3b',
    name: 'Peach',
  },
  {
    ...category,
    id: 'dd8b13e3-ba7d-5fca-a810-54c03b5ba475',
    name: 'Apple',
  },
  {
    ...category,
    id: '623ef24b-e179-5dc2-b95d-2a3cd4bfe561',
    name: 'Banana',
    is_active: false,
  },
];

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    createCategory() {},
    updateCategory() {},
    deleteCategory() {},
  },
});

export const selectCategories = (state: RootState) => state.categories;

export default categoriesSlice.reducer;
