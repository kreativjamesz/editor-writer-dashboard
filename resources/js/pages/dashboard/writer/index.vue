<script setup lang="ts">
import { ref } from 'vue';
import type { Article } from '@/types';

const forEditArticles = ref<Article[]>([]);
const publishedArticles = ref<Article[]>([]);
</script>

<template>
  <DefaultLayout>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-6">Writer's Dashboard</h1>

      <!-- For Edit Articles -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-4">For Edit</h2>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ArticleCard v-for="article in forEditArticles" :key="article.id" :article="article" />
        </div>
      </section>

      <!-- Published Articles -->
      <section>
        <h2 class="text-xl font-semibold mb-4">Published</h2>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ArticleCard v-for="article in publishedArticles" :key="article.id" :article="article" />
        </div>
      </section>
    </div>
  </DefaultLayout>
</template>
