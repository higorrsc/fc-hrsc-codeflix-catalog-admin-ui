import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CategoryForm } from './CategoryForm';

const Props = {
  category: {
    id: '1',
    name: 'Categoria Teste',
    description: 'Descrição da categoria',
    is_active: true,
    deleted_at: null,
    created_at: '2025-04-18T21:00:00.000000Z',
    updated_at: '2025-04-18T21:00:00.000000Z',
  },
  isDisable: false,
  isLoading: false,
  handleSubmit: jest.fn(),
  handleChange: jest.fn(),
  handleToggle: jest.fn(),
};

describe('Test CategoryForm', () => {
  it('should render CategoryForm correctly', () => {
    const { asFragment } = render(<CategoryForm {...Props} />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render CategoryForm with loading state correctly', () => {
    const { asFragment } = render(<CategoryForm {...Props} isLoading />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render CategoryForm with disabled state correctly', () => {
    const { asFragment } = render(<CategoryForm {...Props} isDisabled />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render CategoryForm with disabled state and loading state correctly', () => {
    const { asFragment } = render(
      <CategoryForm {...Props} isDisabled isLoading />,
      {
        wrapper: BrowserRouter,
      }
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
