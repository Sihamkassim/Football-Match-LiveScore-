import { MatchUpdateEvent } from '../types/match';

export class SSEService {
  private eventSource: EventSource | null = null;

  // Connect to SSE stream for a specific match
  connect(matchId: string, onUpdate: (event: MatchUpdateEvent) => void, onError?: () => void) {
    // Close existing connection if any
    this.disconnect();

    const url = `/api/matches/${matchId}/stream`;
    this.eventSource = new EventSource(url);

    this.eventSource.onmessage = (event) => {
      try {
        const data: MatchUpdateEvent = JSON.parse(event.data);
        onUpdate(data);
      } catch (error) {
        console.error('Failed to parse SSE data:', error);
      }
    };

    this.eventSource.onerror = (error) => {
      console.error('SSE connection error:', error);
      if (onError) onError();
    };

    this.eventSource.onopen = () => {
      console.log('SSE connection established');
    };
  }

  // Disconnect from SSE stream
  disconnect() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
      console.log('SSE connection closed');
    }
  }

  // Check if connected
  isConnected(): boolean {
    return this.eventSource !== null && this.eventSource.readyState === EventSource.OPEN;
  }
}
