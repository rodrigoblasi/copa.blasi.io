import { describe, expect, it } from 'vitest';
import { getScoreDisplay } from '@/lib/data/scoreDisplay';
import type { Match } from '@/lib/data/types';

function match(score: Match['score'], status: Match['status'] = 'future'): Match {
  return {
    id: 'm1',
    slug: 'm1',
    phaseId: 'groups',
    date: null,
    kickoffBrt: null,
    status,
    homeTeamId: null,
    awayTeamId: null,
    score,
    freshnessState: 'fresh',
  };
}

describe('getScoreDisplay', () => {
  it('shows future placeholders for unavailable scores', () => {
    expect(getScoreDisplay(match(null))).toBe('- x -');
    expect(getScoreDisplay(match({ homeGoals: null, awayGoals: null, state: 'unavailable' }))).toBe('- x -');
  });

  it('shows actual scores for finished or live scores', () => {
    expect(getScoreDisplay(match({ homeGoals: 2, awayGoals: 1, state: 'final' }, 'finished'))).toBe('2 x 1');
    expect(getScoreDisplay(match({ homeGoals: 1, awayGoals: 1, state: 'live' }, 'live'))).toBe('1 x 1');
  });

  it('preserves uncertainty display for data-problem score states', () => {
    expect(getScoreDisplay(match({ homeGoals: null, awayGoals: null, state: 'source-problem' }, 'data-problem'))).toBe('Placar em revisão');
  });
});
