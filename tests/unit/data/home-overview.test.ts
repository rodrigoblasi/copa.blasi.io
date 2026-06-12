import { describe, it, expect } from 'vitest';
import { buildHomeOverview } from '@/lib/data/homeOverview';
import type { Tournament } from '@/lib/data/types';

describe('Home Overview VM Builder', () => {
  it('builds view model extracting Brazil matches and groups', () => {
    const t: Tournament = {
      id: 'wc', name: 'WC', teams: [{ id: 'br', name: 'Brazil', isBrazil: true }],
      matches: [{ id: 'm1', slug: 'm1', phaseId: 'groups', status: 'future', homeTeamId: 'br', awayTeamId: null, score: null, freshnessState: 'fresh', date: null, kickoffBrt: null }],
      groups: [{ id: 'g1', label: 'Group', teamIds: ['br'], matchIds: ['m1'] }],
      knockoutBlocks: [], knockoutSlots: []
    };
    
    const vm = buildHomeOverview(t);
    expect(vm.header.tournamentName).toBe('WC');
    expect(vm.brazilHighlight.nextMatch?.id).toBe('m1');
    expect(vm.groups.length).toBe(1);
    expect(vm.groups[0].matchesDetails[0].id).toBe('m1');
    expect(vm.brazilHighlight.brazilGroupMatches.map(m => m.id)).toEqual(['m1']);
  });

  it('builds Brazil group row and today matches by local match date', () => {
    const t: Tournament = {
      id: 'wc',
      name: 'WC',
      teams: [
        { id: 'br', name: 'Brazil', isBrazil: true },
        { id: 'ma', name: 'Morocco', isBrazil: false },
        { id: 'ca', name: 'Canada', isBrazil: false },
        { id: 'ba', name: 'Bosnia', isBrazil: false }
      ],
      matches: [
        { id: 'm1', slug: 'br-ma', phaseId: 'groups', groupId: 'g1', status: 'finished', homeTeamId: 'br', awayTeamId: 'ma', score: { homeGoals: 2, awayGoals: 0, state: 'final' }, freshnessState: 'fresh', date: '2026-06-11', kickoffBrt: '23:00' },
        { id: 'm2', slug: 'ma-br', phaseId: 'groups', groupId: 'g1', status: 'future', homeTeamId: 'ma', awayTeamId: 'br', score: null, freshnessState: 'fresh', date: '2026-06-18', kickoffBrt: '16:00' },
        { id: 'm3', slug: 'ca-ba', phaseId: 'groups', groupId: 'g2', status: 'future', homeTeamId: 'ca', awayTeamId: 'ba', score: null, freshnessState: 'fresh', date: '2026-06-12', kickoffBrt: '16:00' }
      ],
      groups: [
        { id: 'g1', label: 'Grupo C', teamIds: ['br', 'ma'], matchIds: ['m1', 'm2'] },
        { id: 'g2', label: 'Grupo B', teamIds: ['ca', 'ba'], matchIds: ['m3'] }
      ],
      knockoutBlocks: [], knockoutSlots: []
    };

    const vm = buildHomeOverview(t, '2026-06-12');

    expect(vm.brazilHighlight.nextMatch?.id).toBe('m2');
    expect(vm.brazilHighlight.brazilGroupMatches.map(m => m.id)).toEqual(['m1', 'm2']);
    expect(vm.brazilHighlight.todayMatches.map(m => m.id)).toEqual(['m3']);
    expect(vm.brazilHighlight.todayMatches[0].groupLabel).toBe('Grupo B');
    expect(vm.brazilHighlight.todayLabel).toBe('12 de junho');
  });
});
