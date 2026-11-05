import { LANGUAGE_LOCALE, type Language } from '@/types/app';

export const CURRENCY_CODE = 'BDT';
export const CURRENCY_SYMBOL = '৳';

export interface FormatBdtOptions {
  language?: Language;
  /** Fraction digits. Prices and payment amounts in BDT normally use 2. */
  fractionDigits?: number;
}

/**
 * Format a monetary amount in Bangladeshi Taka.
 *
 * The leading ৳ symbol is explicit so the brand's currency marker is consistent
 * in both languages; `Intl.NumberFormat` handles grouping, decimals and
 * Bangla/English digits. Server-side code must still validate every amount.
 */
export function formatBDT(amount: number, options: FormatBdtOptions = {}): string {
  if (!Number.isFinite(amount)) {
    throw new RangeError('formatBDT expects a finite number');
  }

  const { language = 'bn', fractionDigits = 2 } = options;
  const formatter = new Intl.NumberFormat(LANGUAGE_LOCALE[language], {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });

  return `${CURRENCY_SYMBOL}${formatter.format(amount)}`;
}
