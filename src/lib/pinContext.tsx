import { createContext } from "react";
import { PinStore } from "../stores/pinStore";
import { StoreApi } from "zustand";

export const pinContext = createContext<StoreApi<PinStore> | null>(null);
