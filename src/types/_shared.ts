export interface Links {
  first: string;
  next: string;
  prev: string;
  last: string;
}

export interface Meta {
  from: number;
  to: number;
  path: string;
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}
