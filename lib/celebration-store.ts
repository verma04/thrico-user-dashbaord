import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"

export type CelebrationType =
  | "project_launch"
  | "work_anniversary"
  | "new_position"
  | "educational_milestone"
  | "new_certification"
  | "achievement"
  | "promotion"
  | "graduation"

export interface CelebrationOption {
  id: CelebrationType
  title: string
  description: string
  icon?: string
  defaultImages: string[]
  suggestedDescriptions: string[]
  defaultDescription: string
}

export interface CelebrationData {
  type: CelebrationType | null
  selectedImage: string | null
  customImage: string | null
  title: string
  description: string
  customDescription: string
}

export interface CelebrationState {
  celebrationData: CelebrationData
  availableTypes: CelebrationOption[]
  isTypeSelectionVisible: boolean
  isImageSelectionVisible: boolean
  setCelebrationType: (type: CelebrationType) => void
  setSelectedImage: (image: string) => void
  setCustomImage: (image: string) => void
  setCelebrationTitle: (title: string) => void
  setCelebrationDescription: (description: string) => void
  setCustomDescription: (description: string) => void
  showTypeSelection: () => void
  hideTypeSelection: () => void
  showImageSelection: () => void
  hideImageSelection: () => void
  resetCelebration: () => void
  getCelebrationTypeData: (type: CelebrationType) => CelebrationOption | undefined
  getSuggestedDescriptions: (type: CelebrationType) => string[]
}

const celebrationImages: readonly string[] = [
  "/celebration-confetti.png",
  "/achievement-trophy.png",
  "/colorful-party-balloons.png",
  "/success-rocket.png",
  "/graduation-cap.png",
  "/promotion-stairs.png",
]

const celebrationTypes: CelebrationOption[] = [
  {
    id: "project_launch",
    title: "Project Launch",
    description: "Share a new project milestone",
    defaultDescription: "Excited to announce the launch of our latest project! 🚀",
    suggestedDescriptions: [
      "Thrilled to share that we've officially launched our new project! 🎉",
      "After months of hard work, we're excited to introduce our latest innovation! 💡",
      "Big day today - our new project is now live! Can't wait to see the impact it makes. 🌟",
      "Proud to announce the successful launch of our team's latest project! 🚀",
      "It's official - our new project is here! Thank you to everyone who made this possible. 🙏",
    ],
    defaultImages: [celebrationImages[0], celebrationImages[2], celebrationImages[3], celebrationImages[1]],
  },
  {
    id: "work_anniversary",
    title: "Work Anniversary",
    description: "Celebrate a career milestone",
    defaultDescription: "Celebrating another amazing year at this incredible company! 🎊",
    suggestedDescriptions: [
      "Can't believe it's been [X] years at this amazing company! Time flies when you love what you do. 💼",
      "Grateful to mark another work anniversary surrounded by such talented colleagues! 🎉",
      "Reflecting on [X] incredible years of growth, learning, and amazing experiences here! 🌟",
      "Another year, another milestone! So thankful for this journey and the people who've made it special. 🙏",
      "Celebrating [X] years of professional growth and countless memories with this fantastic team! 🎊",
    ],
    defaultImages: [celebrationImages[3], celebrationImages[0], celebrationImages[5], celebrationImages[2]],
  },
  {
    id: "new_position",
    title: "New Position",
    description: "Share a job update",
    defaultDescription: "Excited to share that I'm starting a new role! Looking forward to this next chapter. 🌟",
    suggestedDescriptions: [
      "Thrilled to announce that I'm joining [Company] as [Position]! Can't wait to get started. 🚀",
      "Big news! I'm excited to share that I've accepted a new role as [Position]. New adventures ahead! 💼",
      "After careful consideration, I'm delighted to announce my new position at [Company]! 🎉",
      "Ready for the next chapter! Excited to start my new journey as [Position] at [Company]. 🌟",
      "Grateful for this new opportunity! Looking forward to contributing to [Company] as their new [Position]. 🙏",
    ],
    defaultImages: [celebrationImages[1], celebrationImages[5], celebrationImages[3], celebrationImages[0]],
  },
  {
    id: "educational_milestone",
    title: "Educational Milestone",
    description: "Share an educational milestone",
    defaultDescription: "Proud to share that I've reached a new educational milestone! 📚",
    suggestedDescriptions: [
      "Just completed my [Course/Degree] and couldn't be more proud! Learning never stops. 🎓",
      "Excited to share that I've successfully finished [Program/Course]! Ready to apply these new skills. 📚",
      "Another educational milestone achieved! Grateful for the knowledge gained and ready for what's next. 🌟",
      "Proud moment - just earned my [Certification/Degree]! Thank you to everyone who supported this journey. 🙏",
      "Education milestone unlocked! Completed [Course/Program] and feeling inspired to keep growing. 💡",
    ],
    defaultImages: [celebrationImages[4], celebrationImages[1], celebrationImages[2], celebrationImages[3]],
  },
  {
    id: "new_certification",
    title: "New Certification",
    description: "Celebrate a new certification",
    defaultDescription: "Just earned my latest certification! Always excited to expand my skillset. 🏆",
    suggestedDescriptions: [
      "Proud to announce that I've earned my [Certification Name]! Ready to put these skills to work. 🎯",
      "Certification achieved! Just completed [Certification] and feeling more confident in my expertise. 💪",
      "Another certification in the books! Grateful for the opportunity to keep learning and growing. 📈",
      "Excited to share my latest achievement - [Certification Name] certified! 🏅",
      "Professional development milestone reached! Just earned my [Certification] certification. 🌟",
    ],
    defaultImages: [celebrationImages[1], celebrationImages[5], celebrationImages[0], celebrationImages[2]],
  },
  {
    id: "achievement",
    title: "Achievement",
    description: "Celebrate a personal achievement",
    defaultDescription: "Celebrating a personal achievement that I'm really proud of! 🎉",
    suggestedDescriptions: [
      "Reached a goal I've been working towards for months! Feeling grateful and motivated. 🎯",
      "Personal milestone achieved! Sometimes the best victories are the ones you celebrate quietly first. 🌟",
      "Proud moment - accomplished something I wasn't sure was possible! Growth feels amazing. 💪",
      "Achievement unlocked! Grateful for the journey and everyone who believed in me along the way. 🙏",
      "Celebrating a win today! Proof that persistence and hard work really do pay off. 🏆",
    ],
    defaultImages: [celebrationImages[2], celebrationImages[3], celebrationImages[0], celebrationImages[1]],
  },
  {
    id: "promotion",
    title: "Promotion",
    description: "Share your career advancement",
    defaultDescription: "Honored to share that I've been promoted! Grateful for this opportunity to grow. 🚀",
    suggestedDescriptions: [
      "Thrilled to announce my promotion to [New Title]! Ready to take on new challenges and responsibilities. 📈",
      "Grateful to share that I've been promoted! Thank you to my team and mentors for their support. 🙏",
      "Excited about my new role as [Position]! Looking forward to contributing at the next level. 💼",
      "Career milestone achieved! Proud to announce my promotion and ready for the journey ahead. 🌟",
      "Honored to be promoted to [New Title]! Excited to bring fresh perspectives to this new role. 🎯",
    ],
    defaultImages: [celebrationImages[5], celebrationImages[3], celebrationImages[1], celebrationImages[0]],
  },
  {
    id: "graduation",
    title: "Graduation",
    description: "Celebrate your graduation",
    defaultDescription: "Graduation day is here! Proud to have completed this journey. 🎓",
    suggestedDescriptions: [
      "Finally graduated! Thank you to everyone who supported me through this incredible journey. 🎓",
      "Proud graduate here! Ready to take on the world with my new [Degree] in hand. 🌍",
      "Graduation achieved! Grateful for the knowledge gained and excited for what comes next. 📚",
      "From student to graduate! Thank you to my professors, family, and friends for this amazing journey. 🙏",
      "Cap thrown, degree earned! Excited to apply everything I've learned in the real world. 🎉",
    ],
    defaultImages: [celebrationImages[4], celebrationImages[0], celebrationImages[3], celebrationImages[2]],
  },
]

