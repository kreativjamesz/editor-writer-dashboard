<script setup lang="ts">
import { ref } from 'vue';
import type { Article } from '@/types';

const forPublishArticles = ref<Article[]>([]);
const publishedArticles = ref<Article[]>([]);
</script>

<template>
  <div class="container mx-auto">
    <h1 class="text-2xl font-bold mb-6">Editor's Dashboard</h1>

    <!-- For Publish Articles -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-4">For Publish</h2>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ArticleCard v-for="article in forPublishArticles" :key="article.id" :article="article" />
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
</template>
