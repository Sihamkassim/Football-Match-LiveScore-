import { Request, Response } from 'express';
import { getAllMatches, getMatchById, updateMatch } from '../data/matches';
import { sseService } from '../services/sseService';
import { Goal, Match, MatchUpdateEvent } from '../types/match';

export const matchController = {
  // Get all matches
  getAllMatches(req: Request, res: Response) {
    const matches = getAllMatches();
    res.json(matches);
  },

  // Get a single match by ID
  getMatchById(req: Request, res: Response) {
    const { id } = req.params;
    const match = getMatchById(id);
    
    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }
    
    res.json(match);
  },

  // SSE endpoint - stream match updates
  streamMatch(req: Request, res: Response) {
    const { id } = req.params;
    const match = getMatchById(id);

    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }

    // Set SSE headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Send initial match data
    const initialEvent: MatchUpdateEvent = {
      type: 'score_update',
      match
    };
    res.write(`data: ${JSON.stringify(initialEvent)}\n\n`);

    // Add client to SSE service
    sseService.addClient(id, res);

    // Keep connection alive with periodic heartbeat
    const heartbeat = setInterval(() => {
      res.write(`:heartbeat\n\n`);
    }, 30000); // Every 30 seconds

    // Clean up on close
    req.on('close', () => {
      clearInterval(heartbeat);
      sseService.removeClient(id, res);
    });
  },

  // Admin: Update match score
  updateScore(req: Request, res: Response) {
    const { id } = req.params;
    const { homeScore, awayScore } = req.body;

    const match = getMatchById(id);
    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }

    // Update scores
    match.homeScore = homeScore;
    match.awayScore = awayScore;
    
    const updatedMatch = updateMatch(id, match);

    // Broadcast update to all connected clients
    const event: MatchUpdateEvent = {
      type: 'score_update',
      match: updatedMatch!
    };
    sseService.broadcastToMatch(id, event);

    res.json(updatedMatch);
  },

  // Admin: Add a goal
  addGoal(req: Request, res: Response) {
    const { id } = req.params;
    const { scorer, minute, team } = req.body;

    const match = getMatchById(id);
    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }

    // Create new goal
    const newGoal: Goal = {
      id: Date.now().toString(),
      scorer,
      minute,
      team,
      timestamp: new Date()
    };

    // Add goal to match
    match.goals.push(newGoal);

    // Update score
    if (team === 'home') {
      match.homeScore++;
    } else {
      match.awayScore++;
    }

    const updatedMatch = updateMatch(id, match);

    // Broadcast goal event to all connected clients
    const event: MatchUpdateEvent = {
      type: 'goal',
      match: updatedMatch!,
      goal: newGoal
    };
    sseService.broadcastToMatch(id, event);

    res.json(updatedMatch);
  },

  // Admin: End match
  endMatch(req: Request, res: Response) {
    const { id } = req.params;

    const match = getMatchById(id);
    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }

    match.status = 'finished';
    const updatedMatch = updateMatch(id, match);

    // Broadcast match end event
    const event: MatchUpdateEvent = {
      type: 'match_end',
      match: updatedMatch!
    };
    sseService.broadcastToMatch(id, event);

    res.json(updatedMatch);
  }
};
