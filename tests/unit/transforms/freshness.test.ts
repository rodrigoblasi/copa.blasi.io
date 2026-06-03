import { describe, it, expect } from 'vitest';
import { calculateFreshness } from '@/lib/data/freshness';

describe('Freshness calculation', () => {
  it('returns stale if > 10m in live window', () => {
    const lastUpdated = new Date('2026-06-11T16:00:00Z');
    const now = new Date('2026-06-11T16:15:00Z');
    expect(calculateFreshness(lastUpdated, now, true, true)).toBe('stale');
  });

  it('returns fresh if < 10m in live window', () => {
    const lastUpdated = new Date('2026-06-11T16:00:00Z');
    const now = new Date('2026-06-11T16:05:00Z');
    expect(calculateFreshness(lastUpdated, now, true, true)).toBe('fresh');
  });
});
