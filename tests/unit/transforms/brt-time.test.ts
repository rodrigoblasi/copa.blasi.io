import { describe, it, expect } from 'vitest';
import { toBrtTime } from '@/lib/data/brt-time';

describe('BRT Time', () => {
  it('converts UTC to BRT (UTC-3)', () => {
    expect(toBrtTime('2026-06-11T19:00:00Z')).toBe('16:00');
  });
});
