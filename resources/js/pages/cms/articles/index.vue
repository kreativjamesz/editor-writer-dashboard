<template>
  <div>
    <h1>CMS Articles Page</h1>
    <Table class="w-full border">
      <TableCaption>List of companies articles</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Link</TableHead>
          <TableHead>Publish Date</TableHead>
          <TableHead>Content</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="article in articles" :key="article.id">
          <TableCell>{{ article.title }}</TableCell>
          <TableCell><img :src="article.image" alt="Article Image" /></TableCell>
          <TableCell><a :href="article.link">Link</a></TableCell>
          <TableCell>{{ article.publishDate }}</TableCell>
          <TableCell>{{ article.content }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useArticles } from '@/composables/useArticles';

const { fetchArticles } = useArticles();
const articles = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    articles.value = await fetchArticles();
  } catch (err) {
    error.value = err;
    console.error('Error loading articles:', err);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped></style>
