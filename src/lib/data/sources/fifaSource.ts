import { logger } from '../../observability/logger';
import type { Tournament } from '../types';

export async function fetchFifaData(dryRun = false): Promise<Partial<Tournament> | null> {
  logger.info({ event: 'fetch-source', source: 'fifa-official', dryRun });
  if (dryRun) {
    logger.info({ event: 'fetch-source-dry-run', source: 'fifa-official' });
    return null;
  }
  // Simulated fetch
  return { id: 'wc2026', name: 'FIFA World Cup 2026' };
}
