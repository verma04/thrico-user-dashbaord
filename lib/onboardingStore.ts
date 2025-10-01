import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { Education } from "@/types/education";
import { Experience } from "@/types/experience";
import { Skill } from "@/types/skill";

export interface ProfessionalInfo {

  headline: string;
  location: string;
  aboutText: string;
  category: string;
  role: string;
  socialLinks: SocialLink[];
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

interface BasicInfo {
  firstName: string;
  lastName: string;
  dob: Date | null;
  gender: string;
  pronouns: string;
  category: string; // Added category field
  role: string; // Added role field
}

export interface OnboardingState {
  step: number;
  setStep: (step: number) => void;
  // Current step tracking
  currentStep: number;

  // Basic Info
  basicInfo: BasicInfo;

  // Professional Info
  professionalInfo: ProfessionalInfo;
  setProfessionalInfo: (info: Partial<ProfessionalInfo>) => void;
  // Goals & Invites
  goals: string[];
  invites: string[];
  permission: "basic" | "admin";

  // Social Links
  socialLinks: SocialLink[];

  // Interests & Skills
  interests: string[];
  skills: string[];

  // Education
  educationData: Education[];

  // Experience
  experienceData: Experience[];

  // About Text
  aboutText: string;

  // Loading state
  isLoading: boolean;

  // Selected count for interests/skills
  selectedCount: number;

  // Preferred categories
  preferredCategories: string[];

  // Skills Data
  skillsData: Skill[];

  // Modals
  showAddSkillModal: boolean;
  showEditSkillModal: boolean;

  // Current editing skill
  currentSkillToEdit: Skill | null;
  skillToDeleteId: string | null;

  // Interest Categories
  interestCategories: { [key: string]: string };

