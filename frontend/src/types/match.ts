export interface Goal {
  id: string;
  scorer: string;
  minute: number;
  team: 'home' | 'away';
  timestamp: Date;
}

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: 'live' | 'finished' | 'scheduled';
  startTime: Date;
  goals: Goal[];
}

export interface MatchUpdateEvent {
  type: 'score_update' | 'goal' | 'match_end';
  match: Match;
  goal?: Goal;
}
