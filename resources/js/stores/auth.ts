import { defineStore } from 'pinia';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem('token'),
  }),

  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user,
    isEditor: (state) => state.user?.type === 'Editor',
    isWriter: (state) => state.user?.type === 'Writer',
  },

  actions: {
    async login(email: string, password: string) {
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          throw new Error('Login failed');
        }

        const data = await response.json();
        this.setAuth(data.user, data.token);

        return true;
      } catch (error) {
        console.error('Login error:', error);
        return false;
      }
    },

    async logout() {
      try {
        await fetch('/api/logout', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        this.clearAuth();
      }
    },

    async fetchUser() {
      try {
        const response = await fetch('/api/user', {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }

        const user = await response.json();
        this.user = user;

        return true;
      } catch (error) {
        console.error('Fetch user error:', error);
        this.clearAuth();
        return false;
      }
    },

    setAuth(user: User, token: string) {
      this.user = user;
      this.token = token;
      localStorage.setItem('token', token);
    },

    clearAuth() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
    },
  },
});
