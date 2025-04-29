import { Links, Meta } from './_shared';
import { CastMember } from './CastMember';
import { Category } from './Category';
import { Genre } from './Genre';

export interface Results {
  data: Video[];
  links: Links;
  meta: Meta;
}

export interface Result {
  data: Video;
  links: Links;
  meta: Meta;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  year_launched: number;
  opened: boolean;
  rating: string;
  duration: number;
  deleted_at?: string | null;
  created_at: string;
  updated_at: string;
  genres?: Genre[];
  categories?: Category[];
  cast_members?: CastMember[];
  thumb_file_url: string;
  banner_file_url: string;
  trailer_file_url: string;
  video_file_url: string;
}

export interface VideoParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface VideoPayload {
  id: string;
  title: string;
  description: string;
  year_launched: number;
  opened: boolean;
  rating: string;
  duration: number;
  genres_id?: string[];
  categories_id?: string[];
  cast_members_id?: string[];
}

export interface FileObject {
  name: string;
  file: File;
}
