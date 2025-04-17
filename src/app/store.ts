import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import { castMembersApiSlice } from '../features/cast/castMemberSlice';
import { categoriesApiSlice } from '../features/categories/categorySlice';

export const store = configureStore({
  reducer: {
    [categoriesApiSlice.reducerPath]: apiSlice.reducer,
    // @ts-ignore
    [castMembersApiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
