<template>
  <div class="container mx-auto py-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold">Create New Article</h1>
      <p class="text-gray-600">Create a new article for review and publication</p>
    </div>
    <ArticleForm />
  </div>
</template>

<script setup lang="ts">
import ArticleForm from '@/components/Articles/ArticleForm.vue';
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();

// Ensure only writers can access this page
onMounted(() => {
  if (auth.user?.type !== 'Writer') {
    router.push('/cms/dashboard');
  }
});
</script>

<style scoped></style>
