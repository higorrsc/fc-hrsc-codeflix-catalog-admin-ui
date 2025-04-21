import { http, HttpResponse } from 'msw';
import { server } from '../../mocks/server';
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from '../../utils/test-utils';
import { baseUrl } from '../api/apiSlice';
import { EditCategory } from './EditCategory';
import { categoryResponse } from './mocks';

const categoryToEditId = categoryResponse.data[0].id;
const categoryToEditName = categoryResponse.data[0].name;
const routePath = '/categories/edit/:id';
const initialRoute = `/categories/edit/${categoryToEditId}`;

describe('Test EditCategory page', () => {
  it('should render correctly', async () => {
    const { asFragment } = renderWithProviders(<EditCategory />, {
      initialEntries: [initialRoute],
      routePath: routePath,
    });
    await waitFor(() => {
      const nameInput = screen.getByTestId('name-input');
      expect(nameInput).toHaveValue(categoryToEditName);
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('should handle submit', async () => {
    renderWithProviders(<EditCategory />, {
      initialEntries: [initialRoute],
      routePath: routePath,
    });
    await waitFor(() => {
      const nameInput = screen.getByTestId('name-input') as HTMLInputElement;
      expect(nameInput.value).toBe(categoryToEditName);
    });

    const name = screen.getByTestId('name-input');
    const description = screen.getByTestId('description-input');
    const isActive = screen.getByTestId('is-active-input');
    const submit = screen.getByRole('button', { name: /Save/i });

    fireEvent.change(name, { target: { value: 'Test Name' } });
    fireEvent.change(description, { target: { value: 'Test Description' } });
    fireEvent.click(isActive);
    fireEvent.click(submit);

    await waitFor(() => {
      const successMessage = screen.getByText('Category updated successfully!');
      expect(successMessage).toBeInTheDocument();
    });
  });

  it('should handle submit error', async () => {
    server.use(
      http.put(
        `${baseUrl}/categories/9e871d7b-1113-4523-a624-d7f9ad7c2d97`,
        ({ request, params, cookies }) => {
          return new HttpResponse(null, {
            status: 500,
          });
        }
      )
    );
    renderWithProviders(<EditCategory />, {
      initialEntries: [initialRoute],
      routePath: routePath,
    });
    await waitFor(() => {
      const nameInput = screen.getByTestId('name-input') as HTMLInputElement;
      expect(nameInput.value).toBe(categoryToEditName);
    });

    const name = screen.getByTestId('name-input');
    const description = screen.getByTestId('description-input');
    const isActive = screen.getByTestId('is-active-input');
    const submit = screen.getByRole('button', { name: /Save/i });

    fireEvent.change(name, { target: { value: 'Test Name' } });
    fireEvent.change(description, { target: { value: 'Test Description' } });
    fireEvent.click(isActive);
    fireEvent.click(submit);

    await waitFor(() => {
      const errorMessage = screen.getByText('Error updating category!');
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
