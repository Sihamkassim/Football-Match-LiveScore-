import { Response } from 'express';
import { MatchUpdateEvent } from '../types/match';

// Store all active SSE connections per match
const clients: Map<string, Set<Response>> = new Map();

export const sseService = {
  // Add a client to a specific match stream
  addClient(matchId: string, res: Response) {
    if (!clients.has(matchId)) {
      clients.set(matchId, new Set());
    }
    clients.get(matchId)!.add(res);

    console.log(`Client connected to match ${matchId}. Total clients: ${clients.get(matchId)!.size}`);

    // Remove client on connection close
    res.on('close', () => {
      this.removeClient(matchId, res);
    });
  },

  // Remove a client from a match stream
  removeClient(matchId: string, res: Response) {
    const matchClients = clients.get(matchId);
    if (matchClients) {
      matchClients.delete(res);
      console.log(`Client disconnected from match ${matchId}. Total clients: ${matchClients.size}`);
      
      if (matchClients.size === 0) {
        clients.delete(matchId);
      }
    }
  },

  // Broadcast an update to all clients watching a specific match
  broadcastToMatch(matchId: string, event: MatchUpdateEvent) {
    const matchClients = clients.get(matchId);
    
    if (!matchClients || matchClients.size === 0) {
      console.log(`No clients watching match ${matchId}`);
      return;
    }

    console.log(`Broadcasting to ${matchClients.size} clients for match ${matchId}`);
    
    const data = JSON.stringify(event);
    
    matchClients.forEach((client) => {
      try {
        client.write(`data: ${data}\n\n`);
      } catch (error) {
        console.error('Error sending SSE:', error);
        this.removeClient(matchId, client);
      }
    });
  },

  // Get number of clients watching a match
  getClientCount(matchId: string): number {
    return clients.get(matchId)?.size || 0;
  },

  // Get total number of connected clients
  getTotalClients(): number {
    let total = 0;
    clients.forEach(matchClients => {
      total += matchClients.size;
    });
    return total;
  }
};
