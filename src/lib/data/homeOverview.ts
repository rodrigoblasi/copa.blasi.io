import type { Tournament, GroupSection, KnockoutBlock, Team, Match } from './types';

export interface HomeOverviewVM {
  header: { tournamentName: string };
  brazilHighlight: { nextMatch: Match | null; status: string };
  groups: Array<GroupSection & { matchesDetails: Match[] }>;
  knockout: KnockoutBlock[];
}

export function buildHomeOverview(tournament: Tournament): HomeOverviewVM {
  const brazilTeam = tournament.teams.find(t => t.isBrazil);
  const brazilMatch = brazilTeam 
    ? tournament.matches.find(m => (m.homeTeamId === brazilTeam.id || m.awayTeamId === brazilTeam.id) && m.status !== 'finished') 
    : null;

  return {
    header: { tournamentName: tournament.name },
    brazilHighlight: {
      nextMatch: brazilMatch || null,
      status: brazilMatch ? 'Próximo jogo do Brasil' : 'Aguardando definição'
    },
    groups: tournament.groups.map(g => ({
      ...g,
      matchesDetails: g.matchIds.map(mid => tournament.matches.find(m => m.id === mid)!).filter(Boolean)
    })),
    knockout: tournament.knockoutBlocks
  };
}
