import { parseQueryParams } from '../../utils/queryParams';
import { apiSlice } from '../api/apiSlice';
import { CastMember, CastMemberParams, Result, Results } from './types';

const endpointUrl = '/cast_members';

export const initialState: CastMember = {
  id: '',
  name: '',
  type: 1,
  created_at: '',
  updated_at: '',
  deleted_at: '',
};

function createCastMember(castMember: CastMember) {
  return {
    url: endpointUrl,
    method: 'POST',
    body: castMember,
  };
}

function deleteCastMember({ id }: { id: string }) {
  return {
    url: `${endpointUrl}/${id}`,
    method: 'DELETE',
  };
}

function getCastMembers({
  page = 1,
  perPage = 10,
  search,
  type,
}: CastMemberParams) {
  const params = { page, perPage, search, type };
  return `${endpointUrl}?${parseQueryParams(params)}`;
}

function getCastMemberById({ id }: { id: string }) {
  return `${endpointUrl}/${id}`;
}

function updateCastMember(castMember: CastMember) {
  return {
    url: `${endpointUrl}/${castMember.id}`,
    method: 'PUT',
    body: castMember,
  };
}

export const castMemberApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    createCastMember: mutation<Result, CastMember>({
      query: createCastMember,
      invalidatesTags: ['CastMembers'],
    }),
    getCastMemberById: query<Result, { id: string }>({
      query: getCastMemberById,
      providesTags: ['CastMembers'],
    }),
    getCastMembers: query<Results, CastMemberParams>({
      query: getCastMembers,
      providesTags: ['CastMembers'],
    }),
    deleteCastMember: mutation<Result, { id: string }>({
      query: deleteCastMember,
      invalidatesTags: ['CastMembers'],
    }),
    updateCastMember: mutation<Result, CastMember>({
      query: updateCastMember,
      invalidatesTags: ['CastMembers'],
    }),
  }),
});

export const {
  useCreateCastMemberMutation,
  useDeleteCastMemberMutation,
  useGetCastMemberByIdQuery,
  useGetCastMembersQuery,
  useUpdateCastMemberMutation,
} = castMemberApiSlice;
