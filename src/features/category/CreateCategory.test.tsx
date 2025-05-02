import { http, HttpResponse } from 'msw';
import { baseUrl } from '../../config/defaults';
import { server } from '../../mocks/server';
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from '../../utils/test-utils';
import { CreateCategory } from './CreateCategory';

describe('Test CreateCategory page', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(<CreateCategory />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should handle submit', async () => {
    renderWithProviders(<CreateCategory />);
    const name = screen.getByTestId('name-input');
    const description = screen.getByTestId('description-input');
    const isActive = screen.getByTestId('is-active-input');
    const submit = screen.getByRole('button', { name: 'Save' });

    fireEvent.change(name, { target: { value: 'Test Name' } });
    fireEvent.change(description, { target: { value: 'Test Description' } });
    fireEvent.click(isActive);
    fireEvent.click(submit);

    await waitFor(() => {
      const successMessage = screen.getByText('Category created successfully!');
      expect(successMessage).toBeInTheDocument();
    });
  });

  it('should handle submit error', async () => {
    server.use(
      http.post(`${baseUrl}/categories`, ({ request, params, cookies }) => {
        return new HttpResponse(null, {
          status: 500,
        });
      })
    );
    renderWithProviders(<CreateCategory />);
    const name = screen.getByTestId('name-input');
    const description = screen.getByTestId('description-input');
    const submit = screen.getByRole('button', { name: 'Save' });

    fireEvent.change(name, { target: { value: 'Test Name' } });
    fireEvent.change(description, { target: { value: 'Test Description' } });
    fireEvent.click(submit);

    await waitFor(() => {
      const errorMessage = screen.getByText('Error creating category!');
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
