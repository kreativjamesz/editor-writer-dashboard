import { useApi } from './useApi';
import { ref } from 'vue';
import type { Article, PaginatedResponse } from '@/types';

export function useArticles() {
  const api = useApi();
  const articles = ref<Article[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const pagination = ref({
    currentPage: 1,
    totalPages: 1,
    perPage: 10,
    total: 0,
  });

  const fetchArticles = async (
    status?: string,
    page: number = 1,
    perPage: number = 10
  ): Promise<PaginatedResponse<Article>> => {
    loading.value = true;
    error.value = null;

    try {
      const endpoint = `/articles?page=${page}&per_page=${perPage}${status ? `&status=${status}` : ''}`;
      const response = await api.get(endpoint);

      articles.value = response.data;
      pagination.value = {
        currentPage: response.meta.current_page,
        totalPages: response.meta.last_page,
        perPage: response.meta.per_page,
        total: response.meta.total,
      };

      return response;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error fetching articles';
      throw error.value;
    } finally {
      loading.value = false;
    }
  };

  const changePage = async (newPage: number) => {
    return fetchArticles(undefined, newPage, pagination.value.perPage);
  };

  return {
    articles,
    loading,
    error,
    pagination,
    fetchArticles,
    changePage,
  };
}
