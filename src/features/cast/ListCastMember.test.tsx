import { http, HttpResponse } from 'msw';
import { server } from '../../mocks/server';
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from '../../utils/test-utils';
import { baseUrl } from '../api/apiSlice';
import { ListCastMember } from './ListCastMember';

describe('Test ListCastMember page', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(<ListCastMember />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render loading state', () => {
    renderWithProviders(<ListCastMember />);
    const loading = screen.getByRole('progressbar');
    expect(loading).toBeInTheDocument();
  });

  it('should render success state', async () => {
    renderWithProviders(<ListCastMember />);
    await waitFor(() => {
      const name = screen.getByText('Koch');
      expect(name).toBeInTheDocument();
    });
  });

  it('should render error state', async () => {
    server.use(
      http.get(`${baseUrl}/cast_members`, () => {
        return new HttpResponse(null, {
          status: 500,
        });
      })
    );
    renderWithProviders(<ListCastMember />);
    await waitFor(() => {
      const errorMessage = screen.getByText('Error fetching cast members.');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('should handle on page change', async () => {
    renderWithProviders(<ListCastMember />);
    await waitFor(() => {
      const name = screen.getByText('Koch');
      expect(name).toBeInTheDocument();
    });

    const nextButton = screen.getByTestId('KeyboardArrowRightIcon');
    fireEvent.click(nextButton);

    await waitFor(() => {
      const name = screen.getByText('Goyette');
      expect(name).toBeInTheDocument();
    });
  });

  it('should handle filter categories', async () => {
    renderWithProviders(<ListCastMember />);
    await waitFor(() => {
      const name = screen.getByText('Koch');
      expect(name).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText('Search…');
    fireEvent.change(input, { target: { value: 'Har' } });

    await waitFor(() => {
      const name = screen.getByText('Harvey');
      expect(name).toBeInTheDocument();
    });
  });

  it('should handle delete cast member success', async () => {
    renderWithProviders(<ListCastMember />);
    await waitFor(() => {
      const name = screen.getByText('Koch');
      expect(name).toBeInTheDocument();
    });

    const deleteButton = screen.getAllByTestId('delete-cast-member-button')[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      const successMessage = screen.getByText('Success deleting cast member!');
      expect(successMessage).toBeInTheDocument();
    });
  });

  it('should handle delete cast member error', async () => {
    server.use(
      http.delete(
        `${baseUrl}/cast_members/:id`,
        ({ request, params, cookies }) => {
          const { id } = params;
          if (id === 'ab7b1108-8346-472c-84cd-605c59760c87') {
            return new HttpResponse(null, {
              status: 500,
            });
          }
        }
      )
    );

    renderWithProviders(<ListCastMember />);
    await waitFor(() => {
      const name = screen.getByText('Koch');
      expect(name).toBeInTheDocument();
    });

    const deleteButton = screen.getAllByTestId('delete-cast-member-button')[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      const errorMessage = screen.getByText('Error deleting cast member!');
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
