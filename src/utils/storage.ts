import { isLanguage, type Language } from '@/types/app';

const LANGUAGE_STORAGE_KEY = 'baper-taka.language';

/**
 * localStorage may be unavailable (private mode, SSR, disabled storage).
 * A language preference is optional, so failures are intentionally ignored.
 */
export function readLanguagePreference(): Language | null {
  try {
    const stored = globalThis.localStorage?.getItem(LANGUAGE_STORAGE_KEY);
    return stored !== null && stored !== undefined && isLanguage(stored) ? stored : null;
  } catch {
    return null;
  }
}

export function writeLanguagePreference(language: Language): void {
  try {
    globalThis.localStorage?.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // Preference persistence is best-effort only.
  }
}
