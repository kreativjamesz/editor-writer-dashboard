import { useApi } from './useApi';

export function useArticles() {
  const api = useApi();

  const fetchArticles = async (status?: string) => {
    try {
      const endpoint = status ? `/articles?status=${status}` : '/articles';
      const articles = await api.get(endpoint);
      return articles;
    } catch (error) {
      console.error('Error fetching articles:', error);
      throw error;
    }
  };

  return {
    fetchArticles,
  };
}
