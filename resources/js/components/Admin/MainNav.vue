<template>
  <nav class="flex items-center space-x-4">
    <router-link
      v-for="item in navItems"
      :key="item.to"
      v-show="item.show"
      :to="item.to"
      class="text-gray-700 dark:text-gray-300 hover:text-teal-600 font-medium"
    >
      {{ item.label }}
    </router-link>
  </nav>
</template>

<script setup lang="ts">
import { useRoleAccess } from '@/composables/useRoleAccess';

const { isWriter, isEditor } = useRoleAccess();

const navItems = [
  {
    label: 'Dashboard',
    to: '/cms/dashboard',
    show: true,
  },
  {
    label: 'Articles',
    to: '/cms/articles',
    show: true,
  },
  {
    label: 'Companies',
    to: '/cms/companies',
    show: isEditor,
  },
  {
    label: 'Users',
    to: '/cms/users',
    show: isEditor,
  },
  {
    label: 'Media',
    to: '/cms/media',
    show: true,
  },
] as const;
</script>

<style scoped>
.router-link-active {
  @apply text-blue-600;
}
</style>
