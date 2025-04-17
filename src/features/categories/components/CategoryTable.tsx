import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton, Typography } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  GridRenderCellParams,
  GridRowsProp,
  GridToolbar,
} from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Results } from '../../../types/Category';

type Props = {
  data: Results | undefined;
  page: number;
  perPage: number;
  rowsPerPage?: number[];
  isFetching: boolean;
  handleDelete: (id: string) => void;
  handleFilter: (filterModel: GridFilterModel) => void;
  handleOnPageChange: (page: number) => void;
  handleOnPageSizeChange: (perPage: number) => void;
};

export function CategoryTable({
  data,
  page,
  perPage,
  rowsPerPage,
  isFetching,
  handleDelete,
  handleFilter,
  handleOnPageChange,
  handleOnPageSizeChange,
}: Props) {
  const componentProps = {
    toolbar: {
      showQuickFilter: true,
    },
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      renderCell: renderNameCell,
    },
    {
      field: 'isActive',
      headerName: 'Active',
      flex: 1,
      type: 'boolean',
      renderCell: renderIsActiveCell,
    },
    {
      field: 'createAt',
      headerName: 'Create At',
      flex: 1,
    },
    {
      field: 'id',
      headerName: 'Actions',
      type: 'string',
      flex: 1,
      renderCell: renderActionCell,
    },
  ];

  const rows: GridRowsProp = data ? mapDataToGridRows(data) : [];

  const rowCount = data?.meta.total || 0;

  function renderNameCell(rowData: GridRenderCellParams) {
    return (
      <Link
        style={{ textDecoration: 'none' }}
        to={`/categories/edit/${rowData.id}`}
      >
        <Typography color='primary'>{rowData.value}</Typography>
      </Link>
    );
  }

  function renderIsActiveCell(rowData: GridRenderCellParams) {
    return (
      <Typography color={rowData.value ? 'primary' : 'secondary'}>
        {rowData.value ? 'Active' : 'Inactive'}
      </Typography>
    );
  }

  function renderActionCell(rowData: GridRenderCellParams) {
    return (
      <IconButton color='secondary' onClick={() => handleDelete(rowData.value)}>
        <DeleteIcon />
      </IconButton>
    );
  }

  function mapDataToGridRows(data: Results) {
    const { data: categories } = data;
    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      description: category.description,
      isActive: category.is_active,
      createAt: new Date(category.created_at).toLocaleDateString('pt-BR'),
    }));
  }

  const handlePaginationModelChange = (
    newPaginationModel: GridPaginationModel
  ) => {
    handleOnPageChange(newPaginationModel.page);
    handleOnPageSizeChange(newPaginationModel.pageSize);
  };

  return (
    <Box sx={{ display: 'flex', height: 600 }}>
      <DataGrid
        columns={columns}
        rows={rows}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        disableRowSelectionOnClick
        pageSizeOptions={rowsPerPage}
        paginationModel={{ page, pageSize: perPage }}
        paginationMode='server'
        filterMode='server'
        loading={isFetching}
        rowCount={rowCount}
        slotProps={componentProps}
        slots={{ toolbar: GridToolbar }}
        onFilterModelChange={handleFilter}
        onPaginationModelChange={handlePaginationModelChange}
      />
    </Box>
  );
}
