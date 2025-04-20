import '@testing-library/jest-dom';
import { renderWithProviders } from '../../utils/test-utils';
import { EditCategory } from './EditCategory';

describe('Test EditCategory page', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(<EditCategory />);
    expect(asFragment()).toMatchSnapshot();
  });
});
