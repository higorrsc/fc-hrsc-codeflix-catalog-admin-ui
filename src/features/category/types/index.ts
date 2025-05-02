import { Links, Meta } from '../../../types/_shared';

export interface Results {
  data: Category[];
  links: Links;
  meta: Meta;
}

export interface Result {
  data: Category;
  links: Links;
  meta: Meta;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CategoryParams {
  page?: number;
  perPage?: number;
  search?: string;
  isActive?: boolean;
}
