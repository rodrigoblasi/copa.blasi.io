import type { FreshnessState } from './types';

export function calculateFreshness(lastUpdated: Date, now: Date, isMatchDay: boolean, isLiveWindow: boolean): FreshnessState {
  const diffMinutes = (now.getTime() - lastUpdated.getTime()) / 60000;
  
  if (isLiveWindow) {
    if (diffMinutes > 10) return 'stale';
    return 'fresh';
  }
  
  if (isMatchDay) {
    if (diffMinutes > 60) return 'stale';
    return 'fresh';
  }
  
  if (diffMinutes > 24 * 60) return 'stale';
  return 'fresh';
}
