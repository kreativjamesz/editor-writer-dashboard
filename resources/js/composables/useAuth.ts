import { useApi } from './useApi';
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export function useAuth() {
  const api = useApi();
  const authStore = useAuthStore();
  const router = useRouter();
  const loading = ref(false);
  const error = ref<string | null>(null);

  const login = async (email: string, password: string) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.post('/login', { email, password }, { auth: false });
      authStore.setAuth(response.user, response.token);

      // Redirect based on user type
      if (response.user.type === 'Writer') {
        router.push('/dashboard/writer');
      } else {
        router.push('/dashboard/editor');
      }

      return true;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Login failed';
      return false;
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    loading.value = true;
    error.value = null;

    try {
      await api.post('/logout');
      authStore.clearAuth();
      router.push('/login');
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Logout failed';
    } finally {
      loading.value = false;
    }
  };

  const checkAuth = async () => {
    if (!authStore.token) return false;

    try {
      await api.get('/user');
      return true;
    } catch {
      authStore.clearAuth();
      return false;
    }
  };

  return {
    login,
    logout,
    checkAuth,
    loading,
    error,
    isAuthenticated: authStore.isAuthenticated,
    user: authStore.user,
  };
}