const getInitialCelebrationData = (): CelebrationData => ({
  type: null,
  selectedImage: null,
  customImage: null,
  title: "",
  description: "",
  customDescription: "",
})

export const useCelebrationStore = create<CelebrationState>()(
  subscribeWithSelector((set) => ({
    celebrationData: getInitialCelebrationData(),
    availableTypes: celebrationTypes,
    isTypeSelectionVisible: false,
    isImageSelectionVisible: false,

    setCelebrationType: (type: CelebrationType) => {
      const typeData = celebrationTypes.find((t) => t.id === type)
      set((state) => ({
        celebrationData: {
          ...state.celebrationData,
          type,
          title: typeData?.title || "",
          description: typeData?.defaultDescription || "",
          customDescription: typeData?.defaultDescription || "",
          selectedImage: typeData?.defaultImages[0] || null,
        },
        isTypeSelectionVisible: false,
        isImageSelectionVisible: true,
      }))
    },

    setSelectedImage: (image: string) =>
      set((state) => ({
        celebrationData: {
          ...state.celebrationData,
          selectedImage: image,
          customImage: null,
        },
      })),

    setCustomImage: (image: string) =>
      set((state) => ({
        celebrationData: {
          ...state.celebrationData,
          customImage: image,
          selectedImage: null,
        },
      })),

    setCelebrationTitle: (title: string) =>
      set((state) => ({
        celebrationData: {
          ...state.celebrationData,
          title,
        },
      })),

    setCelebrationDescription: (description: string) =>
      set((state) => ({
        celebrationData: {
          ...state.celebrationData,
          description,
        },
      })),

    setCustomDescription: (customDescription: string) =>
      set((state) => ({
        celebrationData: {
          ...state.celebrationData,
          customDescription,
          description: customDescription,
        },
      })),

    showTypeSelection: () => set({ isTypeSelectionVisible: true }),
    hideTypeSelection: () => set({ isTypeSelectionVisible: false }),
    showImageSelection: () => set({ isImageSelectionVisible: true }),
    hideImageSelection: () => set({ isImageSelectionVisible: false }),

    resetCelebration: () =>
      set({
        celebrationData: getInitialCelebrationData(),
        isTypeSelectionVisible: false,
        isImageSelectionVisible: false,
      }),

    getCelebrationTypeData: (type: CelebrationType) => celebrationTypes.find((t) => t.id === type),

    getSuggestedDescriptions: (type: CelebrationType) => {
      const typeData = celebrationTypes.find((t) => t.id === type)
      return typeData?.suggestedDescriptions || []
    },
  })),
)
