import { createAsyncThunk } from '@reduxjs/toolkit';
import { UploadState } from '../../types/Upload';
import { setUploadProgress } from './uploadSlice';

export const updateVideo = createAsyncThunk(
  'uploads/uploadVideo',
  async ({ videoId, id, file, field }: UploadState, thunkAPI) => {
    const onUploadProgress = (progressEvent: ProgressEvent) => {
      thunkAPI.dispatch(setUploadProgress({ id, progress: 0 }));
    };
    try {
      const params = { videoId, id, file, field, onUploadProgress };
      // const response = await uploadService(params)
      // return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