  // Actions
  setCurrentStep: (step: number) => void;
  setBasicInfo: (info: Partial<BasicInfo>) => void;
  setRole: (role: string) => void;
  setGoals: (goals: string[]) => void;
  toggleGoal: (goal: string) => void;
  setInvites: (invites: string[]) => void;
  setPermission: (permission: "basic" | "admin") => void;
  setInterests: (interests: string[]) => void;
  toggleInterest: (interest: string) => void;
  setSkills: (skills: string[]) => void;
  toggleSkill: (skill: string) => void;
  addEducation: (education: Education) => void;
  editEducation: (education: Education) => void;
  deleteEducation: (id: string) => void;
  addExperience: (experience: Experience) => void;
  editExperience: (experience: Experience) => void;
  deleteExperience: (id: string) => void;
  addSocialLink: (link: Omit<SocialLink, "id">) => void;
  updateSocialLink: (id: string, link: Omit<SocialLink, "id">) => void;
  removeSocialLink: (id: string) => void;
  setAboutText: (text: string) => void;
  setIsLoading: (loading: boolean) => void;
  setSelectedCount: (count: number) => void;
  setPreferredCategories: (categories: string[]) => void;
  reset: () => void;
  toggleCategory: (category: string) => void;
  handleCompleteProfile: () => Promise<void>;
  handlePrevStep: () => void;
  getRelevantTags: () => string[];
  setShowAddSkillModal: (open: boolean) => void;
  setShowEditSkillModal: (open: boolean) => void;
  setCurrentSkillToEdit: (skill: Skill | null) => void;
  setSkillToDeleteId: (id: string | null) => void;
  addSkill: (skill: Skill) => void;
  editSkill: (skill: Skill) => void;
  deleteSkill: (id: string) => void;
  handleAddSkill: (newSkill: Skill) => void;
  handleEditSkill: (updatedSkill: Skill) => void;
  handleDeleteSkill: () => void;
  setInterestCategories: (interest: string, category: string) => void;
  removeInterestCategory: (interest: string) => void;
}

const initialState = {
  currentStep: 0,
  basicInfo: {
    firstName: "",
    lastName: "",
    dob: null as Date | null,
    gender: "",
    pronouns: "",
    category: "", // Added category field
    role: "", // Added role field
  },
  goals: [],
  invites: [],
  permission: "basic" as const,
  socialLinks: [],
  interests: [],
  skills: [],
  educationData: [],
  experienceData: [],
  aboutText: "",
  isLoading: false,
  selectedCount: 0,
  preferredCategories: [],
  skillsData: [],
  showAddSkillModal: false,
  showEditSkillModal: false,
  currentSkillToEdit: null,
  skillToDeleteId: null,
  interestCategories: {},
  professionalInfo: {

    headline: "",
    location: "",
    aboutText: "",
    category: "",
    role: "",

  },
};

// Example usage:
const userBasicInfo: BasicInfo = {
  firstName: "",
  lastName: "",
  dob: null,
  gender: "",
  pronouns: "",
  category: "", // Added category field
  role: "", // Added role field
};

export const useOnboardingStore = create<OnboardingState>((set, get) => ({
  ...initialState,
    step: 0,
  setStep: (step) => set({ step }),

  setCurrentStep: (step) => set({ currentStep: step }),

  setBasicInfo: (info) =>
    set((state) => ({
      ...state,
      basicInfo: { ...state.basicInfo, ...info },
    })),

  setRole: (role) => set({ role }),

  setGoals: (goals) => set({ goals }),

  toggleGoal: (goal) =>
    set((state) => ({
      goals: state.goals.includes(goal)
        ? state.goals.filter((g) => g !== goal)
        : [...state.goals, goal],
    })),

  setInvites: (invites) => set({ invites }),

  setPermission: (permission) => set({ permission }),

  setInterests: (interests) => set({ interests, selectedCount: interests.length }),

  toggleInterest: (interest) => {
    const { interests, setInterests } = get();
    const updatedInterests = interests.includes(interest)
      ? interests.filter((i) => i !== interest)
      : [...interests, interest];
    setInterests(updatedInterests);
  },

  setSkills: (skills) => set({ skills }),

  toggleSkill: (skill) =>
    set((state) => ({
      skills: state.skills.includes(skill)
        ? state.skills.filter((s) => s !== skill)
        : [...state.skills, skill],
    })),

  addEducation: (education) =>
    set((state) => ({ educationData: [...state.educationData, education] })),

  editEducation: (education) =>
    set((state) => ({
      educationData: state.educationData.map((e) =>
        e.id === education.id ? education : e
      ),
    })),

  deleteEducation: (id) =>
    set((state) => ({
      educationData: state.educationData.filter((e) => e.id !== id),
    })),

  addExperience: (experience) =>
    set((state) => ({ experienceData: [...state.experienceData, experience] })),

  editExperience: (experience) =>
    set((state) => ({
      experienceData: state.experienceData.map((e) =>
        e.id === experience.id ? experience : e
      ),
    })),

  deleteExperience: (id) =>
    set((state) => ({
      experienceData: state.experienceData.filter((e) => e.id !== id),
    })),

  addSocialLink: (link) =>
    set((state) => ({
      socialLinks: [...state.socialLinks, { ...link, id: uuidv4() }],
    })),
  updateSocialLink: (id, link) =>
    set((state) => ({
      socialLinks: state.socialLinks.map((l) =>
        l.id === id ? { ...l, ...link } : l
      ),
    })),
  removeSocialLink: (id) =>
    set((state) => ({
      socialLinks: state.socialLinks.filter((l) => l.id !== id),
    })),
  setAboutText: (text) => set({ aboutText: text }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setSelectedCount: (selectedCount) => set({ selectedCount }),
  setPreferredCategories: (preferredCategories) => set({ preferredCategories }),
  reset: () => set(initialState),
  toggleCategory: (category) => {
    const { preferredCategories, setPreferredCategories } = get();
    const updatedCategories = preferredCategories.includes(category)
      ? preferredCategories.filter((c) => c !== category)
      : [...preferredCategories, category];
    setPreferredCategories(updatedCategories);
  },
  handleCompleteProfile: async () => {
    const { interests, preferredCategories, setIsLoading, setCurrentStep, currentStep } = get();
    if (interests.length === 0) return;
    setIsLoading(true);
    try {
      // await updateProfile({ interests, preferredCategories });
      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  },
  handlePrevStep: () => {
    const { currentStep, setCurrentStep } = get();
    setCurrentStep(currentStep - 1);
  },
  getRelevantTags: () => {
    const { preferredCategories } = get();
    let tags: string[] = [];
    preferredCategories.forEach((category: string) => {
  
    });
    return Array.from(new Set(tags));
  },
  setShowAddSkillModal: (open) => set({ showAddSkillModal: open }),
  setShowEditSkillModal: (open) => set({ showEditSkillModal: open }),
  setCurrentSkillToEdit: (skill) => set({ currentSkillToEdit: skill }),
  setSkillToDeleteId: (id) => set({ skillToDeleteId: id }),
  addSkill: (skill) =>
    set((state) => ({ skillsData: [...state.skillsData, { ...skill, id: uuidv4() }] })),
  editSkill: (updatedSkill) =>
    set((state) => ({
      skillsData: state.skillsData.map((s) => (s.id === updatedSkill.id ? updatedSkill : s)),
    })),
  deleteSkill: (id) =>
    set((state) => ({
      skillsData: state.skillsData.filter((s) => s.id !== id),
    })),
  handleAddSkill: (newSkill) => {
    get().addSkill(newSkill);
    set({ showAddSkillModal: false });
  },
  handleEditSkill: (updatedSkill) => {
    get().editSkill(updatedSkill);
    set({ showEditSkillModal: false, currentSkillToEdit: null });
  },
  handleDeleteSkill: () => {
    const id = get().skillToDeleteId;
    if (id) {
      get().deleteSkill(id);
      set({ skillToDeleteId: null });
    }
  },
  setInterestCategories: (interest, category) =>
    set((state) => ({
      interestCategories: { ...state.interestCategories, [interest]: category }
    })),
  removeInterestCategory: (interest) => set((state) => {
    const updated = { ...state.interestCategories };
    delete updated[interest];
    return { interestCategories: updated };
  }),

   professionalInfo: {
 
    headline: "",
    location: "",
    aboutText: "",
    phone: "",
    phoneCode: "",
    socialLinks: [],
  },
  setProfessionalInfo: (info) =>
    set((state) => ({
      professionalInfo: { ...state.professionalInfo, ...info },
    })),
}));
