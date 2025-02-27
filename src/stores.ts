import projects from "./projects.json";

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

interface ProjectIdStore {
  projectId: string;
  setProjectId: (projectId: string) => void;
}

interface IsPlayingStore {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}

interface ICursorChangingStore {
  cursorChanging: boolean;
  setCursorChanging: (cursorChanging: boolean) => void;
}

interface IHideCursorStore {
  hideCursor: boolean;
  setHideCursor: (hideCursor: boolean) => void;
}

interface ICommentsProjectStore {
  commentsProject: string;
  setCommentsProject: (commentsProject: string) => void;
}

interface IResponsiveStore {
  isResponsive: boolean;
  setIsResponsive: (isResponsive: boolean) => void;
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

export const projectIdStore = create<ProjectIdStore>()(
  devtools((set) => ({
    projectId: projects[0].id,
    setProjectId: (projectId) => set({ projectId }),
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

export const hideCursorStore = create<IHideCursorStore>()(
  devtools((set) => ({
    hideCursor: false,
    setHideCursor: (hideCursor) => set({ hideCursor }),
  }))
);

export const commentsProjectStore = create<ICommentsProjectStore>()(
  devtools((set) => ({
    commentsProject: projects[0].id,
    setCommentsProject: (commentsProject) => set({ commentsProject }),
  }))
);

export const responsiveStore = create<IResponsiveStore>()(
  devtools((set) => ({
    isResponsive: false,
    setIsResponsive: (isResponsive) => set({ isResponsive }),
  }))
);
