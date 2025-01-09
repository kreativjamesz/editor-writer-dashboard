import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useApi } from '@/composables/useApi';

export const useArticleStore = defineStore('article', () => {
  const articles = ref([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const api = useApi();

  const fetchArticles = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.get('/articles');
      articles.value = response.data;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch articles';
    } finally {
      loading.value = false;
    }
  };

  return {
    articles,
    loading,
    error,
    fetchArticles,
  };
});
