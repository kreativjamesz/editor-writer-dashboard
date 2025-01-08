<template>
  <nav class="bg-gray-800 p-4">
    <ul class="navbar-nav flex flex-row items-center justify-between gap-4">
      <li v-for="route in routes" :key="route.path" class="nav-item">
        <router-link
          class="nav-link text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
          active-class="bg-gray-900"
          :to="route.path"
        >
          {{ route.name }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
interface Route {
  path: string;
  name: string;
}

import { ref } from 'vue';

const routes = ref<Route[]>([
  { path: '/dashboard', name: 'Dashboard' },
  { path: '/dashboard/companies', name: 'Companies' },
  { path: '/dashboard/articles', name: 'Articles' },
  { path: '/dashboard/users', name: 'Users' },
]);
</script>

<style scoped lang="postcss">
.navbar-nav {
  @apply flex flex-row items-center justify-between gap-4;
}

.nav-link {
  @apply text-white hover:bg-gray-700 px-3 py-4 rounded-md text-sm font-medium;
}

.active {
  @apply bg-gray-900;
}
</style>
