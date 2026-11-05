export const SUPPORTED_LANGUAGES = ['bn', 'en'] as const;

export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = 'bn';

/** ICU locale tags used by Intl formatters. `bn-BD` renders Bangla digits. */
export const LANGUAGE_LOCALE: Record<Language, string> = {
  bn: 'bn-BD',
  en: 'en-US',
};

export function isLanguage(value: string): value is Language {
  return (SUPPORTED_LANGUAGES as readonly string[]).includes(value);
}
