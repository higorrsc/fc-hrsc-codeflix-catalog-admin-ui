import {
  CastMember,
  CastMemberParams,
  Result,
  Results,
} from '../../types/CastMember';
import { apiSlice } from '../api/apiSlice';

const endpointUrl = '/cast_members';

export const initialState: CastMember = {
  id: '',
  name: '',
  type: 1,
  created_at: '',
  updated_at: '',
  deleted_at: '',
};

function parseQueryParams(params: CastMemberParams) {
  const query = new URLSearchParams();

  if (params.page) {
    query.append('page', params.page.toString());
  }
  if (params.perPage) {
    query.append('per_page', params.perPage.toString());
  }
  if (params.search) {
    query.append('search', params.search);
  }
  if (params.type) {
    query.append('type', params.type.toString());
  }

  return query.toString();
}

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

function getCastMembers(params: CastMemberParams) {
  const { page = 1, perPage = 10, search, type } = params;
  return `${endpointUrl}?${parseQueryParams({ page, perPage, search, type })}`;
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

export const castMembersApiSlice = apiSlice.injectEndpoints({
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
} = castMembersApiSlice;
