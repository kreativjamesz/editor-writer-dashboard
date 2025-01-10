import { createRouter, createWebHistory } from 'vue-router';
import { routes } from 'vue-router/auto-routes';
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Navigation Guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const userRole = authStore.user?.type;

  // Check authentication status
  if (authStore.token && !authStore.user) {
    try {
      await authStore.fetchUser();
    } catch {
      authStore.clearAuth();
      return next('/login');
    }
  }

  // Redirect to login if not authenticated
  if (authRequired && !authStore.isAuthenticated) {
    return next('/login');
  }

  // Redirect from login into designated dashboard if already authenticated
  if (to.path === '/login' && authStore.isAuthenticated) {
    return next(`/${userRole.toLowerCase()}/dashboard`);
  }

  // Role-based route protection
  if (authStore.isAuthenticated) {
    if (userRole === 'Writer' && to.path.startsWith('/editor')) {
      return next(from.path !== '/writer/dashboard' ? '/writer/dashboard' : '/');
    }
    if (userRole === 'Editor' && to.path.startsWith('/writer')) {
      return next(from.path !== '/editor/dashboard' ? '/editor/dashboard' : '/');
    }
  }

  next();
});

export default router;
