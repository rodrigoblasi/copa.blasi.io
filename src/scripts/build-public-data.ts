import fs from 'node:fs';
import path from 'node:path';
import { loadTournament } from '../lib/data/loadTournament';
import { logger } from '../lib/observability/logger';

function buildPublicData() {
  try {
    const tournament = loadTournament();
    const destPath = path.join(process.cwd(), 'src/content/data/generated/public-tournament.json');
    fs.writeFileSync(destPath, JSON.stringify(tournament, null, 2));
    logger.info({ event: 'build-public-data-success', matchCount: tournament.matches.length });
  } catch (error) {
    logger.error({ event: 'build-public-data-failure', error: (error as Error).message });
    process.exit(1);
  }
}

buildPublicData();
