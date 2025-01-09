import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';

export function useAuthInit() {
  const authStore = useAuthStore();

  onMounted(async () => {
    if (authStore.token && !authStore.user) {
      try {
        await authStore.fetchUser();
      } catch {
        authStore.clearAuth();
      }
    }
  });

  return { authStore };
}
