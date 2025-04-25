import {
  Category,
  CategoryParams,
  Result,
  Results,
} from '../../types/Category';
import { parseQueryParams } from '../../utils/queryParams';
import { apiSlice } from '../api/apiSlice';

export const initialState: Category = {
  id: '',
  name: '',
  description: '',
  is_active: false,
  deleted_at: null,
  created_at: '',
  updated_at: '',
};

const endpointUrl = '/categories';

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

function getCategories({
  page = 1,
  perPage = 10,
  search = '',
}: CategoryParams) {
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

export const categoryApiSlice = apiSlice.injectEndpoints({
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

export const {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} = categoryApiSlice;
