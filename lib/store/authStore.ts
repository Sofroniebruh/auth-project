import { create } from 'zustand/react';
import { API } from '@/lib/api-client/api';

type AuthStore = {
  isLoggedIn: boolean,
  setIsLoggedIn: (isLoggedIn: boolean) => void,
  checkLoggedIn: () => Promise<void>,
  logout: () => Promise<boolean>,
  loading: boolean,
  hasCheckedAuth: boolean,
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  isLoggedIn: false,
  hasCheckedAuth: false,
  loading: false,
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  checkLoggedIn: async (force = false) => {
    const { hasCheckedAuth } = get();
    if (hasCheckedAuth && !force) return;

    set({ loading: true });

    try {
      const { loggedIn } = await API.tokenCheck.checkToken();
      set({ isLoggedIn: loggedIn, hasCheckedAuth: true });
    } catch {
      set({ isLoggedIn: false, hasCheckedAuth: true });
    } finally {
      set({ loading: false });
    }
  },
  logout: async () => {
    try {
      const res = await API.auth.logout();

      set({ isLoggedIn: !res });

      return res;
    } catch (error) {
      console.error(error);
      set({ isLoggedIn: false });
      return false;
    }
  },
}));