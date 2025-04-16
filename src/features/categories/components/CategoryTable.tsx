import { GridFilterModel } from '@mui/x-data-grid';
import { Results } from '../../../types/Category';

type Props = {
  data: Results | undefined;
  perPage: number;
  rowsPerPage?: number;
  isFetching: boolean;
  handleDelete: (id: string) => void;
  handleFilter: (filterModel: GridFilterModel) => void;
  handleOnPageChange: (page: number) => void;
  handleOnPageSizeChange: (perPage: number) => void;
};

export function CategoryTable({
  data,
  perPage,
  rowsPerPage,
  isFetching,
  handleDelete,
  handleFilter,
  handleOnPageChange,
  handleOnPageSizeChange,
}: Props) {
  return <div>CategoryTable</div>;
}
