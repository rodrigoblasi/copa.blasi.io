export type MatchStatus = 'unknown' | 'future' | 'live' | 'finished' | 'postponed' | 'cancelled' | 'data-problem';
export type FreshnessState = 'pending' | 'fresh' | 'stale' | 'conflicting' | 'source-problem';
export type ScoreState = 'unavailable' | 'live' | 'final' | 'disputed' | 'source-problem';
export type KnockoutSlotStatus = 'pending' | 'conditional' | 'confirmed' | 'unknown' | 'conflicting';

export interface Team {
  id: string;
  name: string;
  shortName?: string;
  countryCode?: string;
  isBrazil: boolean;
  groupId?: string;
}

export interface Score {
  homeGoals: number | null;
  awayGoals: number | null;
  penalties?: { home: number; away: number } | null;
  state: ScoreState;
}

export interface Match {
  id: string;
  slug: string;
  phaseId: string;
  groupId?: string | null;
  round?: string;
  date: string | null;
  kickoffBrt: string | null;
  status: MatchStatus;
  homeTeamId: string | null;
  awayTeamId: string | null;
  homeTeamName?: string | null;
  awayTeamName?: string | null;
  homeTeamCode?: string | null;
  awayTeamCode?: string | null;
  homeTeamLabel?: string | null;
  awayTeamLabel?: string | null;
  venue?: string | null;
  city?: string | null;
  stadiumLabel?: string | null;
  stadiumMapUrl?: string | null;
  groupLabel?: string | null;
  emphasisLevel?: 'brazil' | 'group-c' | 'featured' | 'regular';
  emphasisAriaLabel?: string;
  score: Score | null;
  freshnessState: FreshnessState;
}

export interface KnockoutSlot {
  id: string;
  status: KnockoutSlotStatus;
  teamId: string | null;
}

export interface KnockoutBlock {
  id: string;
  round: string;
  matchId: string | null;
  displayOrder: number;
  slotIds: string[];
  advancesToSlotId: string | null;
}

export interface GroupSection {
  id: string;
  label: string;
  teamIds: string[];
  matchIds: string[];
}

export interface Tournament {
  id: string;
  name: string;
  teams: Team[];
  matches: Match[];
  groups: GroupSection[];
  knockoutBlocks: KnockoutBlock[];
  knockoutSlots: KnockoutSlot[];
}
