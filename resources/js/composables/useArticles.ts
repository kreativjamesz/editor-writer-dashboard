import { useApi } from './useApi';

export function useArticles() {
  const api = useApi();

  const fetchArticles = async () => {
    try {
      const articles = await api.get('/articles');
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
