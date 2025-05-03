import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import { SnackbarProvider } from 'notistack';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { setupStore, type AppStore, type RootState } from '../app/store';
import { KeycloakProvider } from '../providers/KeycloakProvider';
// As a basic setup, import your same slice reducers

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
  initialEntries?: string[];
  routePath?: string;
}

export function renderWithProviders(
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {}
) {
  const {
    preloadedState,
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    initialEntries,
    routePath,
    ...renderOptions
  } = extendedRenderOptions;

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>
      <KeycloakProvider>
        <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
      </KeycloakProvider>
    </Provider>
  );

  let finalUi = ui;
  if (initialEntries) {
    const elementInsideRouter = routePath ? (
      <Routes>
        <Route path={routePath} element={ui}></Route>
      </Routes>
    ) : (
      ui
    );
    finalUi = (
      <MemoryRouter initialEntries={initialEntries}>
        {elementInsideRouter}
      </MemoryRouter>
    );
  } else {
    finalUi = <BrowserRouter>{ui}</BrowserRouter>;
  }

  // Return an object with the store and all of RTL's query functions
  return {
    store,
    ...render(finalUi, { wrapper: Wrapper, ...renderOptions }),
  };
}

export * from '@testing-library/react';
