<template>
  <div class="login-form">
    <Card class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <CardHeader class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
          Sign in to your account
        </h2>
      </CardHeader>

      <CardContent class="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" @submit="handleSubmit">
          <!-- Error Alert -->
          <div v-if="error" class="bg-red-50 text-red-600 p-3 text-sm">
            {{ error }}
          </div>

          <div>
            <label for="email" class="block text-sm/6 font-medium text-gray-900 dark:text-slate-200"
              >Email address</label
            >
            <div class="mt-2">
              <input
                v-model="email"
                type="email"
                name="email"
                id="email"
                autocomplete="email"
                placeholder="Email address"
                required
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm/6 font-medium text-gray-900 dark:text-slate-200"
                >Password</label
              >
            </div>
            <div class="mt-2">
              <input
                v-model="password"
                type="password"
                name="password"
                id="password"
                autocomplete="current-password"
                placeholder="Password"
                required
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="loading"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
            >
              {{ loading ? 'Signing in...' : 'Sign in' }}
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '@/composables/useAuth';

const email = ref('');
const password = ref('');
const { login, loading, error } = useAuth();

const handleSubmit = async (e: Event) => {
  e.preventDefault();
  await login(email.value, password.value);
};
</script>

<style scoped></style>
