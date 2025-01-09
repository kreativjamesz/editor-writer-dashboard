<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useHandleLogout } from '@/composables/useHandleLogout';
import MainNav from '@/components/Default/MainNav.vue';

const auth = useAuthStore();
const { handleLogout, isLoggingOut } = useHandleLogout();
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-md">
      <div class="container mx-auto px-4">
        <!-- Top Navigation Bar -->
        <div class="flex justify-between items-center h-16">
          <!-- Left Side: Logo and Brand -->
          <div class="flex items-center gap-4">
            <router-link to="/">
              <img
                width="80"
                height="auto"
                src="https://archintel.com/wp-content/uploads/2019/10/archintel-logo.gif"
                class="header_logo header-logo"
                alt="ArchIntel™"
              />
            </router-link>
            <MainNav />
          </div>

          <!-- Right Side: User Navigation -->
          <div class="flex items-center space-x-4">
            <router-link
              v-if="auth.user.type === 'Writer'"
              to="/dashboard/writer"
              class="text-gray-700 hover:text-blue-600 font-medium"
            >
              Writer Dashboard
            </router-link>

            <router-link
              v-if="auth.user.type === 'Editor'"
              to="/dashboard/editor"
              class="text-gray-700 hover:text-blue-600 font-medium"
            >
              Editor Dashboard
            </router-link>

            <router-link to="/media" class="text-gray-700 hover:text-blue-600 font-medium"> All Media </router-link>

            <!-- User Menu -->
            <div class="relative">
              <button class="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                <span class="font-medium">{{ auth.user.firstname || null }} {{ auth.user.lastname || null }}</span>
                <span class="text-xs px-2 py-1 bg-gray-100 rounded-full">
                  {{ auth.user.type }}
                </span>
              </button>
            </div>

            <button
              @click="handleLogout"
              :disabled="isLoggingOut"
              class="text-red-600 hover:text-red-800 font-medium disabled:opacity-50"
            >
              {{ isLoggingOut ? 'Logging out...' : 'Logout' }}
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="py-6">
      <slot></slot>
    </main>
  </div>
</template>

<style scoped>
.router-link-active {
  @apply text-blue-600;
}
</style>
