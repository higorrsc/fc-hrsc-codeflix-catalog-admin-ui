import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import { ThemeProvider } from '@mui/system';
import { configureStore } from '@reduxjs/toolkit';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';
import type { RootState } from '../app/store';
import { appTheme } from '../config/theme';
import { apiSlice } from '../features/api/apiSlice';
import { castMembersApiSlice } from '../features/cast/castMemberSlice';
import { categoriesApiSlice } from '../features/categories/categorySlice';
// As a basic setup, import your same slice reducers

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: ReturnType<typeof configureStore>;
}

export function renderWithProviders(
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {}
) {
  const {
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: {
        [categoriesApiSlice.reducerPath]: apiSlice.reducer,
        // @ts-ignore
        [castMembersApiSlice.reducerPath]: apiSlice.reducer,
      },
      // Adding the api middleware enables caching, invalidation, polling,
      // and other useful features of `rtk-query`.
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    }),
    ...renderOptions
  } = extendedRenderOptions;

  const Wrapper = ({ children }: PropsWithChildren) => (
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider theme={appTheme}>
            <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );

  // Return an object with the store and all of RTL's query functions
  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
