import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../config/defaults';
import { keycloak } from '../../keycloakConfig';

export const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: ['Categories', 'CastMembers', 'Genres', 'Videos'],
  endpoints: (builder) => ({}),
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      if (keycloak.token) {
        headers.set('authorization', `Bearer ${keycloak.token}`);
      }
      return headers;
    },
  }),
});
