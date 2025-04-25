import { Category } from '../types/Category';
import { Genre } from '../types/Genre';

export const mapGenreToForm = (genre: Genre) => {
  return {
    id: genre.id,
    name: genre.name,
    is_active: genre?.is_active,
    categories_id: genre.categories?.map((category: Category) => category.id),
  };
};
