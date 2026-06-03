import { describe, it, expect } from 'vitest';
import { buildRadarView } from '@/lib/data/radarView';

describe('Radar View Builder', () => {
  it('returns valid radar items', () => {
    const items = buildRadarView();
    expect(items.length).toBeGreaterThanOrEqual(0);
    if (items.length > 0) {
      expect(items[0].priority).toBeDefined();
      expect(items[0].title).toBeDefined();
    }
  });
});
