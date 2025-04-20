import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Layout } from './Layout';

describe('Test Layout', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <Layout children={<div>Hello, World!</div>} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
