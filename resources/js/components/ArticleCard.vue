<script setup lang="ts">
import type { Article } from '@/types';

defineProps<{
  article: Article;
}>();
</script>

<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <img :src="article.image" :alt="article.title" class="w-full h-48 object-cover" />
    <div class="p-4">
      <h3 class="font-semibold text-lg mb-2">{{ article.title }}</h3>
      <a :href="article.link" target="_blank" class="text-blue-600 hover:text-blue-800 text-sm mb-2 block">
        {{ article.link }}
      </a>
      <div class="text-sm text-gray-600">
        <p>Date: {{ new Date(article.date).toLocaleDateString() }}</p>
        <p>Writer: {{ article.writer.firstname }} {{ article.writer.lastname }}</p>
        <p v-if="article.editor">Editor: {{ article.editor.firstname }} {{ article.editor.lastname }}</p>
      </div>
    </div>
  </div>
</template>
