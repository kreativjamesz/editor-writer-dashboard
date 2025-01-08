import { createRouter, createWebHistory } from 'vue-router';
import { routes } from 'vue-router/auto-routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Log all routes
router.getRoutes().forEach((route) => {
  console.log(`Path: ${String(route.path)}, Name: ${String(route.name)}`);
});

// Navigation Guard
router.beforeEach(async (to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: '/login' });
  } else if (to.meta.guest && isAuthenticated) {
    next({ name: '/dashboard/' });
  } else {
    next();
  }
});

export default router;
