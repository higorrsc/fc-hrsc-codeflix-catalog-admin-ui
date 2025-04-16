import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, IconButton, Typography } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowsProp,
  GridToolbar,
} from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { deleteCategory, selectCategories } from './categorySlice';

export const ListCategory = () => {
  const categories = useAppSelector(selectCategories);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const componentProps = {
    toolbar: {
      showQuickFilter: true,
    },
  };

  const rows: GridRowsProp = categories.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    isActive: category.is_active,
    createAt: new Date(category.created_at).toLocaleDateString('pt-BR'),
  }));

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

  function handleDelete(id: string) {
    dispatch(deleteCategory(id));
    enqueueSnackbar('Category deleted successfully!', { variant: 'success' });
  }

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

  return (
    <Box maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
      <Box display='flex' justifyContent='flex-end'>
        <Button
          variant='contained'
          color='secondary'
          component={Link}
          to='/categories/create'
          style={{ marginBottom: '1rem' }}
        >
          New Category
        </Button>
      </Box>
      <Box sx={{ display: 'flex', height: 600 }}>
        <DataGrid
          columns={columns}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          disableRowSelectionOnClick
          pageSizeOptions={[2, 10, 20, 50, 100]}
          rows={rows}
          slotProps={componentProps}
          slots={{ toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};
