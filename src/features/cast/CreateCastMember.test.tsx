import { renderWithProviders } from '../../utils/test-utils';
import { CreateCastMember } from './CreateCastMember';

describe('Test CreateCastMember page', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(<CreateCastMember />);
    expect(asFragment()).toMatchSnapshot();
  });
});
