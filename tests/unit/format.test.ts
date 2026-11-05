import { describe, expect, it } from 'vitest';

import { DEFAULT_TIME_ZONE, formatDate, formatDateTime, formatNumber } from '@/lib/format';

const ISO_DATE = '2026-11-05T00:00:00.000Z';

describe('format helpers', () => {
  it('targets Bangladesh time by default', () => {
    expect(DEFAULT_TIME_ZONE).toBe('Asia/Dhaka');
  });

  it('formats numbers per language', () => {
    expect(formatNumber(12345, 'en')).toBe('12,345');
    expect(formatNumber(12345, 'bn')).toBe('১২,৩৪৫');
  });

  it('formats dates deterministically in Bangladesh time', () => {
    expect(formatDate(ISO_DATE, 'en')).toBe('Nov 5, 2026');
    expect(formatDate(ISO_DATE, 'bn')).toContain('২০২৬');
  });

  it('includes a time component for date-times', () => {
    expect(formatDateTime(ISO_DATE, 'en')).toContain('2026');
    expect(formatDateTime(ISO_DATE, 'en')).toMatch(/AM|PM/);
  });

  it('rejects invalid dates', () => {
    expect(() => formatDate('not-a-date')).toThrow(RangeError);
  });
});
