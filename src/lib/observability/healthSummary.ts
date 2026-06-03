import type { Tournament } from '../data/types';
import { buildFallbackSummary } from '../data/fallbackSummary';

export function buildHealthSummary(tournament: Tournament) {
  const fallback = buildFallbackSummary(tournament);
  
  return {
    timestamp: new Date().toISOString(),
    status: fallback.requiresManualIntervention ? 'warning' : 'healthy',
    metrics: {
      matchesConfigured: fallback.totalMatches,
      matchesStale: fallback.staleMatches,
      matchesConflicting: fallback.conflictingMatches,
      matchesUnknown: fallback.unknownMatches
    }
  };
}
