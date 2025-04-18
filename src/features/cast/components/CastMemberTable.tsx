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
import { Results } from '../../../types/CastMember';
import { getCastMemberTypeOptions } from '../../../utils/CastMember';

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

export function CastMemberTable({
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
      field: 'type',
      headerName: 'Type',
      flex: 1,
      renderCell: renderTypeCell,
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
        to={`/cast-members/edit/${rowData.id}`}
      >
        <Typography color='primary'>{rowData.value}</Typography>
      </Link>
    );
  }

  function renderActionCell(rowData: GridRenderCellParams) {
    return (
      <IconButton color='secondary' onClick={() => handleDelete(rowData.value)}>
        <DeleteIcon />
      </IconButton>
    );
  }

  function renderTypeCell(rowData: GridRenderCellParams) {
    const options = getCastMemberTypeOptions();
    const selectedOption = options.find(
      (option) => option.value === rowData.value
    );
    return (
      <Typography color='primary'>
        {selectedOption ? selectedOption.label : 'Unknown'}
      </Typography>
    );
  }

  function mapDataToGridRows(data: Results) {
    const { data: castMembers } = data;
    return castMembers.map((castMember) => ({
      id: castMember.id,
      name: castMember.name,
      type: castMember.type,
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
