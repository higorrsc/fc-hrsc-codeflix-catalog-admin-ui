import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { renderWithProviders, screen } from '../../utils/test-utils';
import { baseUrl } from '../api/apiSlice';
import { ListCategory } from './ListCategory';
import { categoryResponse } from './mocks';

export const handlers = [
  http.get(`${baseUrl}/categories`, () => {
    return HttpResponse.json(categoryResponse);
  }),
];

const server = setupServer(...handlers);

describe('Test ListCategory page', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(<ListCategory />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render loading state', () => {
    renderWithProviders(<ListCategory />);
    const loading = screen.getByRole('progressbar');
    expect(loading).toBeInTheDocument();
  });
});
