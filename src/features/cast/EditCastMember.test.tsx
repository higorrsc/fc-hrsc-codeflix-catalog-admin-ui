import { http, HttpResponse } from 'msw';
import { baseUrl } from '../../config/defaults';
import { server } from '../../mocks/server';
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from '../../utils/test-utils';
import { EditCastMember } from './EditCastMember';
import { castMemberResponse } from './mocks';

const castMemberToEditId = castMemberResponse.data[0].id;
const castMemberToEditName = castMemberResponse.data[0].name;
const routePath = '/cast_members/edit/:id';
const initialRoute = `/cast_members/edit/${castMemberToEditId}`;

describe('Test EditCastMember page', () => {
  it('should render correctly', async () => {
    const { asFragment } = renderWithProviders(<EditCastMember />, {
      initialEntries: [initialRoute],
      routePath: routePath,
    });
    await waitFor(() => {
      const nameInput = screen.getByTestId('name-input');
      expect(nameInput).toHaveValue(castMemberToEditName);
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('should handle submit', async () => {
    renderWithProviders(<EditCastMember />, {
      initialEntries: [initialRoute],
      routePath: routePath,
    });
    await waitFor(() => {
      const nameInput = screen.getByTestId('name-input') as HTMLInputElement;
      expect(nameInput.value).toBe(castMemberToEditName);
    });

    const name = screen.getByTestId('name-input');
    const submit = screen.getByRole('button', { name: /Save/i });

    fireEvent.change(name, { target: { value: 'Test Name' } });
    fireEvent.click(submit);

    await waitFor(() => {
      const successMessage = screen.getByText(
        'Cast member updated successfully!'
      );
      expect(successMessage).toBeInTheDocument();
    });
  });

  it('should handle submit error', async () => {
    server.use(
      http.put(
        `${baseUrl}/cast_members/ab7b1108-8346-472c-84cd-605c59760c87`,
        ({ request, params, cookies }) => {
          return new HttpResponse(null, {
            status: 500,
          });
        }
      )
    );
    renderWithProviders(<EditCastMember />, {
      initialEntries: [initialRoute],
      routePath: routePath,
    });
    await waitFor(() => {
      const nameInput = screen.getByTestId('name-input') as HTMLInputElement;
      expect(nameInput.value).toBe(castMemberToEditName);
    });

    const name = screen.getByTestId('name-input');
    const submit = screen.getByRole('button', { name: /Save/i });

    fireEvent.change(name, { target: { value: 'Test Name' } });
    fireEvent.click(submit);

    await waitFor(() => {
      const errorMessage = screen.getByText('Error updating cast member!');
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
