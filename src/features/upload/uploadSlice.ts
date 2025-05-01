import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UploadState {
  id: string;
  videoId: string;
  field: string;
  file: File;
  progress?: number;
  status?: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: UploadState[] = [];

const uploadSlice = createSlice({
  name: 'uploads',
  initialState,
  reducers: {
    addUpload: (state, action: PayloadAction<UploadState>) => {
      state.push({ ...action.payload, status: 'idle', progress: 0 });
    },
    removeUpload: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((upload) => upload.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { addUpload, removeUpload } = uploadSlice.actions;

export const uploadReducer = uploadSlice.reducer;
