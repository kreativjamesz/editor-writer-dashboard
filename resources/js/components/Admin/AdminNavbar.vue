<template>
  <nav class="bg-white dark:bg-zinc-950 border-gray-200 shadow-md">
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
          <!-- User Menu -->
          <div class="relative" v-if="auth.user">
            <button class="flex items-center gap-2 text-gray-700 hover:text-teal-600 dark:text-zinc-200">
              <span class="font-medium">{{ userName }}</span>
              <span v-if="userType" class="text-xs px-2 py-1 bg-gray-800 rounded-full">
                {{ userType }}
              </span>
            </button>
          </div>

          <Button
            @click="handleLogout"
            :disabled="isLoggingOut"
            class="dark:bg-teal-800 dark:hover:bg-zinc-700 dark:text-zinc-200 disabled:opacity-50"
          >
            {{ isLoggingOut ? 'Logging out...' : 'Logout' }}
          </Button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import MainNav from '@/components/Admin/MainNav.vue';
import { useHandleLogout } from '@/composables/useHandleLogout';
import { computed } from 'vue';

const { handleLogout, isLoggingOut } = useHandleLogout();
const auth = useAuthStore();

const userName = computed(() => {
  if (!auth.user) return '';
  return `${auth.user.firstname} ${auth.user.lastname}`.trim();
});

const userType = computed(() => auth.user?.type || '');
</script>

<style scoped></style>
