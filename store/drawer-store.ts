import { create } from "zustand"

interface DrawerState {
  isDrawerOpen: boolean
  setDrawerOpen: (open: boolean) => void
  isListingDrawerOpen: boolean
  setListingDrawerOpen: (open: boolean) => void

  isForumDrawerOpen: boolean
  setForumDrawerOpen: (open: boolean) => void
  isCommunityDrawerOpen: boolean
  setCommunityDrawerOpen: (open: boolean) => void
  isEventDrawerOpen: boolean
  setEventDrawerOpen: (open: boolean) => void
  isFeedDrawerOpen: boolean
  setFeedDrawerOpen: (open: boolean) => void
}

export const useDrawerStore = create<DrawerState>((set) => ({
  isDrawerOpen: false,
  setDrawerOpen: (open) => set({ isDrawerOpen: open }),
  isListingDrawerOpen: false,
  setListingDrawerOpen: (open) => set({ isListingDrawerOpen: open }),
  isForumDrawerOpen: false,
  setForumDrawerOpen: (open) => set({ isForumDrawerOpen: open }),
  isCommunityDrawerOpen: false,
  setCommunityDrawerOpen: (open) => set({ isCommunityDrawerOpen: open }),
  isEventDrawerOpen: false,
  setEventDrawerOpen: (open) => set({ isEventDrawerOpen: open }),
  isFeedDrawerOpen: false,
  setFeedDrawerOpen: (open) => set({ isFeedDrawerOpen: open }),
}))