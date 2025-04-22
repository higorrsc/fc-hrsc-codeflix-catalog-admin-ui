import { http, HttpResponse } from 'msw';
import { server } from '../../mocks/server';
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from '../../utils/test-utils';
import { baseUrl } from '../api/apiSlice';
import { CreateCastMember } from './CreateCastMember';

describe('Test CreateCastMember page', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(<CreateCastMember />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should handle submit', async () => {
    renderWithProviders(<CreateCastMember />);
    const name = screen.getByTestId('name-input');
    const submit = screen.getByRole('button', { name: 'Save' });

    fireEvent.change(name, { target: { value: 'Test Name' } });
    fireEvent.click(submit);

    await waitFor(() => {
      const successMessage = screen.getByText(
        'Cast member created successfully!'
      );
      expect(successMessage).toBeInTheDocument();
    });
  });

  it('should handle submit error', async () => {
    server.use(
      http.post(`${baseUrl}/cast_members`, ({ request, params, cookies }) => {
        return new HttpResponse(null, {
          status: 500,
        });
      })
    );
    renderWithProviders(<CreateCastMember />);
    const name = screen.getByTestId('name-input');
    const submit = screen.getByRole('button', { name: 'Save' });

    fireEvent.change(name, { target: { value: 'Test Name' } });
    fireEvent.click(submit);

    await waitFor(() => {
      const errorMessage = screen.getByText('Error creating cast member!');
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
