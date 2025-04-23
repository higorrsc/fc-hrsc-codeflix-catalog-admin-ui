import { Genre, GenreParams, GenrePayload } from '../../types/Genre';
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

function createGenreMutation(data: GenrePayload) {
  return {
    url: endpointUrl,
    method: 'POST',
    body: data,
  };
}

export const genreApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    createGenre: mutation<Genre, GenrePayload>({
      query: createGenreMutation,
      invalidatesTags: ['Genres'],
    }),
  }),
});

export const { useCreateGenreMutation } = genreApiSlice;
