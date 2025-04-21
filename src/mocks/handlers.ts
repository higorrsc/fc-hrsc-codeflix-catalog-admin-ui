import { http, HttpResponse } from 'msw';
import { baseUrl } from '../features/api/apiSlice';
import {
  categoryResponse,
  categoryResponsePage2,
} from '../features/categories/mocks';

export const handlers = [
  http.get(`${baseUrl}/categories`, ({ request, params, cookies }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page');
    if (page === '2') {
      return HttpResponse.json(categoryResponsePage2);
    }
    return HttpResponse.json(categoryResponse);
  }),
];
