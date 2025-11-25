import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { matchApi } from '../services/matchApi';
import { Match } from '../types/match';
import './Home.css';

function Home() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    try {
      setLoading(true);
      const data = await matchApi.getAllMatches();
      setMatches(data);
      setError(null);
    } catch (err) {
      setError('Failed to load matches');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading matches...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home">
      <header className="header">
        <h1>⚽ Football Live Scores</h1>
        <p>Real-time match updates using Server-Sent Events</p>
        <Link to="/admin" className="admin-link">Admin Panel</Link>
      </header>

      <div className="matches-grid">
        {matches.map((match) => (
          <Link 
            key={match.id} 
            to={`/match/${match.id}`} 
            className="match-card"
          >
            <div className={`status-badge ${match.status}`}>
              {match.status === 'live' ? '🔴 LIVE' : match.status.toUpperCase()}
            </div>
            
            <div className="match-teams">
              <div className="team">
                <span className="team-name">{match.homeTeam}</span>
                <span className="score">{match.homeScore}</span>
              </div>
              
              <div className="vs">VS</div>
              
              <div className="team">
                <span className="team-name">{match.awayTeam}</span>
                <span className="score">{match.awayScore}</span>
              </div>
            </div>

            <div className="match-footer">
              <span className="goals-count">⚽ {match.goals.length} goals</span>
              <span className="watch-live">Watch Live →</span>
            </div>
          </Link>
        ))}
      </div>

      {matches.length === 0 && (
        <div className="no-matches">
          <p>No matches available at the moment</p>
        </div>
      )}
    </div>
  );
}

export default Home;
