// import { atom } from "recoil";

// export const triggerMainAtom = atom({
//   key: "triggerMain",
//   default: false,
// });

// export const isFullscreenAtom = atom<boolean>({
//   key: "isFullscreen",
//   default: false,
// });

import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface TriggerMainStore {
  triggerMain: boolean;
  setTriggerMain: (triggerMain: boolean) => void;
}

interface IsFullscreenStore {
  isFullscreen: boolean;
  setIsFullscreen: (isFullscreen: boolean) => void;
}

export const triggerMainStore = create<TriggerMainStore>()(
  devtools((set) => ({
    triggerMain: false,
    setTriggerMain: (triggerMain) => set({ triggerMain }),
  }))
);

export const isFullscreenStore = create<IsFullscreenStore>()(
  devtools((set) => ({
    isFullscreen: false,
    setIsFullscreen: (isFullscreen) => set({ isFullscreen }),
  }))
);
