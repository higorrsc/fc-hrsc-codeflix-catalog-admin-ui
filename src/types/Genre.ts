import { Links, Meta } from './_shared';
import { Category } from './Category';

export interface Results {
  data: Genre[];
  links: Links;
  meta: Meta;
}

export interface Result {
  data: Genre;
  links: Links;
  meta: Meta;
}

export interface Genre {
  id: string;
  name: string;
  is_active: boolean;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  categories?: Category[];
  pivot?: Pivot;
}

export interface Pivot {
  genre_id: string;
  category_id: string;
}

export interface GenreParams {
  page?: number;
  perPage?: number;
  search?: string;
  isActive?: boolean;
}

export interface GenrePayload {
  id: string;
  name: string;
  is_active: boolean;
  categories_id?: string[];
}
