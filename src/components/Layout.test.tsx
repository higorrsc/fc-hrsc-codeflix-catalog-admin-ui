import { renderWithProviders } from '../utils/test-utils';
import { Layout } from './Layout';

describe('Test Layout', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(
      <Layout children={<div>Hello, World!</div>} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
