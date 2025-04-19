import { GridFilterModel } from '@mui/x-data-grid';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CastMemberType } from '../../../types/CastMember';
import { CastMemberTable } from './CastMemberTable';

const Props = {
  data: {
    data: [
      {
        id: '1',
        name: 'Teste',
        type: CastMemberType.DIRECTOR,
        deleted_at: '',
        created_at: '2025-04-18T21:00:00.000000Z',
        updated_at: '2025-04-18T21:00:00.000000Z',
      },
    ],
    links: {
      first: 'http://localhost:8000/api/cast_members?page=1',
      next: '',
      prev: '',
      last: 'http://localhost:8000/api/cast_members?page=1',
    },
    meta: {
      from: 1,
      to: 1,
      path: 'http://localhost:8000/api/cast_members',
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

describe('Test CastMemberTable', () => {
  it('should render CastMemberTable correctly', () => {
    const { asFragment } = render(<CastMemberTable {...Props} />, {
      wrapper: BrowserRouter,
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render CastMemberTable with loading', () => {
    const { asFragment } = render(
      <CastMemberTable {...Props} isFetching={true} />,
      {
        wrapper: BrowserRouter,
      }
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render CastMemberTable with empty data', () => {
    const { asFragment } = render(
      <CastMemberTable
        {...Props}
        data={{ data: [], links: {}, meta: {} } as any}
      />,
      {
        wrapper: BrowserRouter,
      }
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render CastMemberTable with correct type', () => {
    const { asFragment } = render(
      <CastMemberTable
        {...Props}
        data={{
          data: [{ ...Props.data.data[0], type: CastMemberType.ACTOR }],
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
