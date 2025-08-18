import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"

export type PostType = "post" | "poll" | "job" | "celebrate" | "document" | "services" | "media" | "discussion"

export interface CelebrationData {
  type: string | null
  image: string | null
}

export interface ForumData {
  title: string
  content: string
  category: string | null
  isAnonymous: boolean
}

// Update the PollTypeData interface to match the React Native version
export interface PollTypeData {
  title: string
  question: string
  options: { option: string }[]
  lastDate?: Date
  resultVisibility: "ALWAYS" | "AFTER_VOTE" | "AFTER_END" | "ADMIN"
}

export interface PostFormData {
  description: string
  hashtags: string[]
  media: { uri: string; file?: File }[]
  selectedPostType: PostType | null
  showPollFields: boolean
  pollData?: PollTypeData
  postTypeData?: any
  celebration?: CelebrationData | null
  forum?: ForumData | null
}

export interface PostMenuState {
  // Form data
  description: string
  hashtags: string[]
  media: { uri: string; file?: File }[]
  selectedPostType: PostType | null

  // UI state
  isMenuExpanded: boolean
  showPollFields: boolean
  loading: boolean
  celebration: CelebrationData | null
  pollData: PollTypeData | null
  postTypeData: any
  forum: ForumData | null

  // Actions
  setDescription: (description: string) => void
  setHashtags: (hashtags: string[]) => void
  addMedia: (media: { uri: string; file?: File }) => void
  removeMedia: (index: number) => void
  setMedia: (media: { uri: string; file?: File }[]) => void
  setSelectedPostType: (type: PostType | null) => void
  setIsMenuExpanded: (expanded: boolean) => void
  setShowPollFields: (show: boolean) => void
  setLoading: (loading: boolean) => void
  setPollData: (data: PollTypeData | null) => void
  setPostTypeData: (data: any) => void
  setCelebration: (celebration: CelebrationData | null) => void
  setForum: (forum: ForumData | null) => void

  // Complex actions
  toggleMenu: () => void
  closeMenu: () => void
  selectPostType: (type: PostType) => void
  resetForm: () => void
  getFormData: () => PostFormData

  // Validation
  isFormValid: () => boolean
  hasContent: () => boolean
}

const initialState = {
  description: "",
  hashtags: [],
  media: [],
  selectedPostType: null,
  isMenuExpanded: false,
  showPollFields: false,
  loading: false,
  pollData: null,
  postTypeData: null,
  celebration: null,
  forum: null,
}

export const usePostStore = create<PostMenuState>()(
  subscribeWithSelector((set, get) => ({
    ...initialState,

    // Basic setters
    setDescription: (description: string) => set({ description }),
    setHashtags: (hashtags: string[]) => set({ hashtags }),
    addMedia: (newMedia: { uri: string; file?: File }) => set((state) => ({ media: [...state.media, newMedia] })),
    removeMedia: (index: number) => set((state) => ({ media: state.media.filter((_, i) => i !== index) })),
    setMedia: (media: { uri: string; file?: File }[]) => set({ media }),
    setSelectedPostType: (selectedPostType: PostType | null) => set({ selectedPostType }),
    setIsMenuExpanded: (isMenuExpanded: boolean) => set({ isMenuExpanded }),
    setShowPollFields: (showPollFields: boolean) => set({ showPollFields }),
    setLoading: (loading: boolean) => set({ loading }),
    setPollData: (pollData: PollTypeData | null) => set({ pollData }),
    setPostTypeData: (postTypeData: any) => set({ postTypeData }),
    setForum: (forum: ForumData | null) => set({ forum }),
    setCelebration: (celebration: CelebrationData | null) => set({ celebration }),

    // Complex actions
    toggleMenu: () => set((state) => ({ isMenuExpanded: !state.isMenuExpanded })),
    closeMenu: () => set({ isMenuExpanded: false }),
    selectPostType: (type: PostType) => {
      set((state) => {
        const newState: Partial<PostMenuState> = {
          selectedPostType: type,
          isMenuExpanded: false,
        }
        switch (type) {
          case "poll":
            newState.showPollFields = true
            break
          default:
            newState.showPollFields = false
        }
        return newState
      })
    },
    resetForm: () => set(initialState),
    getFormData: (): PostFormData => {
      const state = get()
      return {
        description: state.description,
        hashtags: state.hashtags,
        media: state.media,
        selectedPostType: state.selectedPostType,
        showPollFields: state.showPollFields,
        pollData: state.pollData,
        postTypeData: state.postTypeData,
        celebration: state.celebration,
        forum: state.forum,
      }
    },

    // Validation methods
    hasContent: (): boolean => {
      const state = get()
      return (
        state.description !== "" ||
        state.media.length > 0 ||
        state.showPollFields ||
        state.forum !== null ||
        state.celebration !== null
      )
    },
    isFormValid: (): boolean => {
      const state = get()
      const hasContent =
        state.description !== "" ||
        state.media.length > 0 ||
        state.showPollFields ||
        state.forum !== null ||
        state.celebration !== null
      const isPollValid = !state.showPollFields || state.pollData !== null
      return hasContent && isPollValid
    },
  })),
)

// Auto-close menu on typing
usePostStore.subscribe(
  (state) => state.description,
  (description, prevDescription) => {
    if (description !== prevDescription && description.length > prevDescription.length) {
      const { isMenuExpanded, closeMenu } = usePostStore.getState()
      if (isMenuExpanded) {
        closeMenu()
      }
    }
  },
)
