import { ListOptions } from '../types/_shared';

export const initialOptions: ListOptions = {
  page: 1,
  perPage: 10,
  rowsPerPage: [10, 25, 50, 100],
  search: '',
};

export const drawerWidth: number = 240;

export const baseUrl: string = 'http://localhost:8000/api';
