import { http, HttpResponse } from 'msw';
import { baseUrl } from '../../config/defaults';
import { server } from '../../mocks/server';
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from '../../utils/test-utils';
import { ListGenre } from './ListGenre';

describe('Test ListGenre page', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(<ListGenre />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render loading state', () => {
    renderWithProviders(<ListGenre />);
    const loading = screen.getByRole('progressbar');
    expect(loading).toBeInTheDocument();
  });

  it('should render success state', async () => {
    renderWithProviders(<ListGenre />);
    await waitFor(() => {
      const name = screen.getByText('Saint Lucia');
      expect(name).toBeInTheDocument();
    });
  });

  it('should render error state', async () => {
    server.use(
      http.get(`${baseUrl}/genres`, () => {
        return new HttpResponse(null, {
          status: 500,
        });
      })
    );
    renderWithProviders(<ListGenre />);
    await waitFor(() => {
      const errorMessage = screen.getByText('Error fetching genres.');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('should handle on page change', async () => {
    renderWithProviders(<ListGenre />);
    await waitFor(() => {
      const name = screen.getByText('Saint Lucia');
      expect(name).toBeInTheDocument();
    });

    const nextButton = screen.getByTestId('KeyboardArrowRightIcon');
    fireEvent.click(nextButton);

    await waitFor(() => {
      const name = screen.getByText('Bulgaria');
      expect(name).toBeInTheDocument();
    });
  });

  it('should handle filter genres', async () => {
    renderWithProviders(<ListGenre />);
    await waitFor(() => {
      const name = screen.getByText('Saint Lucia');
      expect(name).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText('Search…');
    fireEvent.change(input, { target: { value: 'Tuv' } });

    await waitFor(() => {
      const name = screen.getByText('Tuvalu');
      expect(name).toBeInTheDocument();
    });
  });

  it('should handle delete genre success', async () => {
    renderWithProviders(<ListGenre />);
    await waitFor(() => {
      const name = screen.getByText('Saint Lucia');
      expect(name).toBeInTheDocument();
    });

    const deleteButton = screen.getAllByTestId('delete-genre-button')[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      const successMessage = screen.getByText('Success deleting genre!');
      expect(successMessage).toBeInTheDocument();
    });
  });

  it('should handle delete genre error', async () => {
    server.use(
      http.delete(`${baseUrl}/genres/:id`, ({ request, params, cookies }) => {
        const { id } = params;
        if (id === '56250310-7ff5-4346-a95d-76e26f7d4509') {
          return new HttpResponse(null, {
            status: 500,
          });
        }
      })
    );

    renderWithProviders(<ListGenre />);
    await waitFor(() => {
      const name = screen.getByText('Saint Lucia');
      expect(name).toBeInTheDocument();
    });

    const deleteButton = screen.getAllByTestId('delete-genre-button')[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      const errorMessage = screen.getByText('Error deleting genre!');
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
