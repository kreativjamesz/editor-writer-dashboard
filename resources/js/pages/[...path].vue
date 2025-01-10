<script setup lang="ts">
import { useAuth } from '@/composables/useAuth';
const { userRole } = useAuth();
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center items-center w-full">
    <h1 class="text-9xl font-bold">404 Not Found</h1>
    <RouterLink :to="`/${userRole.toLowerCase()}/dashboard`">
      <Button class="dark:bg-teal-800 dark:hover:bg-zinc-700 dark:text-zinc-200 mt-5" size="lg">Go Home</Button>
    </RouterLink>
  </div>
</template>
