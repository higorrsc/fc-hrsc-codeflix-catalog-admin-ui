import { http, HttpResponse } from 'msw';
import { baseUrl } from '../features/api/apiSlice';
import { categoryResponse } from '../features/categories/mocks';

export const handlers = [
  http.get(`${baseUrl}/categories`, () => {
    return HttpResponse.json(categoryResponse);
  }),
];
