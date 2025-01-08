<script setup lang="ts">
import { ref } from 'vue';
import type { Article } from '@/types';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
const articles = ref<Article[]>([]);

const canEdit = (article: Article) => {
  if (auth.user.type === 'Editor') return true;
  return auth.user.type === 'Writer' && article.status === 'For Edit';
};
</script>

<template>
  <DefaultLayout>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-6">All Media</h1>

      <div class="overflow-x-auto">
        <table class="min-w-full bg-white">
          <thead>
            <tr class="bg-gray-100">
              <th class="px-4 py-2">Actions</th>
              <th class="px-4 py-2">Image</th>
              <th class="px-4 py-2">Title</th>
              <th class="px-4 py-2">Link</th>
              <th class="px-4 py-2">Writer</th>
              <th class="px-4 py-2">Editor</th>
              <th class="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="article in articles" :key="article.id">
              <td class="px-4 py-2">
                <button
                  v-if="canEdit(article)"
                  @click="$router.push(`/articles/${article.id}/edit`)"
                  class="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
              </td>
              <td class="px-4 py-2">
                <img :src="article.image" class="w-16 h-16 object-cover" :alt="article.title" />
              </td>
              <td class="px-4 py-2">{{ article.title }}</td>
              <td class="px-4 py-2">
                <a :href="article.link" target="_blank" class="text-blue-600 hover:text-blue-800">
                  {{ article.link }}
                </a>
              </td>
              <td class="px-4 py-2">{{ article.writer.firstname }} {{ article.writer.lastname }}</td>
              <td class="px-4 py-2">{{ article.editor?.firstname }} {{ article.editor?.lastname }}</td>
              <td class="px-4 py-2">{{ article.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </DefaultLayout>
</template>
