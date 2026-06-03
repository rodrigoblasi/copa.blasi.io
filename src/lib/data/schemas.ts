import { z } from 'zod';

export const MatchStatusSchema = z.enum(['unknown', 'future', 'live', 'finished', 'postponed', 'cancelled', 'data-problem']);
export const FreshnessStateSchema = z.enum(['pending', 'fresh', 'stale', 'conflicting', 'source-problem']);
export const ScoreStateSchema = z.enum(['unavailable', 'live', 'final', 'disputed', 'source-problem']);
export const KnockoutSlotStatusSchema = z.enum(['pending', 'conditional', 'confirmed', 'unknown', 'conflicting']);

export const TeamSchema = z.object({
  id: z.string(),
  name: z.string(),
  shortName: z.string().optional(),
  countryCode: z.string().optional(),
  isBrazil: z.boolean(),
  groupId: z.string().optional()
});

export const ScoreSchema = z.object({
  homeGoals: z.number().nullable(),
  awayGoals: z.number().nullable(),
  penalties: z.object({ home: z.number(), away: z.number() }).nullable().optional(),
  state: ScoreStateSchema
});

export const MatchSchema = z.object({
  id: z.string(),
  slug: z.string(),
  phaseId: z.string(),
  groupId: z.string().nullable().optional(),
  date: z.string().nullable(),
  kickoffBrt: z.string().nullable(),
  status: MatchStatusSchema,
  homeTeamId: z.string().nullable(),
  awayTeamId: z.string().nullable(),
  score: ScoreSchema.nullable(),
  freshnessState: FreshnessStateSchema
}).refine(data => {
  if (data.score?.state === 'final') {
    return ['finished', 'data-problem'].includes(data.status);
  }
  return true;
}, { message: "Match must be finished to have a final score" });

export const KnockoutSlotSchema = z.object({
  id: z.string(),
  status: KnockoutSlotStatusSchema,
  teamId: z.string().nullable()
}).refine(data => {
  if (data.status !== 'confirmed' && data.status !== 'conditional' && data.teamId !== null) {
     return false;
  }
  return true;
}, { message: "Unconfirmed slots cannot have a teamId unless conditional" });

export const KnockoutBlockSchema = z.object({
  id: z.string(),
  round: z.string(),
  matchId: z.string().nullable(),
  displayOrder: z.number(),
  slotIds: z.array(z.string()),
  advancesToSlotId: z.string().nullable()
});

export const GroupSectionSchema = z.object({
  id: z.string(),
  label: z.string(),
  teamIds: z.array(z.string()),
  matchIds: z.array(z.string())
});

export const TournamentSchema = z.object({
  id: z.string(),
  name: z.string(),
  teams: z.array(TeamSchema),
  matches: z.array(MatchSchema),
  groups: z.array(GroupSectionSchema).default([]),
  knockoutBlocks: z.array(KnockoutBlockSchema).default([]),
  knockoutSlots: z.array(KnockoutSlotSchema).default([])
});
