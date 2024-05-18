import { createStore } from "zustand";
export type PinStoreState = {
  pins: Pin[];
};

export type PinStoreActions = {
  setPins: (pins: Pin[]) => void;
};

export type PinStore = PinStoreState & PinStoreActions;

export const usePinStore = (initProps?: Partial<PinStoreState>) => {
  const DEFAULT_PROPS: PinStoreState = {
    pins: [],
  };

  return createStore<PinStore>((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    setPins: (state) => set({ pins: state.map((pin) => ({ ...pin })) }),
  }));
};
