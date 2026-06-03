import type { Tournament } from './types';

export function buildFallbackSummary(tournament: Tournament) {
  const conflictingMatches = tournament.matches.filter(m => m.freshnessState === 'conflicting').length;
  const staleMatches = tournament.matches.filter(m => m.freshnessState === 'stale').length;
  const unknownMatches = tournament.matches.filter(m => m.status === 'unknown' || m.status === 'data-problem').length;

  return {
    totalMatches: tournament.matches.length,
    conflictingMatches,
    staleMatches,
    unknownMatches,
    requiresManualIntervention: conflictingMatches > 0 || unknownMatches > 0
  };
}
