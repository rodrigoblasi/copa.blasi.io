import fs from 'node:fs';
import path from 'node:path';
import { TournamentSchema } from './schemas';
import type { Tournament } from './types';

export function loadTournament(filePath?: string): Tournament {
  const canonicalPath = filePath || path.join(process.cwd(), 'src/content/data/canonical/tournament.json');
  const content = fs.readFileSync(canonicalPath, 'utf-8');
  const data = JSON.parse(content);
  return TournamentSchema.parse(data);
}
