import { describe, expect, it } from 'vitest';
import { classifyMatchEmphasis } from '@/lib/data/emphasis';
import type { Match, Team } from '@/lib/data/types';

const teams: Team[] = [
  { id: 'brasil', name: 'Brasil', isBrazil: true, groupId: 'C' },
  { id: 'marrocos', name: 'Marrocos', isBrazil: false, groupId: 'C' },
  { id: 'haiti', name: 'Haiti', isBrazil: false, groupId: 'C' },
  { id: 'mexico', name: 'México', isBrazil: false, groupId: 'A' },
];

function match(overrides: Partial<Match>): Match {
  return {
    id: 'm1',
    slug: 'm1',
    phaseId: 'groups',
    date: null,
    kickoffBrt: null,
    status: 'future',
    homeTeamId: null,
    awayTeamId: null,
    score: null,
    freshnessState: 'fresh',
    ...overrides,
  };
}

describe('classifyMatchEmphasis', () => {
  it('prioritizes Brazil over Group C', () => {
    expect(classifyMatchEmphasis(match({ homeTeamId: 'brasil', awayTeamId: 'marrocos', groupId: 'C' }), teams)).toEqual({
      level: 'brazil',
      ariaLabel: 'Jogo do Brasil',
    });
  });

  it('marks Group C non-Brazil matches', () => {
    expect(classifyMatchEmphasis(match({ homeTeamId: 'marrocos', awayTeamId: 'haiti', groupId: 'C' }), teams)).toEqual({
      level: 'group-c',
      ariaLabel: 'Jogo do Grupo C',
    });
  });

  it('keeps regular matches unannotated', () => {
    expect(classifyMatchEmphasis(match({ homeTeamId: 'mexico', awayTeamId: null, groupId: 'A' }), teams)).toEqual({
      level: 'regular',
      ariaLabel: '',
    });
  });
});
