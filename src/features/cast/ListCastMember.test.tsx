import '@testing-library/jest-dom';
import { renderWithProviders } from '../../utils/test-utils';
import { ListCastMember } from './ListCastMember';

describe('Test ListCastMember page', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(<ListCastMember />);
    expect(asFragment()).toMatchSnapshot();
  });
});
