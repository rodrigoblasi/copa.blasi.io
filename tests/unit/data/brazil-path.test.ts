import { describe, it, expect } from 'vitest';
import { buildBrazilPath } from '@/lib/data/brazilPath';
import type { Tournament } from '@/lib/data/types';

describe('Brazil Path Builder', () => {
  it('identifies group matches and knockout path components', () => {
    const t = {
      id: 'wc', name: 'WC', groups: [],
      teams: [
        { id: 'br', name: 'Brazil', isBrazil: true },
        { id: 'ar', name: 'Argentina', isBrazil: false }
      ],
      matches: [
        { id: 'm1', phaseId: 'groups', homeTeamId: 'br', awayTeamId: 'ar', status: 'finished' }
      ],
      knockoutSlots: [
        { id: 's1', status: 'confirmed', teamId: 'br' },
        { id: 's2', status: 'confirmed', teamId: 'ar' }
      ],
      knockoutBlocks: [
        { id: 'kb1', round: 'R16', matchId: 'm2', displayOrder: 1, slotIds: ['s1', 's2'], advancesToSlotId: null }
      ]
    } as unknown as Tournament;
    
    const vm = buildBrazilPath(t);
    expect(vm.groupMatches.length).toBe(1);
    expect(vm.knockoutPath.length).toBe(1);
    expect(vm.knockoutPath[0].opponentInfo.label).toBe('Argentina');
  });
});
