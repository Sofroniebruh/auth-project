import { createStore } from 'zustand/vanilla';

interface SheetStore {
  isOpenSheet: boolean;
  setIsOpenSheet: (isOpenSheet: boolean) => void;
}

export const sheetStore = createStore<SheetStore>((set) => ({
  isOpenSheet: false,
  setIsOpenSheet: (isOpenSheet: boolean) => {
    set({ isOpenSheet });
  },
}));