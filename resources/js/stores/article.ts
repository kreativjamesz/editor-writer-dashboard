import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useArticles } from '@/composables/useArticles';
import type { PaginatedResponse, Article } from '@/types';

const { fetchArticles } = useArticles();

export const useArticleStore = defineStore('article', () => {
  const articlesForEdit = ref<Article[]>([]);
  const articlesPublished = ref<Article[]>([]);
  const pageForEdit = ref(1);
  const pagePublished = ref(1);
  const hasMoreForEdit = ref(true);
  const hasMorePublished = ref(true);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const loadArticles = async (status: string, page: number) => {
    loading.value = true;
    try {
      const response: PaginatedResponse<Article> = await fetchArticles(status, page);
      if (status === 'For Edit') {
        articlesForEdit.value.push(...response.data);
        hasMoreForEdit.value = response.meta.current_page < response.meta.last_page;
      } else {
        articlesPublished.value.push(...response.data);
        hasMorePublished.value = response.meta.current_page < response.meta.last_page;
      }
    } catch (err) {
      error.value = err;
      console.error('Error loading articles:', err);
    } finally {
      loading.value = false;
    }
  };

  const loadMore = (status: string) => {
    if (status === 'For Edit') {
      pageForEdit.value++;
      loadArticles('For Edit', pageForEdit.value);
    } else {
      pagePublished.value++;
      loadArticles('Published', pagePublished.value);
    }
  };

  return {
    articlesForEdit,
    articlesPublished,
    hasMoreForEdit,
    hasMorePublished,
    loadArticles,
    loadMore,
    loading,
    error,
  };
});
