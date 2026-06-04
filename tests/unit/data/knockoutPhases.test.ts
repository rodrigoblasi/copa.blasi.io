import { describe, expect, it } from 'vitest';
import { groupKnockoutMatchesByRound } from '@/lib/data/knockoutPhases';
import type { Match } from '@/lib/data/types';

function knockoutMatch(id: number, round: string): Match {
  return {
    id: `m${id}`,
    slug: `m${id}`,
    phaseId: 'knockout',
    round,
    date: `2026-07-${String(id).padStart(2, '0')}`,
    kickoffBrt: '16:00',
    status: 'future',
    homeTeamId: null,
    awayTeamId: null,
    score: null,
    freshnessState: 'fresh',
  };
}

describe('groupKnockoutMatchesByRound', () => {
  it('groups knockout matches by official Portuguese rounds', () => {
    const matches = [
      ...Array.from({ length: 16 }, (_, index) => knockoutMatch(73 + index, 'Round of 32')),
      ...Array.from({ length: 8 }, (_, index) => knockoutMatch(89 + index, 'Round of 16')),
      ...Array.from({ length: 4 }, (_, index) => knockoutMatch(97 + index, 'Quartas de Final')),
      ...Array.from({ length: 2 }, (_, index) => knockoutMatch(101 + index, 'Semifinal')),
      knockoutMatch(103, 'Disputa de 3º lugar'),
      knockoutMatch(104, 'Final'),
    ];

    const groups = groupKnockoutMatchesByRound(matches);

    expect(groups.map(group => [group.label, group.matches.length])).toEqual([
      ['32 avos de final', 16],
      ['Oitavas de final', 8],
      ['Quartas de final', 4],
      ['Semifinal', 2],
      ['Disputa de 3º lugar', 1],
      ['Final', 1],
    ]);
  });
});
