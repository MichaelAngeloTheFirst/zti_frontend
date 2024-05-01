import { create } from "zustand";

type Pin = {
  position: [number, number];
  text: string;
};

type PinTable = {
  pins: Pin[];
};

export const usePinStore = create<PinTable>((set) => ({
  pins: [
    { position: [52.06, 19.25], text: "Poznań" },
    { position: [51.11, 17.03], text: "Wrocław" },
    { position: [52.13, 21.0], text: "Warszawa" },
  ],
  addPin: (pin: Pin) => set((state) => ({ pins: [...state.pins, pin] })),
  removePin: (pin: Pin) =>
    set((state) => ({
      pins: state.pins.filter((p) => {
        return p.position !== pin.position;
      }),
    })),
}));
