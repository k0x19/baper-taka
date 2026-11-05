import { LANGUAGE_LOCALE, type Language } from '@/types/app';
import { DEFAULT_LANGUAGE } from '@/types/app';

/** Business times are presented in Bangladesh Standard Time unless overridden. */
export const DEFAULT_TIME_ZONE = 'Asia/Dhaka';

export function formatNumber(value: number, language: Language = DEFAULT_LANGUAGE): string {
  return new Intl.NumberFormat(LANGUAGE_LOCALE[language]).format(value);
}

export function formatDate(
  value: Date | string,
  language: Language = DEFAULT_LANGUAGE,
  options: Intl.DateTimeFormatOptions = {},
): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new RangeError('formatDate expects a valid Date or ISO date string');
  }

  return new Intl.DateTimeFormat(LANGUAGE_LOCALE[language], {
    timeZone: DEFAULT_TIME_ZONE,
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  }).format(date);
}

export function formatDateTime(
  value: Date | string,
  language: Language = DEFAULT_LANGUAGE,
): string {
  return formatDate(value, language, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}
