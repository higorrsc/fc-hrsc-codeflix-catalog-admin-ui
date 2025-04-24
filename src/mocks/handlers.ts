import { handlers as castMemberHandlers } from '../features/cast/mocks/handlers';
import { handlers as categoryHandlers } from '../features/category/mocks/handlers';
import { handlers as genreHandlers } from '../features/genre/mocks/handlers';

export const handlers = [
  ...categoryHandlers,
  ...castMemberHandlers,
  ...genreHandlers,
];
