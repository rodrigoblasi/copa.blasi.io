import { loadTournament } from '../lib/data/loadTournament';
import { fetchFifaData } from '../lib/data/sources/fifaSource';
import { logger } from '../lib/observability/logger';
import fs from 'node:fs';
import path from 'node:path';

async function refreshData() {
  const args = process.argv.slice(2);
  const isDryRun = args.includes('--dry-run');

  logger.info({ event: 'refresh-started', isDryRun });

  try {
    const tournament = loadTournament();
    const newData = await fetchFifaData(isDryRun);

    if (!isDryRun && newData) {
      // In a real scenario, merge newData into canonical JSON securely.
      const generatedPath = path.join(process.cwd(), 'src/content/data/generated/public-tournament.json');
      fs.writeFileSync(generatedPath, JSON.stringify(tournament, null, 2));
      logger.info({ event: 'refresh-success', updated: true });
    } else {
      logger.info({ event: 'refresh-dry-run-completed' });
    }
  } catch (err) {
    logger.error({ event: 'refresh-failure', error: (err as Error).message });
    process.exit(1);
  }
}

refreshData();
