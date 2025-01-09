import { format } from 'date-fns';
export const useDateFormatter = () => {
  // MMMM Do, YYYY
  const longFormat = (date: Date) => format(date, 'MMMM Do, yyyy');
  // MM/DD/YYYY
  const shortFormat = (date: Date) => format(date, 'MM/DD/YYYY');

  return { longFormat, shortFormat };
};
