import { render } from '@testing-library/react';
import { Page } from './Page';

describe('Test Page', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <Page title='Test'>
        <div>Hello, World!</div>
      </Page>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
