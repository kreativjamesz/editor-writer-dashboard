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
  const authRequired = to.path.startsWith('/cms');

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

  // Redirect from login if already authenticated
  if (to.path === '/login' && authStore.isAuthenticated) {
    return '/cms/dashboard';
  }

  // Role-based route protection
  if (authStore.isAuthenticated && to.path.startsWith('/cms/')) {
    const userRole = authStore.user?.type;

    // Protect editor-only routes
    if (userRole === 'Writer') {
      // Block access to companies and users management
      if (to.path.startsWith('/cms/companies') || to.path.startsWith('/cms/users')) {
        return '/cms/dashboard';
      }

      // Block access to published article editing
      if (to.path.startsWith('/cms/articles/edit/:id')) {
        // const articleId = to.params.id;
        // You might want to check article status here
        // and redirect if it's published
      }
    }
  }
});

export default router;
