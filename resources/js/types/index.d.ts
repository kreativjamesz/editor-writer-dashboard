export { default } from 'pagination';

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  type: 'Writer' | 'Editor';
  status: 'Active' | 'Inactive';
}

export interface Company {
  id: number;
  logo: string;
  name: string;
  status: 'Active' | 'Inactive';
}

export interface Article {
  id: number;
  title: string;
  image: string;
  link: string;
  published_date: string;
  content: string;
  status: 'For Edit' | 'Published';
  writer_id: number;
  editor_id: number;
  company_id: number;
  writer?: User;
  editor?: User;
  company?: Company;
}

// Pagination
export interface PaginationLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  links: PaginationLinks;
  meta: PaginationMeta;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  auth: {
    user: User;
  };
};
