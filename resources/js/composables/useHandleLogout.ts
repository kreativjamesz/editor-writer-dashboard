import { useAuth } from './useAuth';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

export function useHandleLogout() {
  const { logout } = useAuth();
  const router = useRouter();
  const isLoggingOut = ref(false);
  const error = ref<string | null>(null);

  const handleLogout = async () => {
    isLoggingOut.value = true;
    error.value = null;

    try {
      await logout();
      // Redirect to login page
      router.push('/login');
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to logout';
      console.error('Logout error:', e);
    } finally {
      isLoggingOut.value = false;
    }
  };

  return {
    handleLogout,
    isLoggingOut,
    error,
  };
}
