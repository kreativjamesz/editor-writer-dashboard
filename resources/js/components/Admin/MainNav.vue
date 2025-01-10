<template>
  <nav class="flex items-center space-x-4">
    <router-link
      v-for="item in navItems"
      :key="item.to"
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

const navItems = computed(() => {
  if (isWriter.value) {
    return [
      { label: 'Dashboard', to: '/writer/dashboard', show: true },
      { label: 'All Media', to: '/writer/media', show: true },
    ];
  } else if (isEditor.value) {
    return [
      { label: 'Dashboard', to: '/editor/dashboard', show: true },
      { label: 'Companies', to: '/editor/companies', show: true },
      { label: 'Users', to: '/editor/users', show: true },
      { label: 'All Media', to: '/editor/media', show: true },
    ];
  }
  return [];
});
</script>

<style scoped>
.router-link-active {
  @apply text-teal-600;
}
</style>
