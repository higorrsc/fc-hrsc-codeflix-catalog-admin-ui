import { GridFilterModel } from '@mui/x-data-grid';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CategoryTable } from './CategoryTable';

const Props = {
  data: {
    data: [
      {
        id: '1',
        name: 'Teste',
        description: 'Teste',
        is_active: true,
        deleted_at: '',
        created_at: '2025-04-18T21:00:00.000000Z',
        updated_at: '2025-04-18T21:00:00.000000Z',
      },
    ],
    links: {
      first: 'http://localhost:8000/api/categories?page=1',
      next: '',
      prev: '',
      last: 'http://localhost:8000/api/categories?page=1',
    },
    meta: {
      from: 1,
      to: 1,
      path: 'http://localhost:8000/api/categories',
      total: 1,
      per_page: 1,
      current_page: 1,
      last_page: 1,
    },
  },
  page: 1,
  perPage: 10,
  rowsPerPage: [10, 25, 50],
  isFetching: false,
  handleDelete: (id: string) => {},
  handleFilter: (filterModel: GridFilterModel) => {},
  handleOnPageChange: (page: number) => {},
  handleOnPageSizeChange: (perPage: number) => {},
};

describe('Test CategoryTable', () => {
  it('should render CategoryTable correctly', () => {
    const { asFragment } = render(<CategoryTable {...Props} />, {
      wrapper: BrowserRouter,
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render CategoryTable with loading', () => {
    const { asFragment } = render(
      <CategoryTable {...Props} isFetching={true} />,
      {
        wrapper: BrowserRouter,
      }
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render CategoryTable with empty data', () => {
    const { asFragment } = render(
      <CategoryTable
        {...Props}
        data={{ data: [], links: {}, meta: {} } as any}
      />,
      {
        wrapper: BrowserRouter,
      }
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render CategoryTable with correct description', () => {
    const { asFragment } = render(
      <CategoryTable
        {...Props}
        data={{
          data: [{ ...Props.data.data[0], description: 'Nova descrição' }],
          links: { ...Props.data.links },
          meta: { ...Props.data.meta },
        }}
      />,
      {
        wrapper: BrowserRouter,
      }
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render CategoryTable with correct status', () => {
    const { asFragment } = render(
      <CategoryTable
        {...Props}
        data={{
          data: [{ ...Props.data.data[0], is_active: false }],
          links: { ...Props.data.links },
          meta: { ...Props.data.meta },
        }}
      />,
      {
        wrapper: BrowserRouter,
      }
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
