import type { Tournament, GroupSection, KnockoutBlock, Team, Match } from './types';

export interface HomeOverviewVM {
  header: { tournamentName: string };
  brazilHighlight: { nextMatch: Match | null; status: string };
  groups: Array<GroupSection & { matchesDetails: Match[] }>;
  knockout: KnockoutBlock[];
}

function enrichMatch(match: Match, teams: Team[]): Match {
  const home = teams.find(t => t.id === match.homeTeamId);
  const away = teams.find(t => t.id === match.awayTeamId);
  return {
    ...match,
    homeTeamName: home?.name || match.homeTeamLabel || 'A definir',
    awayTeamName: away?.name || match.awayTeamLabel || 'A definir',
    homeTeamCode: home?.countryCode || null,
    awayTeamCode: away?.countryCode || null,
  };
}

export function buildHomeOverview(tournament: Tournament): HomeOverviewVM {
  const brazilTeam = tournament.teams.find(t => t.isBrazil);
  const brazilMatch = brazilTeam 
    ? tournament.matches.find(m => (m.homeTeamId === brazilTeam.id || m.awayTeamId === brazilTeam.id) && m.status !== 'finished') 
    : null;

  return {
    header: { tournamentName: tournament.name },
    brazilHighlight: {
      nextMatch: brazilMatch ? enrichMatch(brazilMatch, tournament.teams) : null,
      status: brazilMatch ? 'Próximo jogo do Brasil' : 'Aguardando definição'
    },
    groups: tournament.groups.map(g => ({
      ...g,
      matchesDetails: g.matchIds
        .map(mid => tournament.matches.find(m => m.id === mid)!)
        .filter(Boolean)
        .map(m => enrichMatch(m, tournament.teams))
    })),
    knockout: tournament.knockoutBlocks
  };
}
