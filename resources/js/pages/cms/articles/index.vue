<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">{{ userRole }}'s Article Dashboard</h1>

    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-2">Articles For Edit</h2>
      <div v-if="articlesForEdit.length === 0" class="text-zinc-500">No articles for edit.</div>
      <div v-else-if="loading">Loading...</div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card
          v-for="article in articlesForEdit"
          :key="article.id"
          class="bg-white dark:bg-zinc-800 shadow-md rounded-lg overflow-hidden flex flex-col justify-between transition-all hover:shadow-md hover:scale-105 cursor-pointer"
        >
          <CardContent class="p-4">
            <div class="image">
              <img :src="article.image" alt="Article Image" class="w-full h-48 object-cover" />
            </div>
            <div class="content">
              <h3 class="text-lg font-bold truncate">{{ article.title }}</h3>
              <p class="text-zinc-700 dark:text-zinc-400 text-xs">{{ article.content }}</p>
              <!-- <a :href="article.link" class="text-teal-500 hover:underline">Read more</a> -->
              <!-- <p class="text-sm text-zinc-500 mt-2">Publish Date: {{ article.published_date }}</p> -->
            </div>
          </CardContent>
          <CardFooter class="p-4 flex justify-end">
            <div class="flex flex-row items-center justify-between w-full">
              <a :href="article.link" class="text-teal-500 hover:underline">
                <Button variant="link" class="dark:text-zinc-200 p-1">Read more</Button>
              </a>
              <router-link :to="`/cms/articles/edit/${article.id}`" class="btn btn-primary">
                <Button class="dark:bg-teal-800 dark:hover:bg-zinc-700 dark:text-zinc-200">Edit</Button>
              </router-link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </section>

    <section>
      <h2 class="text-xl font-semibold mb-2">Published Articles</h2>
      <div v-if="publishedArticles.length === 0" class="text-zinc-500">No published articles.</div>
      <div v-else-if="loading">Loading...</div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card
          v-for="article in publishedArticles"
          :key="article.id"
          class="bg-white dark:bg-zinc-800 shadow-md rounded-lg overflow-hidden flex flex-col justify-between transition-all hover:shadow-md hover:scale-105 cursor-pointer"
        >
          <img :src="article.image" alt="Article Image" class="w-full h-48 object-cover" />
          <div class="p-4">
            <h3 class="text-lg font-bold truncate">{{ article.title }}</h3>
            <p class="text-zinc-700 dark:text-zinc-400 truncate">{{ article.content }}</p>
            <a :href="article.link" class="text-teal-500 hover:underline">Read more</a>
          </div>
          <hr />
          <p class="p-4 text-sm text-zinc-500 dark:text-teal-400 mt-2">Publish Date: {{ article.published_date }}</p>
        </Card>
      </div>
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
const loading = ref(true);
const error = ref(null);

const authStore = useAuthStore();
const userRole = computed(() => authStore.user?.type || 'Guest');

const loadArticles = async () => {
  loading.value = true;
  try {
    articlesForEdit.value = await fetchArticles('For Edit');
    publishedArticles.value = await fetchArticles('Published');
  } catch (err) {
    error.value = err;
    console.error('Error loading articles:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadArticles();
});
console.log('publishedArticles', publishedArticles);
</script>

<style scoped></style>
