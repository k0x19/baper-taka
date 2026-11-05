import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import bnTranslation from '@/locales/bn/translation.json';
import enTranslation from '@/locales/en/translation.json';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '@/types/app';
import { readLanguagePreference } from '@/utils/storage';

export const resources = {
  bn: { translation: bnTranslation },
  en: { translation: enTranslation },
} as const;

void i18n.use(initReactI18next).init({
  // Bundled resources need no async backend; synchronous init avoids a
  // post-render language event (and act() noise in tests).
  initAsync: false,
  resources,
  lng: readLanguagePreference() ?? DEFAULT_LANGUAGE,
  fallbackLng: 'en',
  supportedLngs: [...SUPPORTED_LANGUAGES],
  nonExplicitSupportedLngs: false,
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
  returnNull: false,
});

export default i18n;
