import {
  Result,
  Results,
  Video,
  VideoParams,
  VideoPayload,
} from '../../types/Video';
import { parseQueryParams } from '../../utils/queryParams';

import { apiSlice } from '../api/apiSlice';

export const initialState: Video = {
  id: '',
  title: '',
  description: '',
  year_launched: 0,
  opened: false,
  rating: '',
  duration: 0,
  deleted_at: '',
  created_at: '',
  updated_at: '',
  genres: [],
  categories: [],
  cast_members: [],
  thumb_file_url: '',
  banner_file_url: '',
  trailer_file_url: '',
  video_file_url: '',
};

const endpointUrl = '/videos';

// function getAllCategories() {
//   return `categories?all=true`;
// }

// function getAllGenres() {
//   return `genres?all=true`;
// }

// function getAllCastMembers() {
//   return `cast_members?all=true`;
// }

// function createVideoMutation(data: VideoPayload) {
//   return {
//     url: endpointUrl,
//     method: 'POST',
//     body: data,
//   };
// }

function getVideoById({ id }: { id: string }) {
  return `${endpointUrl}/${id}`;
}

function getVideos({ page = 1, perPage = 10 }: VideoParams) {
  const params = { page, perPage };
  return `${endpointUrl}?${parseQueryParams(params)}`;
}

function deleteVideo({ id }: { id: string }) {
  return {
    url: `${endpointUrl}/${id}`,
    method: 'DELETE',
  };
}

function updateVideo(data: VideoPayload) {
  return {
    url: `${endpointUrl}/${data.id}`,
    method: 'PUT',
    body: data,
  };
}

export const videoApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    // getAllCategories: query<CategoriesResults, void>({
    //   query: getAllCategories,
    // }),
    // getAllCastMembers: query<CastMemberResults, void>({
    //   query: getAllCastMembers,
    // }),
    // getAllGenres: query<GenreResults, void>({
    //   query: getAllGenres,
    // }),
    // createVideo: mutation<Video, VideoPayload>({
    //   query: createVideoMutation,
    //   invalidatesTags: ['Videos'],
    // }),
    deleteVideo: mutation<Video, { id: string }>({
      query: deleteVideo,
      invalidatesTags: ['Videos'],
    }),
    getVideoById: query<Result, { id: string }>({
      query: getVideoById,
      providesTags: ['Videos'],
    }),
    getVideos: query<Results, VideoParams>({
      query: getVideos,
      providesTags: ['Videos'],
    }),
    updateVideo: mutation<Result, VideoPayload>({
      query: updateVideo,
      invalidatesTags: ['Videos'],
    }),
  }),
});

export const {
  useDeleteVideoMutation,
  useGetVideoByIdQuery,
  useGetVideosQuery,
  useUpdateVideoMutation,
} = videoApiSlice;
