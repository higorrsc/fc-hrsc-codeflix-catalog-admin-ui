import { http, HttpResponse } from 'msw';
import { baseUrl } from '../../config/defaults';
import { server } from '../../mocks/server';
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from '../../utils/test-utils';
import { EditGenre } from './EditGenre';
import { genreResponse } from './mocks';

const genreToEditId = genreResponse.data[0].id;
const genreToEditName = genreResponse.data[0].name;
const routePath = '/genres/edit/:id';
const initialRoute = `/genres/edit/${genreToEditId}`;

describe('Test EditGenre page', () => {
  it('should render correctly', async () => {
    const { asFragment } = renderWithProviders(<EditGenre />, {
      initialEntries: [initialRoute],
      routePath: routePath,
    });
    await waitFor(() => {
      const nameInput = screen.getByTestId('name-input');
      expect(nameInput).toHaveValue(genreToEditName);
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('should handle submit', async () => {
    renderWithProviders(<EditGenre />, {
      initialEntries: [initialRoute],
      routePath: routePath,
    });
    await waitFor(() => {
      const nameInput = screen.getByTestId('name-input') as HTMLInputElement;
      expect(nameInput.value).toBe(genreToEditName);
    });

    const name = screen.getByTestId('name-input');
    const submit = screen.getByRole('button', { name: /Save/i });

    fireEvent.change(name, { target: { value: 'Test Name' } });
    fireEvent.click(submit);

    await waitFor(() => {
      const successMessage = screen.getByText('Genre updated successfully!');
      expect(successMessage).toBeInTheDocument();
    });
  });

  it('should handle submit error', async () => {
    server.use(
      http.put(
        `${baseUrl}/genres/56250310-7ff5-4346-a95d-76e26f7d4509`,
        ({ request, params, cookies }) => {
          return new HttpResponse(null, {
            status: 500,
          });
        }
      )
    );
    renderWithProviders(<EditGenre />, {
      initialEntries: [initialRoute],
      routePath: routePath,
    });
    await waitFor(() => {
      const nameInput = screen.getByTestId('name-input') as HTMLInputElement;
      expect(nameInput.value).toBe(genreToEditName);
    });

    const name = screen.getByTestId('name-input');
    const submit = screen.getByRole('button', { name: /Save/i });

    fireEvent.change(name, { target: { value: 'Test Name' } });
    fireEvent.click(submit);

    await waitFor(() => {
      const errorMessage = screen.getByText('Error updating genre!');
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
