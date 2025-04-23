import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { GenreForm } from './GenreForm';

const Props = {
  genre: {
    id: '1',
    name: 'Categoria Teste',
    is_active: true,
    deleted_at: null,
    created_at: '2025-04-23T21:00:00.000000Z',
    updated_at: '2025-04-23T21:00:00.000000Z',
    categories: [],
    pivot: {
      genre_id: '1',
      category_id: '1',
    },
  },
  isDisable: false,
  isLoading: false,
  handleSubmit: jest.fn(),
  handleChange: jest.fn(),
  // handleToggle: jest.fn(),
};

describe('Test GenreForm', () => {
  it('should render GenreForm correctly', () => {
    const { asFragment } = render(<GenreForm {...Props} />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render GenreForm with loading state correctly', () => {
    const { asFragment } = render(<GenreForm {...Props} isLoading />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render GenreForm with disabled state correctly', () => {
    const { asFragment } = render(<GenreForm {...Props} isDisabled />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render GenreForm with disabled state and loading state correctly', () => {
    const { asFragment } = render(
      <GenreForm {...Props} isDisabled isLoading />,
      {
        wrapper: BrowserRouter,
      }
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
