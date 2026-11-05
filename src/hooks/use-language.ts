import { useTranslation } from 'react-i18next';

import { useUiStore } from '@/stores/ui-store';
import { DEFAULT_LANGUAGE, isLanguage, type Language } from '@/types/app';
import { writeLanguagePreference } from '@/utils/storage';

export function useLanguage() {
  const { i18n } = useTranslation();
  const storedLanguage = useUiStore((state) => state.language);
  const setStoredLanguage = useUiStore((state) => state.setLanguage);

  const language: Language = isLanguage(i18n.language)
    ? i18n.language
    : (storedLanguage ?? DEFAULT_LANGUAGE);

  const changeLanguage = async (next: Language): Promise<void> => {
    await i18n.changeLanguage(next);
    writeLanguagePreference(next);
    setStoredLanguage(next);
  };

  return { language, changeLanguage };
}
