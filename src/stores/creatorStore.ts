import { create } from "zustand";

export type CreatorStoreState = {
  creator: boolean;
};

export type CreatorStoreActions = {
  setCreator: (creator: boolean) => void;
};

export type CreatorStore = CreatorStoreState & CreatorStoreActions;

export const useCreatorStore = create<CreatorStore>((set) => ({
  creator: false,
  setCreator: () => set((state) => ({ creator: !state.creator })),
}));
