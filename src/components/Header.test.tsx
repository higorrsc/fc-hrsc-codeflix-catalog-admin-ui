import { render } from '@testing-library/react';
import { Header } from './Header';

describe('Test Header', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <Header theme={'dark'} toggleTheme={() => {}} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
