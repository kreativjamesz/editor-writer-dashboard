import { useAuthStore } from '@/stores/auth';

interface FetchOptions extends RequestInit {
  auth?: boolean;
}

const APP_API_URL = import.meta.env.VITE_APP_API_URL;
console.log('APP_API_URL', APP_API_URL);

export function useApi() {
  const authStore = useAuthStore();
  const baseURL = `${APP_API_URL}/api`;
  console.log('baseURL', baseURL);

  const fetchWithConfig = async (endpoint: string, options: FetchOptions = {}) => {
    const { auth = true, headers = {}, ...rest } = options;

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(auth && authStore.token ? { Authorization: `Bearer ${authStore.token}` } : {}),
        ...headers,
      },
      ...rest,
    };

    try {
      const response = await fetch(`${baseURL}${endpoint}`, config);

      if (!response.ok) {
        // Handle 401 Unauthorized
        if (response.status === 401) {
          authStore.clearAuth();
          throw new Error('Unauthorized');
        }

        const error = await response.json();
        throw new Error(error.message || 'API Error');
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

  return {
    get: (endpoint: string, options?: FetchOptions) => fetchWithConfig(endpoint, { method: 'GET', ...options }),

    post: (endpoint: string, data?: unknown, options?: FetchOptions) =>
      fetchWithConfig(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
        ...options,
      }),

    put: (endpoint: string, data?: unknown, options?: FetchOptions) =>
      fetchWithConfig(endpoint, {
        method: 'PUT',
        body: JSON.stringify(data),
        ...options,
      }),

    delete: (endpoint: string, options?: FetchOptions) => fetchWithConfig(endpoint, { method: 'DELETE', ...options }),
  };
}
