import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { matchApi } from '../services/matchApi';
import { SSEService } from '../services/sseService';
import { Match, MatchUpdateEvent } from '../types/match';
import './MatchDetail.css';

function MatchDetail() {
  const { id } = useParams<{ id: string }>();
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [sseService] = useState(() => new SSEService());

  useEffect(() => {
    if (!id) return;

    loadMatch();

    // Connect to SSE stream
    sseService.connect(
      id,
      handleMatchUpdate,
      () => setConnected(false)
    );
    setConnected(true);

    return () => {
      sseService.disconnect();
    };
  }, [id]);

  const loadMatch = async () => {
    if (!id) return;
    try {
      const data = await matchApi.getMatchById(id);
      setMatch(data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load match:', err);
      setLoading(false);
    }
  };

  const handleMatchUpdate = (event: MatchUpdateEvent) => {
    console.log('Received update:', event);
    setMatch(event.match);

    // Show notification for goals
    if (event.type === 'goal' && event.goal) {
      const notification = document.createElement('div');
      notification.className = 'goal-notification';
      notification.textContent = `⚽ GOAL! ${event.goal.scorer} (${event.goal.minute}')`;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.remove();
      }, 3000);
    }
  };

  if (loading) return <div className="loading">Loading match...</div>;
  if (!match) return <div className="error">Match not found</div>;

  return (
    <div className="match-detail">
      <Link to="/" className="back-button">← Back to Matches</Link>

      <div className="connection-status">
        <span className={connected ? 'connected' : 'disconnected'}>
          {connected ? '🟢 Live Connected' : '🔴 Disconnected'}
        </span>
      </div>

      <div className="match-header">
        <div className={`status-badge ${match.status}`}>
          {match.status === 'live' ? '🔴 LIVE' : match.status.toUpperCase()}
        </div>
      </div>

      <div className="scoreboard">
        <div className="team-score">
          <h2>{match.homeTeam}</h2>
          <div className="score-display">{match.homeScore}</div>
        </div>

        <div className="vs-divider">VS</div>

        <div className="team-score">
          <h2>{match.awayTeam}</h2>
          <div className="score-display">{match.awayScore}</div>
        </div>
      </div>

      <div className="goals-section">
        <h3>⚽ Goals Timeline</h3>
        
        {match.goals.length === 0 ? (
          <p className="no-goals">No goals yet...</p>
        ) : (
          <div className="goals-list">
            {[...match.goals]
              .sort((a, b) => b.minute - a.minute)
              .map((goal) => (
                <div key={goal.id} className={`goal-item ${goal.team}`}>
                  <span className="goal-minute">{goal.minute}'</span>
                  <span className="goal-scorer">⚽ {goal.scorer}</span>
                  <span className="goal-team">
                    {goal.team === 'home' ? match.homeTeam : match.awayTeam}
                  </span>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MatchDetail;
