import { create } from 'zustand';

export interface SurveyQuestion {
  id: string;
  type: 'multiple-choice' | 'single-choice' | 'text' | 'textarea' | 'rating' | 'boolean' | 'date' | 'number';
  title: string;
  description?: string;
  required: boolean;
  options?: string[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
}

export interface SurveySettings {
  isPublic: boolean;
  allowAnonymous: boolean;
  multipleResponses: boolean;
  showResults: boolean;
  targetResponses: number;
  endDate?: Date;
  reward?: string;
  category: string;
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  category: string;
  questions: SurveyQuestion[];
  settings: SurveySettings;
  status: 'draft' | 'active' | 'completed' | 'paused';
  createdAt: Date;
  updatedAt: Date;
  responses: number;
}

interface SurveyStore {
  currentSurvey: Partial<Survey>;
  surveys: Survey[];
  
  // Survey management
  createSurvey: () => void;
  updateSurvey: (updates: Partial<Survey>) => void;
  saveSurvey: () => void;
  publishSurvey: () => void;
  deleteSurvey: (id: string) => void;
  
  // Question management
  addQuestion: (type: SurveyQuestion['type']) => void;
  updateQuestion: (id: string, updates: Partial<SurveyQuestion>) => void;
  deleteQuestion: (id: string) => void;
  reorderQuestions: (fromIndex: number, toIndex: number) => void;
  duplicateQuestion: (id: string) => void;
  
  // Option management
  addOption: (questionId: string) => void;
  updateOption: (questionId: string, optionIndex: number, value: string) => void;
  deleteOption: (questionId: string, optionIndex: number) => void;
  
  // Settings management
  updateSettings: (updates: Partial<SurveySettings>) => void;
}

const defaultSettings: SurveySettings = {
  isPublic: true,
  allowAnonymous: false,
  multipleResponses: false,
  showResults: true,
  targetResponses: 100,
  category: 'General',
};

export const useSurveyStore = create<SurveyStore>((set, get) => ({
  currentSurvey: {
    title: '',
    description: '',
    questions: [],
    settings: defaultSettings,
    status: 'draft',
  },
  surveys: [],

  createSurvey: () => {
    set({
      currentSurvey: {
        id: `survey-${Date.now()}`,
        title: '',
        description: '',
        questions: [],
        settings: defaultSettings,
        status: 'draft',
        createdAt: new Date(),
        updatedAt: new Date(),
        responses: 0,
      },
    });
  },

  updateSurvey: (updates) => {
    set((state) => ({
      currentSurvey: {
        ...state.currentSurvey,
        ...updates,
        updatedAt: new Date(),
      },
    }));
  },

  saveSurvey: () => {
    const { currentSurvey, surveys } = get();
    if (!currentSurvey.id) return;

    const existingIndex = surveys.findIndex(s => s.id === currentSurvey.id);
    const survey = currentSurvey as Survey;

    if (existingIndex >= 0) {
      set((state) => ({
        surveys: state.surveys.map((s, i) => i === existingIndex ? survey : s),
      }));
    } else {
      set((state) => ({
        surveys: [...state.surveys, survey],
      }));
    }
  },

  publishSurvey: () => {
    const { updateSurvey, saveSurvey } = get();
    updateSurvey({ status: 'active' });
    saveSurvey();
  },

  deleteSurvey: (id) => {
    set((state) => ({
      surveys: state.surveys.filter(s => s.id !== id),
    }));
  },

  addQuestion: (type) => {
    const newQuestion: SurveyQuestion = {
      id: `question-${Date.now()}`,
      type,
      title: '',
      required: false,
      options: type === 'multiple-choice' || type === 'single-choice' 
        ? ['Option 1', 'Option 2'] 
        : undefined,
    };

    set((state) => ({
      currentSurvey: {
        ...state.currentSurvey,
        questions: [...(state.currentSurvey.questions || []), newQuestion],
        updatedAt: new Date(),
      },
    }));
  },

  updateQuestion: (id, updates) => {
    set((state) => ({
      currentSurvey: {
        ...state.currentSurvey,
        questions: state.currentSurvey.questions?.map(q => 
          q.id === id ? { ...q, ...updates } : q
        ) || [],
        updatedAt: new Date(),
      },
    }));
  },

  deleteQuestion: (id) => {
    set((state) => ({
      currentSurvey: {
        ...state.currentSurvey,
        questions: state.currentSurvey.questions?.filter(q => q.id !== id) || [],
        updatedAt: new Date(),
      },
    }));
  },

  reorderQuestions: (fromIndex, toIndex) => {
    set((state) => {
      const questions = [...(state.currentSurvey.questions || [])];
      const [reorderedItem] = questions.splice(fromIndex, 1);
      questions.splice(toIndex, 0, reorderedItem);

      return {
        currentSurvey: {
          ...state.currentSurvey,
          questions,
          updatedAt: new Date(),
        },
      };
    });
  },

  duplicateQuestion: (id) => {
    const { currentSurvey } = get();
    const question = currentSurvey.questions?.find(q => q.id === id);
    if (!question) return;

    const duplicatedQuestion: SurveyQuestion = {
      ...question,
      id: `question-${Date.now()}`,
      title: `${question.title} (Copy)`,
    };

    set((state) => ({
      currentSurvey: {
        ...state.currentSurvey,
        questions: [...(state.currentSurvey.questions || []), duplicatedQuestion],
        updatedAt: new Date(),
      },
    }));
  },

  addOption: (questionId) => {
    const { updateQuestion } = get();
    const { currentSurvey } = get();
    const question = currentSurvey.questions?.find(q => q.id === questionId);
    
    if (question && question.options) {
      updateQuestion(questionId, {
        options: [...question.options, `Option ${question.options.length + 1}`],
      });
    }
  },

  updateOption: (questionId, optionIndex, value) => {
    const { updateQuestion } = get();
    const { currentSurvey } = get();
    const question = currentSurvey.questions?.find(q => q.id === questionId);
    
    if (question && question.options) {
      const newOptions = [...question.options];
      newOptions[optionIndex] = value;
      updateQuestion(questionId, { options: newOptions });
    }
  },

  deleteOption: (questionId, optionIndex) => {
    const { updateQuestion } = get();
    const { currentSurvey } = get();
    const question = currentSurvey.questions?.find(q => q.id === questionId);
    
    if (question && question.options && question.options.length > 2) {
      const newOptions = question.options.filter((_, index) => index !== optionIndex);
      updateQuestion(questionId, { options: newOptions });
    }
  },

  updateSettings: (updates) => {
    set((state) => ({
      currentSurvey: {
        ...state.currentSurvey,
        settings: {
          ...(state.currentSurvey.settings || defaultSettings),
          ...updates,
        } as SurveySettings,
        updatedAt: new Date(),
      },
    }));
  },
}));
