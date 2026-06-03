import { TournamentSchema } from './schemas';

export function validateTournament(data: unknown) {
  return TournamentSchema.safeParse(data);
}
