import { describe, it, expect } from 'vitest';
import { buildHomeOverview } from '@/lib/data/homeOverview';
import type { Tournament } from '@/lib/data/types';

describe('Home Overview VM Builder', () => {
  it('builds view model extracting Brazil matches and groups', () => {
    const t: Tournament = {
      id: 'wc', name: 'WC', teams: [{ id: 'br', name: 'Brazil', isBrazil: true }],
      matches: [{ id: 'm1', slug: 'm1', phaseId: 'p', status: 'future', homeTeamId: 'br', awayTeamId: null, score: null, freshnessState: 'fresh', date: null, kickoffBrt: null }],
      groups: [{ id: 'g1', label: 'Group', teamIds: ['br'], matchIds: ['m1'] }],
      knockoutBlocks: [], knockoutSlots: []
    };
    
    const vm = buildHomeOverview(t);
    expect(vm.header.tournamentName).toBe('WC');
    expect(vm.brazilHighlight.nextMatch?.id).toBe('m1');
    expect(vm.groups.length).toBe(1);
    expect(vm.groups[0].matchesDetails[0].id).toBe('m1');
  });
});
