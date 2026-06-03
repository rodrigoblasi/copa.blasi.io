import { describe, it, expect } from 'vitest';
import { buildMatchDetail } from '@/lib/data/matchDetail';
import type { Tournament } from '@/lib/data/types';

describe('Match Detail Builder', () => {
  it('extracts match, teams, and related metadata correctly', () => {
    const t = {
      id: 'wc', matches: [
        { id: 'm1', slug: 'bra-ser', phaseId: 'groups', homeTeamId: 'br', awayTeamId: 'sr', status: 'future' }
      ],
      teams: [
        { id: 'br', name: 'Brazil' },
        { id: 'sr', name: 'Serbia' }
      ],
      groups: [], knockoutBlocks: [], knockoutSlots: []
    } as unknown as Tournament;
    
    const vm = buildMatchDetail(t, 'bra-ser');
    expect(vm).not.toBeNull();
    expect(vm?.homeTeam?.name).toBe('Brazil');
    expect(vm?.awayTeam?.name).toBe('Serbia');
  });

  it('returns null if match is missing', () => {
    const t = { matches: [], teams: [] } as unknown as Tournament;
    expect(buildMatchDetail(t, 'non-existent')).toBeNull();
  });
});
