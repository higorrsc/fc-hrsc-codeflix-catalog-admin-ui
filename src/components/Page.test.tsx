import { render } from '@testing-library/react';
import { Page } from './Page';

describe('Test Layout', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <Page title='Test'>
        <div>Hello, World!</div>
      </Page>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
