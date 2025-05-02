import { http, HttpResponse } from 'msw';
import { baseUrl } from '../../config/defaults';
import { server } from '../../mocks/server';
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from '../../utils/test-utils';
import { ListCategory } from './ListCategory';

describe('Test ListCategory page', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(<ListCategory />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render loading state', () => {
    renderWithProviders(<ListCategory />);
    const loading = screen.getByRole('progressbar');
    expect(loading).toBeInTheDocument();
  });

  it('should render success state', async () => {
    renderWithProviders(<ListCategory />);
    await waitFor(() => {
      const name = screen.getByText('Cornsilk');
      expect(name).toBeInTheDocument();
    });
  });

  it('should render error state', async () => {
    server.use(
      http.get(`${baseUrl}/categories`, () => {
        return new HttpResponse(null, {
          status: 500,
        });
      })
    );
    renderWithProviders(<ListCategory />);
    await waitFor(() => {
      const errorMessage = screen.getByText('Error fetching categories.');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('should handle on page change', async () => {
    renderWithProviders(<ListCategory />);
    await waitFor(() => {
      const name = screen.getByText('Cornsilk');
      expect(name).toBeInTheDocument();
    });

    const nextButton = screen.getByTestId('KeyboardArrowRightIcon');
    fireEvent.click(nextButton);

    await waitFor(() => {
      const name = screen.getByText('BlueViolet');
      expect(name).toBeInTheDocument();
    });
  });

  it('should handle filter categories', async () => {
    renderWithProviders(<ListCategory />);
    await waitFor(() => {
      const name = screen.getByText('Cornsilk');
      expect(name).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText('Search…');
    fireEvent.change(input, { target: { value: 'Saddle' } });

    await waitFor(() => {
      const name = screen.getByText('SaddleBrown');
      expect(name).toBeInTheDocument();
    });
  });

  it('should handle delete category success', async () => {
    renderWithProviders(<ListCategory />);
    await waitFor(() => {
      const name = screen.getByText('Cornsilk');
      expect(name).toBeInTheDocument();
    });

    const deleteButton = screen.getAllByTestId('delete-category-button')[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      const successMessage = screen.getByText('Success deleting category!');
      expect(successMessage).toBeInTheDocument();
    });
  });

  it('should handle delete category error', async () => {
    server.use(
      http.delete(
        `${baseUrl}/categories/:id`,
        ({ request, params, cookies }) => {
          const { id } = params;
          if (id === '9e871d7b-1113-4523-a624-d7f9ad7c2d97') {
            return new HttpResponse(null, {
              status: 500,
            });
          }
        }
      )
    );

    renderWithProviders(<ListCategory />);
    await waitFor(() => {
      const name = screen.getByText('Cornsilk');
      expect(name).toBeInTheDocument();
    });

    const deleteButton = screen.getAllByTestId('delete-category-button')[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      const errorMessage = screen.getByText('Error deleting category!');
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
