import { createRouter, createWebHistory } from 'vue-router';
import { routes } from 'vue-router/auto-routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Navigation Guards
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');
  if (!isAuthenticated) {
    console.log('You are not authenticated');
    next();
  } else {
    next();
  }
});

export default router;
