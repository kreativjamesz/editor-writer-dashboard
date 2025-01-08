<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-md">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <router-link to="/" class="font-bold text-xl">Dashboard</router-link>

          <div class="flex items-center space-x-4">
            <router-link v-if="auth.user.type === 'Writer'" to="/dashboard/writer" class="hover:text-blue-600">
              Writer Dashboard
            </router-link>

            <router-link v-if="auth.user.type === 'Editor'" to="/dashboard/editor" class="hover:text-blue-600">
              Editor Dashboard
            </router-link>

            <router-link to="/media" class="hover:text-blue-600"> All Media </router-link>

            <button @click="auth.logout" class="text-red-600 hover:text-red-800">Logout</button>
          </div>
        </div>
      </div>
    </nav>

    <main>
      <slot></slot>
    </main>
  </div>
</template>
