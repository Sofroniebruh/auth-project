import { createStore } from 'zustand/vanilla';

interface UseDialogIsOpenStore {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const dialogIsOpenStore = createStore<UseDialogIsOpenStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => {
    set({ isOpen });
  },
}));