import { handlers as castMemberHandlers } from '../features/cast/mocks/handlers';
import { handlers as categoryHandlers } from '../features/categories/mocks/handlers';

export const handlers = [...categoryHandlers, ...castMemberHandlers];
