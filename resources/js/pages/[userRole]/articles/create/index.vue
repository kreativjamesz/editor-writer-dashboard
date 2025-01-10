<template>
  <div class="container mx-auto py-6">
    <div class="flex justify-between items-center">
      <div class="pb-6">
        <h1 class="text-3xl font-bold">Create New Article</h1>
        <p class="text-gray-600">Create a new article for review and publication</p>
      </div>
      <div class="pb-6">
        <Button @click="router.back()" class="dark:bg-teal-800 dark:text-zinc-200">Go Back</Button>
      </div>
    </div>
    <ArticleForm />
  </div>
</template>

<script setup lang="ts">
import ArticleForm from '@/components/Articles/ArticleForm.vue';
import { useAuthStore } from '@/stores/auth';
import { useAuth } from '@/composables/useAuth';

const auth = useAuthStore();
const router = useRouter();
const { userRole } = useAuth();

// Ensure only writers can access this page
onMounted(() => {
  if (auth.user?.type !== 'Writer') {
    router.push(`/${userRole.value.toLowerCase()}/dashboard`);
  }
});
</script>

<style scoped></style>
