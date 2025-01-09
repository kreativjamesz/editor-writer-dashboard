import { createRouter, createWebHistory } from 'vue-router';
import { routes } from 'vue-router/auto-routes';
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Navigation Guard
router.beforeEach(async (to) => {
  const authStore = useAuthStore();
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);

  // Check authentication status
  if (authStore.token && !authStore.user) {
    try {
      await authStore.fetchUser();
    } catch {
      authStore.clearAuth();
      return '/login';
    }
  }

  if (authRequired && !authStore.isAuthenticated) {
    return '/login';
  }

  if (to.path === '/login' && authStore.isAuthenticated) {
    return authStore.user?.type === 'Writer' ? '/dashboard/writer' : '/dashboard/editor';
  }
});

export default router;
