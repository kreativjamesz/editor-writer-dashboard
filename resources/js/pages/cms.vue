<script setup lang="ts"></script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-zinc-900">
    <AdminNavbar />
    <main class="py-6 w-full">
      <div class="container mx-auto">
        <router-view />
      </div>
    </main>
  </div>
</template>

<style scoped lang="postcss">
.router-link-active {
  @apply text-teal-600;
}
</style>
