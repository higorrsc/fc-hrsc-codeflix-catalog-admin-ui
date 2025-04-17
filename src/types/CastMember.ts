import { Links, Meta } from './_shared';

export enum CastMemberType {
  ACTOR = 1,
  DIRECTOR = 2,
}

export interface Results {
  data: CastMember[];
  links: Links;
  meta: Meta;
}

export interface Result {
  data: CastMember;
  links: Links;
  meta: Meta;
}

export interface CastMember {
  id: string;
  name: string;
  type: CastMemberType;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CastMemberParams {
  page?: number;
  perPage?: number;
  search?: string;
  type?: CastMemberType;
}
