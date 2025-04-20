import { renderWithProviders } from '../../utils/test-utils';
import { EditCastMember } from './EditCastMember';

describe('Test EditCastMember page', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(<EditCastMember />);
    expect(asFragment()).toMatchSnapshot();
  });
});
