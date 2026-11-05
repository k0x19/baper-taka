import { create } from 'zustand';

import { DEFAULT_LANGUAGE, type Language } from '@/types/app';
import { readLanguagePreference } from '@/utils/storage';

/**
 * Phase 01 keeps only genuinely shared UI state here: the active language.
 * Cart, auth and admin state will be added only when their features exist.
 */
interface UiState {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const useUiStore = create<UiState>((set) => ({
  language: readLanguagePreference() ?? DEFAULT_LANGUAGE,
  setLanguage: (language) => set({ language }),
}));
