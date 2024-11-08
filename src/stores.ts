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

interface IsPlayingStore {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}

interface ICursorChangingStore {
  cursorChanging: boolean;
  setCursorChanging: (cursorChanging: boolean) => void;
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

export const isPlayingStore = create<IsPlayingStore>()(
  devtools((set) => ({
    isPlaying: false,
    setIsPlaying: (isPlaying) => set({ isPlaying }),
  }))
);

export const cursorChangingStore = create<ICursorChangingStore>()(
  devtools((set) => ({
    cursorChanging: false,
    setCursorChanging: (cursorChanging) => set({ cursorChanging }),
  }))
);
