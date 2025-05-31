import { createStore } from 'zustand/vanilla';

interface DialogStore {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const dialogStore = createStore<DialogStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => {
    set({ isOpen });
  },
}));