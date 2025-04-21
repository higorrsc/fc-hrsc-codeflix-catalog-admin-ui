import { http, HttpResponse } from 'msw';
import { categoryResponse, categoryResponsePage2 } from '.';
import { baseUrl } from '../../api/apiSlice';

export const handlers = [
  http.get(`${baseUrl}/categories`, ({ request, params, cookies }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page');
    if (page === '2') {
      return HttpResponse.json(categoryResponsePage2);
    }
    return HttpResponse.json(categoryResponse);
  }),
  http.get(`${baseUrl}/categories/:id`, ({ request, params, cookies }) => {
    const { id } = params;
    if (id !== '9e871d7b-1113-4523-a624-d7f9ad7c2d97') {
      return new HttpResponse(null, { status: 404 });
    }
    console.log(`MSW intercept id ${id}`);
    const category = categoryResponse.data.find((cat) => cat.id === id);
    return HttpResponse.json({ data: category });
  }),
  http.delete(`${baseUrl}/categories/:id`, ({ request, params, cookies }) => {
    const { id } = params;
    if (id === '9e871d7b-1113-4523-a624-d7f9ad7c2d97') {
      return new HttpResponse(null, { status: 204 });
    }
  }),
  http.post(`${baseUrl}/categories`, ({ request, params, cookies }) => {
    return new HttpResponse(null, { status: 201 });
  }),
  http.put(
    `${baseUrl}/categories/9e871d7b-1113-4523-a624-d7f9ad7c2d97`,
    ({ request, params, cookies }) => {
      return new HttpResponse(null, { status: 200 });
    }
  ),
];
