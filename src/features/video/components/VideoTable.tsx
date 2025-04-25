import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Chip, IconButton, Tooltip, Typography } from '@mui/material';
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
import { Results } from '../../../types/Video';

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

export function VideoTable({
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
      field: 'title',
      headerName: 'Title',
      flex: 1,
      renderCell: renderNameCell,
    },
    {
      field: 'genres',
      headerName: 'Genres',
      flex: 1,
      renderCell: renderArrayToChipCell,
    },
    {
      field: 'categories',
      headerName: 'Categories',
      flex: 1,
      renderCell: renderArrayToChipCell,
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
        to={`/videos/edit/${rowData.id}`}
      >
        <Typography color='primary'>{rowData.value}</Typography>
      </Link>
    );
  }

  function renderArrayToChipCell(rowData: GridRenderCellParams) {
    const chips = rowData.value;
    const firstsChips = chips.slice(0, 2);
    const remainChips = chips.length - firstsChips.length;

    return (
      <Box>
        {firstsChips.map((chip: any, index: number) => (
          <Chip
            sx={{ fontSize: '0.6rem', marginRight: 1 }}
            key={index}
            label={chip.name}
          />
        ))}
        {remainChips > 0 && (
          <Tooltip title={chips.map((chip: any) => chip.name).join(', ')}>
            <Chip
              sx={{ fontSize: '0.6rem', marginRight: 1 }}
              label={`+${remainChips}`}
            />
          </Tooltip>
        )}
      </Box>
    );
  }

  function renderActionCell(rowData: GridRenderCellParams) {
    return (
      <IconButton
        color='secondary'
        onClick={() => handleDelete(rowData.value)}
        data-testid='delete-video-button'
      >
        <DeleteIcon />
      </IconButton>
    );
  }

  function mapDataToGridRows(data: Results) {
    const { data: videos } = data;
    return videos.map((video) => ({
      id: video.id,
      title: video.title,
      genres: video.genres,
      categories: video.categories,
      createAt: new Date(video.created_at).toLocaleDateString('pt-BR'),
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
