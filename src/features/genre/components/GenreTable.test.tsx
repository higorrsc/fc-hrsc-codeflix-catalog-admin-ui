import { GridFilterModel } from '@mui/x-data-grid';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { genreResponse } from '../mocks';
import { GenreTable } from './GenreTable';

const Props = {
  data: genreResponse,
  page: 1,
  perPage: 10,
  rowsPerPage: [10, 25, 50],
  isFetching: false,
  handleDelete: (id: string) => {},
  handleFilter: (filterModel: GridFilterModel) => {},
  handleOnPageChange: (page: number) => {},
  handleOnPageSizeChange: (perPage: number) => {},
};

describe('Test GenreTable', () => {
  it('should render GenreTable correctly', () => {
    const { asFragment } = render(<GenreTable {...Props} />, {
      wrapper: BrowserRouter,
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render GenreTable with loading', () => {
    const { asFragment } = render(<GenreTable {...Props} isFetching={true} />, {
      wrapper: BrowserRouter,
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render GenreTable with empty data', () => {
    const { asFragment } = render(
      <GenreTable {...Props} data={{ data: [], links: {}, meta: {} } as any} />,
      {
        wrapper: BrowserRouter,
      }
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render GenreTable with correct status', () => {
    const { asFragment } = render(
      <GenreTable
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

  it('should render GenreTable with delete button', () => {
    const { asFragment } = render(
      <GenreTable
        {...Props}
        data={{
          data: [{ ...Props.data.data[0], is_active: false }],
          links: { ...Props.data.links },
          meta: { ...Props.data.meta },
        }}
        handleDelete={jest.fn()}
        handleFilter={jest.fn()}
        handleOnPageChange={jest.fn()}
        handleOnPageSizeChange={jest.fn()}
      />,
      {
        wrapper: BrowserRouter,
      }
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
