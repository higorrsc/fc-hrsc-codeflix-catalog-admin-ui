import { Category } from '../../category/types';
import { Genre } from '../types';

export const mapGenreToForm = (genre: Genre) => {
  return {
    id: genre.id,
    name: genre.name,
    is_active: genre?.is_active,
    categories_id: genre.categories?.map((category: Category) => category.id),
  };
};
