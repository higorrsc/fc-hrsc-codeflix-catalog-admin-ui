import { http, HttpResponse } from 'msw';
import { baseUrl } from '../../config/defaults';
import { server } from '../../mocks/server';
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from '../../utils/test-utils';
import { CreateGenre } from './CreateGenre';

describe('Test CreateGenre page', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(<CreateGenre />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should handle submit', async () => {
    renderWithProviders(<CreateGenre />);
    const name = screen.getByTestId('name-input');
    const isActive = screen.getByTestId('is-active-input');
    const submit = screen.getByRole('button', { name: 'Save' });

    fireEvent.change(name, { target: { value: 'Test Name' } });
    fireEvent.click(isActive);
    fireEvent.click(submit);

    await waitFor(() => {
      const successMessage = screen.getByText('Genre created successfully!');
      expect(successMessage).toBeInTheDocument();
    });
  });

  it('should handle submit error', async () => {
    server.use(
      http.post(`${baseUrl}/genres`, ({ request, params, cookies }) => {
        return new HttpResponse(null, {
          status: 500,
        });
      })
    );
    renderWithProviders(<CreateGenre />);
    const name = screen.getByTestId('name-input');
    const submit = screen.getByRole('button', { name: 'Save' });

    fireEvent.change(name, { target: { value: 'Test Name' } });
    fireEvent.click(submit);

    await waitFor(() => {
      const errorMessage = screen.getByText('Error creating Genre!');
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
