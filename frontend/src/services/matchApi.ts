import { Match } from '../types/match';

const API_BASE_URL = '/api';

export const matchApi = {
  // Get all matches
  async getAllMatches(): Promise<Match[]> {
    const response = await fetch(`${API_BASE_URL}/matches`);
    if (!response.ok) throw new Error('Failed to fetch matches');
    return response.json();
  },

  // Get single match
  async getMatchById(id: string): Promise<Match> {
    const response = await fetch(`${API_BASE_URL}/matches/${id}`);
    if (!response.ok) throw new Error('Failed to fetch match');
    return response.json();
  },

  // Admin: Update score
  async updateScore(id: string, homeScore: number, awayScore: number): Promise<Match> {
    const response = await fetch(`${API_BASE_URL}/matches/${id}/score`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ homeScore, awayScore })
    });
    if (!response.ok) throw new Error('Failed to update score');
    return response.json();
  },

  // Admin: Add goal
  async addGoal(id: string, scorer: string, minute: number, team: 'home' | 'away'): Promise<Match> {
    const response = await fetch(`${API_BASE_URL}/matches/${id}/goals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scorer, minute, team })
    });
    if (!response.ok) throw new Error('Failed to add goal');
    return response.json();
  },

  // Admin: End match
  async endMatch(id: string): Promise<Match> {
    const response = await fetch(`${API_BASE_URL}/matches/${id}/end`, {
      method: 'PUT'
    });
    if (!response.ok) throw new Error('Failed to end match');
    return response.json();
  }
};
