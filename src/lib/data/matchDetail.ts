import type { Tournament, Match, Team } from './types';

export interface MatchDetailVM {
  match: Match;
  homeTeam: Team | null;
  awayTeam: Team | null;
  notes: string[];
}

export function buildMatchDetail(tournament: Tournament, slug: string): MatchDetailVM | null {
  const match = tournament.matches.find(m => m.slug === slug);
  if (!match) return null;

  const homeTeam = match.homeTeamId ? tournament.teams.find(t => t.id === match.homeTeamId) || null : null;
  const awayTeam = match.awayTeamId ? tournament.teams.find(t => t.id === match.awayTeamId) || null : null;

  // Placeholder for editorial notes in MVP
  const notes: string[] = [];

  return { match, homeTeam, awayTeam, notes };
}
