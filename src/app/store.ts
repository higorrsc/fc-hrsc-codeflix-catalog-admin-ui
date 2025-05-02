import {
  Action,
  combineReducers,
  configureStore,
  PreloadedState,
  ThunkAction,
} from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import { authSlice } from '../features/auth/authSlice';
import { castMemberApiSlice } from '../features/cast/castMemberSlice';
import { categoryApiSlice } from '../features/category/categorySlice';
import { genreApiSlice } from '../features/genre/genreSlice';
import { uploadReducer } from '../features/upload/uploadSlice';
import { videoApiSlice } from '../features/video/videoSlice';
import { uploadQueue } from '../middleware/uploadQueue';

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  // @ts-ignore
  [categoryApiSlice.reducerPath]: apiSlice.reducer,
  // @ts-ignore
  [castMemberApiSlice.reducerPath]: apiSlice.reducer,
  // @ts-ignore
  [genreApiSlice.reducerPath]: apiSlice.reducer,
  // @ts-ignore
  [videoApiSlice.reducerPath]: apiSlice.reducer,
  // @ts-ignore
  uploadSlice: uploadReducer,
  // @ts-ignore
  auth: authSlice.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['upload/addUpload", "upload/setUploadProgress'],
          ignoredPaths: ['uploadSlice.path'],
        },
      })
        .prepend(uploadQueue.middleware)
        .concat(apiSlice.middleware),
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
