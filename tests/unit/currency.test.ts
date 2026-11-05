import { describe, expect, it } from 'vitest';

import { CURRENCY_CODE, CURRENCY_SYMBOL, formatBDT } from '@/lib/currency';

describe('formatBDT', () => {
  it('uses the BDT currency marker', () => {
    expect(CURRENCY_CODE).toBe('BDT');
    expect(CURRENCY_SYMBOL).toBe('৳');
  });

  it('formats English amounts with grouping and two decimals', () => {
    expect(formatBDT(1234.5, { language: 'en' })).toBe('৳1,234.50');
  });

  it('formats Bangla amounts with Bangla digits', () => {
    expect(formatBDT(1234, { language: 'bn' })).toBe('৳১,২৩৪.০০');
  });

  it('supports a custom number of fraction digits', () => {
    expect(formatBDT(99, { language: 'en', fractionDigits: 0 })).toBe('৳99');
  });

  it('rejects non-finite amounts', () => {
    expect(() => formatBDT(Number.NaN)).toThrow(RangeError);
    expect(() => formatBDT(Number.POSITIVE_INFINITY)).toThrow(RangeError);
  });
});
