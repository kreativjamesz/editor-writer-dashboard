import { defineStore } from 'pinia';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user,
    isEditor: (state) => state.user?.type === 'Editor',
    isWriter: (state) => state.user?.type === 'Writer',
  },

  actions: {
    // Removed Login
    // Removed Logout
    async fetchUser() {
      try {
        if (!this.token) {
          this.clearAuth();
          return false;
        }

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
    },

    clearAuth() {
      this.user = null;
      this.token = null;
    },
  },
  persist: true,
});
