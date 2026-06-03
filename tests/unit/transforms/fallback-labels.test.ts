import { describe, it, expect } from 'vitest';
import { buildFallbackSummary } from '@/lib/data/fallbackSummary';
import type { Tournament } from '@/lib/data/types';

describe('Fallback Labels & Summaries', () => {
  it('identifies when manual intervention is required', () => {
    const t = {
      id: 'wc2026', name: 'WC', teams: [],
      matches: [
        { id: '1', slug: '1', phaseId: 'p', date: null, kickoffBrt: null, status: 'data-problem', homeTeamId: 'a', awayTeamId: 'b', score: null, freshnessState: 'conflicting' }
      ],
      groups: [], knockoutBlocks: [], knockoutSlots: []
    } as unknown as Tournament;
    
    const summary = buildFallbackSummary(t);
    expect(summary.requiresManualIntervention).toBe(true);
    expect(summary.conflictingMatches).toBe(1);
  });
});
