import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CastMemberForm } from './CastMemberForm';

const Props = {
  castMember: {
    id: '1',
    name: 'Teste',
    type: 1,
    deleted_at: null,
    created_at: '2025-04-18T21:00:00.000000Z',
    updated_at: '2025-04-18T21:00:00.000000Z',
  },
  isDisable: false,
  isLoading: false,
  handleSubmit: jest.fn(),
  handleChange: jest.fn(),
};

describe('Test CastMemberForm', () => {
  it('should render CastMemberForm correctly', () => {
    const { asFragment } = render(<CastMemberForm {...Props} />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
