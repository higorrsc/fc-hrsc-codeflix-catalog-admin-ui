import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  Category,
  CategoryParams,
  Result,
  Results,
} from '../../types/Category';
import { apiSlice } from '../api/apiSlice';

const endpointUrl = '/categories';

function parseQueryParams(params: CategoryParams) {
  const queryParams = new URLSearchParams();

  if (params.page) {
    queryParams.append('page', params.page.toString());
  }
  if (params.perPage) {
    queryParams.append('per_page', params.perPage.toString());
  }
  if (params.search) {
    queryParams.append('search', params.search);
  }
  if (params.isActive !== undefined) {
    queryParams.append('is_active', params.isActive.toString());
  }

  return queryParams.toString();
}

function createCategoryMutation(category: Category) {
  return {
    url: endpointUrl,
    method: 'POST',
    body: category,
  };
}

function deleteCategoryMutation(category: Category) {
  return {
    url: `${endpointUrl}/${category.id}`,
    method: 'DELETE',
  };
}

function getCategories({ page = 1, perPage = 10, search = '' }) {
  const params = { page, perPage, search, isActive: true };
  return `${endpointUrl}?${parseQueryParams(params)}`;
}

function getCategoryById({ id }: { id: string }) {
  return `${endpointUrl}/${id}`;
}

function updateCategoryMutation(category: Category) {
  return {
    url: `${endpointUrl}/${category.id}`,
    method: 'PUT',
    body: category,
  };
}

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    createCategory: mutation<Result, Category>({
      query: createCategoryMutation,
      invalidatesTags: ['Categories'],
    }),
    deleteCategory: mutation<Result, { id: string }>({
      query: deleteCategoryMutation,
      invalidatesTags: ['Categories'],
    }),
    getCategories: query<Results, CategoryParams>({
      query: getCategories,
      providesTags: ['Categories'],
    }),
    getCategoryById: query<Result, { id: string }>({
      query: getCategoryById,
      providesTags: ['Categories'],
    }),
    updateCategory: mutation<Result, Category>({
      query: updateCategoryMutation,
      invalidatesTags: ['Categories'],
    }),
  }),
});

export const emptyCategory: Category = {
  id: '',
  name: '',
  description: '',
  is_active: false,
  deleted_at: null,
  created_at: '',
  updated_at: '',
};

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
    createCategory(state, action) {
      state.push(action.payload);
    },
    updateCategory(state, action) {
      const index = state.findIndex(
        (category) => category.id === action.payload.id
      );
      state[index] = action.payload;
    },
    deleteCategory(state, action) {
      const index = state.findIndex(
        (category) => category.id === action.payload.id
      );
      state.splice(index, 1);
    },
  },
});

export const selectCategories = (state: RootState) => state.categories;
export const selectCategoryById = (state: RootState, id: string) => {
  const category = state.categories.find((category) => category.id === id);
  return category || emptyCategory;
};

export default categoriesSlice.reducer;
export const { createCategory, updateCategory, deleteCategory } =
  categoriesSlice.actions;

export const {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} = categoriesApiSlice;
