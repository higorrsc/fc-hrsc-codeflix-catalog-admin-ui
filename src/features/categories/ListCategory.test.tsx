import { renderWithProviders } from '../../utils/test-utils';
import { ListCategory } from './ListCategory';

describe('Test ListCategory page', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(<ListCategory />);
    expect(asFragment()).toMatchSnapshot();
  });
});
