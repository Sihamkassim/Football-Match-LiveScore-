import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { matchApi } from '../services/matchApi';
import { Match } from '../types/match';
import './Admin.css';

function Admin() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<string>('');
  const [scorer, setScorer] = useState('');
  const [minute, setMinute] = useState('');
  const [team, setTeam] = useState<'home' | 'away'>('home');
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    try {
      const data = await matchApi.getAllMatches();
      setMatches(data);
      if (data.length > 0 && !selectedMatch) {
        setSelectedMatch(data[0].id);
      }
    } catch (err) {
      console.error('Failed to load matches:', err);
    }
  };

  const handleAddGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMatch || !scorer || !minute) return;

    try {
      await matchApi.addGoal(selectedMatch, scorer, parseInt(minute), team);
      setMessage(`✅ Goal added! ${scorer} (${minute}')`);
      setScorer('');
      setMinute('');
      loadMatches();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('❌ Failed to add goal');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleUpdateScore = async (matchId: string, homeScore: number, awayScore: number) => {
    try {
      await matchApi.updateScore(matchId, homeScore, awayScore);
      setMessage('✅ Score updated!');
      loadMatches();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('❌ Failed to update score');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleEndMatch = async (matchId: string) => {
    try {
      await matchApi.endMatch(matchId);
      setMessage('✅ Match ended!');
      loadMatches();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('❌ Failed to end match');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const currentMatch = matches.find(m => m.id === selectedMatch);

  return (
    <div className="admin">
      <Link to="/" className="back-button">← Back to Matches</Link>
      
      <header className="admin-header">
        <h1>🎮 Admin Panel</h1>
        <p>Manage live match updates</p>
      </header>

      {message && <div className="message">{message}</div>}

      <div className="admin-content">
        <div className="admin-section">
          <h2>Add Goal</h2>
          <form onSubmit={handleAddGoal} className="admin-form">
            <select 
              value={selectedMatch} 
              onChange={(e) => setSelectedMatch(e.target.value)}
              className="form-control"
            >
              {matches.map(match => (
                <option key={match.id} value={match.id}>
                  {match.homeTeam} vs {match.awayTeam}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Scorer name"
              value={scorer}
              onChange={(e) => setScorer(e.target.value)}
              className="form-control"
              required
            />

            <input
              type="number"
              placeholder="Minute"
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              className="form-control"
              min="1"
              max="120"
              required
            />

            <select 
              value={team} 
              onChange={(e) => setTeam(e.target.value as 'home' | 'away')}
              className="form-control"
            >
              <option value="home">Home Team</option>
              <option value="away">Away Team</option>
            </select>

            <button type="submit" className="btn btn-primary">
              ⚽ Add Goal
            </button>
          </form>
        </div>

        <div className="admin-section">
          <h2>Current Match Status</h2>
          {currentMatch && (
            <div className="match-status">
              <h3>{currentMatch.homeTeam} vs {currentMatch.awayTeam}</h3>
              <div className="score-display-admin">
                <span>{currentMatch.homeScore}</span>
                <span>-</span>
                <span>{currentMatch.awayScore}</span>
              </div>
              <p>Status: <strong>{currentMatch.status}</strong></p>
              <p>Goals: {currentMatch.goals.length}</p>
              
              <div className="admin-actions">
                <button 
                  onClick={() => handleUpdateScore(currentMatch.id, currentMatch.homeScore + 1, currentMatch.awayScore)}
                  className="btn btn-small"
                >
                  +1 Home
                </button>
                <button 
                  onClick={() => handleUpdateScore(currentMatch.id, currentMatch.homeScore, currentMatch.awayScore + 1)}
                  className="btn btn-small"
                >
                  +1 Away
                </button>
                {currentMatch.status === 'live' && (
                  <button 
                    onClick={() => handleEndMatch(currentMatch.id)}
                    className="btn btn-danger"
                  >
                    End Match
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="admin-section">
          <h2>All Matches</h2>
          <div className="matches-list-admin">
            {matches.map(match => (
              <div key={match.id} className="match-item-admin">
                <div>
                  <strong>{match.homeTeam} {match.homeScore} - {match.awayScore} {match.awayTeam}</strong>
                  <span className={`badge ${match.status}`}>{match.status}</span>
                </div>
                <button 
                  onClick={() => setSelectedMatch(match.id)}
                  className="btn btn-small"
                >
                  Select
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
