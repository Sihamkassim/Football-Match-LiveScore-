import { Match } from '../types/match';

// In-memory storage for matches
export const matches: Map<string, Match> = new Map();

// Initialize with some sample matches
const sampleMatches: Match[] = [
  {
    id: '1',
    homeTeam: 'Manchester United',
    awayTeam: 'Liverpool',
    homeScore: 0,
    awayScore: 0,
    status: 'live',
    startTime: new Date(),
    goals: []
  },
  {
    id: '2',
    homeTeam: 'Barcelona',
    awayTeam: 'Real Madrid',
    homeScore: 1,
    awayScore: 1,
    status: 'live',
    startTime: new Date(),
    goals: [
      {
        id: '1',
        scorer: 'Lewandowski',
        minute: 15,
        team: 'home',
        timestamp: new Date()
      },
      {
        id: '2',
        scorer: 'Vinicius Jr',
        minute: 28,
        team: 'away',
        timestamp: new Date()
      }
    ]
  },
  {
    id: '3',
    homeTeam: 'Bayern Munich',
    awayTeam: 'Borussia Dortmund',
    homeScore: 2,
    awayScore: 0,
    status: 'live',
    startTime: new Date(),
    goals: [
      {
        id: '3',
        scorer: 'Kane',
        minute: 10,
        team: 'home',
        timestamp: new Date()
      },
      {
        id: '4',
        scorer: 'Musiala',
        minute: 35,
        team: 'home',
        timestamp: new Date()
      }
    ]
  }
];

// Load sample matches
sampleMatches.forEach(match => {
  matches.set(match.id, match);
});

export const getAllMatches = (): Match[] => {
  return Array.from(matches.values());
};

export const getMatchById = (id: string): Match | undefined => {
  return matches.get(id);
};

export const updateMatch = (id: string, updatedMatch: Match): Match | undefined => {
  if (matches.has(id)) {
    matches.set(id, updatedMatch);
    return updatedMatch;
  }
  return undefined;
};

export const addMatch = (match: Match): Match => {
  matches.set(match.id, match);
  return match;
};

export const deleteMatch = (id: string): boolean => {
  return matches.delete(id);
};
