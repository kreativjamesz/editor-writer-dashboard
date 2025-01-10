<template>
  <div class="p-6">
    <h1 class="text-6xl font-bold mb-4">{{ userRole }}'s Articles</h1>
    <Separator label="✍️" class="mb-8 bg-teal-500" />
    <section class="mb-8">
      <div class="flex items-center justify-between">
        <h2 class="text-3xl font-extrabold mb-2">Articles For Edit</h2>
        <Button @click="createArticle" class="dark:bg-teal-800 dark:text-zinc-200 ml-4">Create</Button>
      </div>
      <div v-if="articlesForEdit.length === 0" class="text-zinc-500">No articles for edit.</div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <ArticleCard
          v-for="(article, index) in articlesForEdit"
          v-motion-fade-in-up
          :key="article.id"
          :article="article"
          :delay="index * 50"
          :isForEdit="true"
          class="bg-white dark:bg-zinc-800 shadow-md rounded-lg overflow-hidden flex flex-col justify-between transition-all hover:shadow-md hover:scale-105 cursor-pointer"
        />
      </div>
      <Button v-if="hasMoreForEdit" @click="loadMore('For Edit')" class="mt-4 dark:bg-teal-800 dark:text-zinc-200">
        Load More
      </Button>
    </section>

    <section>
      <h2 class="text-3xl font-extrabold mb-2">#Published Articles</h2>
      <div v-if="publishedArticles.length === 0" class="text-zinc-500">No published articles.</div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <ArticleCard
          v-for="(article, index) in publishedArticles"
          :key="article.id"
          :article="article"
          v-motion-fade-in-up
          :delay="index * 50"
          :isForEdit="false"
          class="bg-white dark:bg-zinc-800 shadow-md rounded-lg overflow-hidden flex flex-col justify-between transition-all hover:shadow-md hover:scale-105 cursor-pointer"
        />
      </div>
      <Button v-if="hasMorePublished" @click="loadMore('Published')" class="mt-4 dark:bg-teal-800 dark:text-zinc-200">
        Load More
      </Button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useArticles } from '@/composables/useArticles';
import { useAuthStore } from '@/stores/auth'; // Adjust the path as necessary

const { fetchArticles } = useArticles();
const articlesForEdit = ref([]);
const publishedArticles = ref([]);
const pageForEdit = ref(1);
const pagePublished = ref(1);
const hasMoreForEdit = ref(true);
const hasMorePublished = ref(true);
const loading = ref(true);
const error = ref(null);

const authStore = useAuthStore();
const userRole = computed(() => authStore.user?.type || 'Guest');
const router = useRouter();

const createArticle = () => {
  router.push('/cms/articles/create');
};

const loadArticles = async (status: string, page: number) => {
  loading.value = true;
  try {
    const response = await fetchArticles(status, page);
    if (status === 'For Edit') {
      articlesForEdit.value.push(...response.data);
      hasMoreForEdit.value = response.meta.current_page < response.meta.last_page;
    } else {
      publishedArticles.value.push(...response.data);
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

onMounted(() => {
  loadArticles('For Edit', pageForEdit.value);
  loadArticles('Published', pagePublished.value);
});
</script>

<style scoped></style>
