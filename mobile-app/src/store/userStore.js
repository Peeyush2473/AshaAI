import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import authService from '../services/authService';

const useUserStore = create(
  immer((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,

    loginUser: async (credentials) => {
      const response = await authService.login(credentials);
      if (response.success) {
        set((state) => {
          state.user = response.user;
          state.token = response.token;
          state.isAuthenticated = true;
        });
      }
      return response;
    },

    registerUser: async (userData) => {
        const response = await authService.register(userData);
        if (response.success) {
            set((state) => {
                state.user = response.user;
                state.token = response.token;
                state.isAuthenticated = true;
            });
        }
        return response;
    },

    logoutUser: async () => {
      await authService.logout();
      set((state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
    },

    hydrateAuth: async () => {
      try {
        const token = await authService.getToken();
        const user = await authService.getUser();
        if (token && user) {
          set((state) => {
            state.user = user;
            state.token = token;
            state.isAuthenticated = true;
          });
        }
      } catch (error) {
        console.error('Hydration failed:', error);
      } finally {
        set((state) => {
          state.isLoading = false;
        });
      }
    },
  }))
);

export default useUserStore;
