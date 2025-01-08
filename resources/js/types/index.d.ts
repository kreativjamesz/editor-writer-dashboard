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
  image: string;
  title: string;
  link: string;
  date: string;
  content: string;
  status: 'For Edit' | 'Published';
  writer: User;
  editor?: User;
  company: Company;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  auth: {
    user: User;
  };
};
