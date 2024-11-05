import { atom } from "recoil";

export const triggerMainAtom = atom({
  key: "triggerMain",
  default: false,
});

export const isFullscreenAtom = atom<boolean>({
  key: "isFullscreen",
  default: false,
});
