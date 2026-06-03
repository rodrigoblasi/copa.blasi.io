import { loadTournament } from '../lib/data/loadTournament';
import { logger } from '../lib/observability/logger';

function validateData() {
  try {
    const tournament = loadTournament();
    logger.info({ event: 'validate-data-success', matchCount: tournament.matches.length });
  } catch (error) {
    logger.error({ event: 'validate-data-failure', error: (error as Error).message });
    process.exit(1);
  }
}

validateData();
