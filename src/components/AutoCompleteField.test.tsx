import { render } from '@testing-library/react';
import { Category } from 'src/features/category/types';
import { AutoCompleteField } from './AutoCompleteField';

describe('Test AutoCompleteField component', () => {
  const categories: Category[] = [
    {
      id: '9e871d7b-1113-4523-a624-d7f9ad7c2d97',
      name: 'Cornsilk',
      description: 'Dolorem consequatur rem voluptatem facere.',
      is_active: true,
      deleted_at: null,
      created_at: '2025-04-20T16:55:45+0000',
      updated_at: '2025-04-20T16:55:45+0000',
    },
    {
      id: '4306234a-6753-4c88-ae60-ad97b0cf8bec',
      name: 'NavajoWhite',
      description: 'Similique architecto voluptatem reprehenderit in quis.',
      is_active: true,
      deleted_at: null,
      created_at: '2025-04-21T19:02:06+0000',
      updated_at: '2025-04-21T19:02:06+0000',
    },
    {
      id: '0c2f1a91-a9b2-4d20-989e-7f3d97fc86fd',
      name: 'SaddleBrown',
      description: 'Dicta quia nemo dicta et quibusdam.',
      is_active: true,
      deleted_at: null,
      created_at: '2025-04-21T19:02:06+0000',
      updated_at: '2025-04-21T19:02:06+0000',
    },
  ];

  it('should render the component with loading', () => {
    const { asFragment } = render(
      <AutoCompleteField
        name='category'
        label='Category'
        value={categories}
        options={categories}
        isDisabled={false}
        isLoading
        handleChange={() => {}}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
