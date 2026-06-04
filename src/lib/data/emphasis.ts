import type { Match, Team } from './types';

export type MatchEmphasisLevel = 'brazil' | 'group-c' | 'featured' | 'regular';

export interface MatchEmphasis {
  level: MatchEmphasisLevel;
  ariaLabel: string;
}

export function classifyMatchEmphasis(match: Match, teams: Team[], featured = false): MatchEmphasis {
  const home = teams.find(team => team.id === match.homeTeamId);
  const away = teams.find(team => team.id === match.awayTeamId);

  if (home?.isBrazil || away?.isBrazil || match.homeTeamId === 'brasil' || match.awayTeamId === 'brasil') {
    return { level: 'brazil', ariaLabel: 'Jogo do Brasil' };
  }

  if (isGroupC(match.groupId) || isGroupC(home?.groupId) || isGroupC(away?.groupId)) {
    return { level: 'group-c', ariaLabel: 'Jogo do Grupo C' };
  }

  if (featured) {
    return { level: 'featured', ariaLabel: 'Jogo em destaque' };
  }

  return { level: 'regular', ariaLabel: '' };
}

function isGroupC(groupId: string | null | undefined): boolean {
  return groupId === 'C' || groupId === 'g_c';
}
