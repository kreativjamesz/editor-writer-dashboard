<template>
  <nav class="flex items-center space-x-4 ml-8">
    <router-link
      v-for="item in navItems"
      :key="item.to"
      v-show="item.show"
      :to="item.to"
      class="text-gray-700 hover:text-blue-600 font-medium"
    >
      {{ item.label }}
    </router-link>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();

const navItems = [
  {
    label: 'Dashboard',
    to: `${auth.user.type === 'Writer' ? '/dashboard/writer' : '/dashboard/editor'}`,
    show: true,
  },
  {
    label: 'Articles',
    to: '/articles',
    show: auth.isWriter,
  },
  {
    label: 'Companies',
    to: '/dashboard/companies',
    show: auth.isEditor,
  },
  {
    label: 'Users',
    to: '/dashboard/users',
    show: auth.isEditor,
  },
] as const;
</script>

<style scoped>
.router-link-active {
  @apply text-blue-600;
}
</style>
