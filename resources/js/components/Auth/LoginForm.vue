<template>
  <div class="login-form">
    <Card class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <CardHeader class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
          Sign in to your account
        </h2>
      </CardHeader>

      <CardContent class="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-4" @submit="handleSubmit">
          <!-- Error Alert -->
          <Alert v-if="error" class="bg-red-50 text-red-600 p-3 text-sm">
            <AlertTitle class="flex items-center gap-2">
              <TriangleAlert class="h-4 w-4" color="red" :size="32" />Error</AlertTitle
            >
            <AlertDescription>{{ error }}</AlertDescription>
          </Alert>

          <div>
            <label for="email" class="block text-sm/6 font-medium text-gray-900 dark:text-slate-200"
              >Email address</label
            >
            <div class="mt-2">
              <Input
                v-model="email"
                type="email"
                name="email"
                id="email"
                autocomplete="email"
                placeholder="Email address"
                required
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
              <Input
                v-model="password"
                type="password"
                name="password"
                id="password"
                autocomplete="current-password"
                placeholder="Password"
                required
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              :disabled="loading"
              class="flex w-full justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50"
            >
              {{ loading ? 'Signing in...' : 'Sign in' }}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '@/composables/useAuth';
import { TriangleAlert } from 'lucide-vue-next';

const email = ref('');
const password = ref('');
const { login, loading, error } = useAuth();

const handleSubmit = async (e: Event) => {
  e.preventDefault();
  await login(email.value, password.value);
};
</script>

<style scoped></style>
