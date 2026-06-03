import { describe, it, expect } from 'vitest';
import { buildHealthSummary } from '@/lib/observability/healthSummary';
import type { Tournament } from '@/lib/data/types';

describe('Health Summary Integration', () => {
  it('identifies healthy systems', () => {
    const t = { matches: [], teams: [], groups: [], knockoutBlocks: [], knockoutSlots: [] } as unknown as Tournament;
    const health = buildHealthSummary(t);
    expect(health.status).toBe('healthy');
    expect(health.metrics.matchesConfigured).toBe(0);
  });
});
