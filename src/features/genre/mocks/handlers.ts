import { http, HttpResponse } from 'msw';
import { genreResponse, genreResponsePage2 } from '.';
import { baseUrl } from '../../../config/defaults';

export const handlers = [
  http.get(`${baseUrl}/genres`, ({ request, params, cookies }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page');
    if (page === '2') {
      return HttpResponse.json(genreResponsePage2);
    }
    return HttpResponse.json(genreResponse);
  }),
  http.get(`${baseUrl}/genres/:id`, ({ request, params, cookies }) => {
    const { id } = params;
    if (id !== '56250310-7ff5-4346-a95d-76e26f7d4509') {
      return new HttpResponse(null, { status: 404 });
    }
    const genre = genreResponse.data.find((cat) => cat.id === id);
    return HttpResponse.json({ data: genre });
  }),
  http.delete(`${baseUrl}/genres/:id`, ({ request, params, cookies }) => {
    const { id } = params;
    if (id === '56250310-7ff5-4346-a95d-76e26f7d4509') {
      return new HttpResponse(null, { status: 204 });
    }
  }),
  http.post(`${baseUrl}/genres`, ({ request, params, cookies }) => {
    return new HttpResponse(null, { status: 201 });
  }),
  http.put(
    `${baseUrl}/genres/56250310-7ff5-4346-a95d-76e26f7d4509`,
    ({ request, params, cookies }) => {
      return new HttpResponse(null, { status: 200 });
    }
  ),
];
