import { Results as CategoriesResults } from '../../types/Category';
import {
  Genre,
  GenreParams,
  GenrePayload,
  Result,
  Results,
} from '../../types/Genre';
import { apiSlice } from '../api/apiSlice';

export const initialState: Genre = {
  id: '',
  name: '',
  is_active: false,
  deleted_at: '',
  created_at: '',
  updated_at: '',
  categories: [],
  pivot: {
    genre_id: '',
    category_id: '',
  },
};

const endpointUrl = '/genres';

function parseQueryParams(params: GenreParams) {
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

function getAllCategories() {
  return `categories?all=true`;
}

function createGenreMutation(data: GenrePayload) {
  return {
    url: endpointUrl,
    method: 'POST',
    body: data,
  };
}

function getGenreById({ id }: { id: string }) {
  return `${endpointUrl}/${id}`;
}

function getGenres({ page = 1, perPage = 10, search = '' }: GenreParams) {
  const params = { page, perPage, search };
  return `${endpointUrl}?${parseQueryParams(params)}`;
}

function deleteGenre({ id }: { id: string }) {
  return {
    url: `${endpointUrl}/${id}`,
    method: 'DELETE',
  };
}

function updateGenre(data: GenrePayload) {
  return {
    url: `${endpointUrl}/${data.id}`,
    method: 'PUT',
    body: data,
  };
}

export const genreApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getAllCategories: query<CategoriesResults, void>({
      query: getAllCategories,
    }),
    createGenre: mutation<Genre, GenrePayload>({
      query: createGenreMutation,
      invalidatesTags: ['Genres'],
    }),
    deleteGenre: mutation<Genre, { id: string }>({
      query: deleteGenre,
      invalidatesTags: ['Genres'],
    }),
    getGenreById: query<Result, { id: string }>({
      query: getGenreById,
      providesTags: ['Genres'],
    }),
    getGenres: query<Results, GenreParams>({
      query: getGenres,
      providesTags: ['Genres'],
    }),
    updateGenre: mutation<Genre, GenrePayload>({
      query: updateGenre,
      invalidatesTags: ['Genres'],
    }),
  }),
});

export const {
  useCreateGenreMutation,
  useDeleteGenreMutation,
  useGetAllCategoriesQuery,
  useGetGenreByIdQuery,
  useGetGenresQuery,
  useUpdateGenreMutation,
} = genreApiSlice;
