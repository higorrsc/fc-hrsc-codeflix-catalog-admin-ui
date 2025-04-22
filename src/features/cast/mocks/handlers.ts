import { http, HttpResponse } from 'msw';
import { castMemberResponse, castMemberResponsePage2 } from '.';
import { baseUrl } from '../../api/apiSlice';

export const handlers = [
  http.get(`${baseUrl}/cast_members`, ({ request, params, cookies }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page');
    if (page === '2') {
      return HttpResponse.json(castMemberResponsePage2);
    }
    return HttpResponse.json(castMemberResponse);
  }),
  http.get(`${baseUrl}/cast_members/:id`, ({ request, params, cookies }) => {
    const { id } = params;
    if (id !== 'ab7b1108-8346-472c-84cd-605c59760c87') {
      return new HttpResponse(null, { status: 404 });
    }
    const castMember = castMemberResponse.data.find((cast) => cast.id === id);
    return HttpResponse.json({ data: castMember });
  }),
  http.delete(`${baseUrl}/cast_members/:id`, ({ request, params, cookies }) => {
    const { id } = params;
    if (id === 'ab7b1108-8346-472c-84cd-605c59760c87') {
      return new HttpResponse(null, { status: 204 });
    }
  }),
  http.post(`${baseUrl}/cast_members`, ({ request, params, cookies }) => {
    return new HttpResponse(null, { status: 201 });
  }),
  http.put(
    `${baseUrl}/cast_members/ab7b1108-8346-472c-84cd-605c59760c87`,
    ({ request, params, cookies }) => {
      return new HttpResponse(null, { status: 200 });
    }
  ),
];
