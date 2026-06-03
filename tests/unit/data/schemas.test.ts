import { describe, it, expect } from 'vitest';
import { MatchSchema, KnockoutSlotSchema } from '@/lib/data/schemas';

describe('Schemas', () => {
  it('validates a correct match', () => {
    const match = {
      id: 'm1', slug: 'm1', phaseId: 'p1', date: '2026-06-11', kickoffBrt: '16:00',
      status: 'future', homeTeamId: 't1', awayTeamId: 't2', score: null, freshnessState: 'fresh'
    };
    expect(MatchSchema.safeParse(match).success).toBe(true);
  });

  it('rejects final score for future match', () => {
    const match = {
      id: 'm1', slug: 'm1', phaseId: 'p1', date: '2026-06-11', kickoffBrt: '16:00',
      status: 'future', homeTeamId: 't1', awayTeamId: 't2',
      score: { homeGoals: 1, awayGoals: 0, state: 'final' },
      freshnessState: 'fresh'
    };
    expect(MatchSchema.safeParse(match).success).toBe(false);
  });

  it('rejects unconfirmed knockout slot with team fact', () => {
    const slot = { id: 's1', status: 'pending', teamId: 't1' };
    expect(KnockoutSlotSchema.safeParse(slot).success).toBe(false);
  });

  it('allows confirmed knockout slot with team fact', () => {
    const slot = { id: 's1', status: 'confirmed', teamId: 't1' };
    expect(KnockoutSlotSchema.safeParse(slot).success).toBe(true);
  });
});
