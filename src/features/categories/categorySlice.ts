import {
  Category,
  CategoryParams,
  Result,
  Results,
} from '../../types/Category';
import { apiSlice } from '../api/apiSlice';

export const emptyCategory: Category = {
  id: '',
  name: '',
  description: '',
  is_active: false,
  deleted_at: null,
  created_at: '',
  updated_at: '',
};

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

export const {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} = categoriesApiSlice;
