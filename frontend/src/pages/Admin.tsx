import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { matchApi } from '../services/matchApi';
import { Match } from '../types/match';

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
    <div className="min-h-screen p-5">
      <Link to="/" className="inline-block m-5 px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 hover:-translate-x-1 transition-all">
        ← Back to Matches
      </Link>
      
      <header className="text-center text-white py-10">
        <h1 className="text-5xl font-bold mb-3">🎮 Admin Panel</h1>
        <p className="text-xl opacity-90">Manage live match updates</p>
      </header>

      {message && <div className="max-w-4xl mx-auto bg-white p-4 rounded-lg text-center font-bold mb-5 shadow-lg">{message}</div>}

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-5 text-gray-800">Add Goal</h2>
          <form onSubmit={handleAddGoal} className="space-y-4">
            <select 
              value={selectedMatch} 
              onChange={(e) => setSelectedMatch(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition"
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
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition"
              required
            />

            <input
              type="number"
              placeholder="Minute"
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition"
              min="1"
              max="120"
              required
            />

            <select 
              value={team} 
              onChange={(e) => setTeam(e.target.value as 'home' | 'away')}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition"
            >
              <option value="home">Home Team</option>
              <option value="away">Away Team</option>
            </select>

            <button type="submit" className="w-full py-3 bg-primary text-white rounded-lg font-bold hover:bg-secondary hover:-translate-y-1 transition-all">
              ⚽ Add Goal
            </button>
          </form>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-5 text-gray-800">Current Match Status</h2>
          {currentMatch && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">{currentMatch.homeTeam} vs {currentMatch.awayTeam}</h3>
              <div className="flex justify-center items-center gap-5 text-5xl font-bold text-primary my-5">
                <span>{currentMatch.homeScore}</span>
                <span className="text-gray-400">-</span>
                <span>{currentMatch.awayScore}</span>
              </div>
              <p className="text-gray-600">Status: <strong className="text-gray-800">{currentMatch.status}</strong></p>
              <p className="text-gray-600">Goals: <strong className="text-gray-800">{currentMatch.goals.length}</strong></p>
              
              <div className="flex flex-wrap gap-2 mt-5">
                <button 
                  onClick={() => handleUpdateScore(currentMatch.id, currentMatch.homeScore + 1, currentMatch.awayScore)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  +1 Home
                </button>
                <button 
                  onClick={() => handleUpdateScore(currentMatch.id, currentMatch.homeScore, currentMatch.awayScore + 1)}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                >
                  +1 Away
                </button>
                {currentMatch.status === 'live' && (
                  <button 
                    onClick={() => handleEndMatch(currentMatch.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    End Match
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-5 text-gray-800">All Matches</h2>
          <div className="space-y-3">
            {matches.map(match => (
              <div key={match.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-800">
                    {match.homeTeam} {match.homeScore} - {match.awayScore} {match.awayTeam}
                  </div>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-bold mt-1 ${
                    match.status === 'live' ? 'bg-red-500 text-white' : 'bg-gray-400 text-white'
                  }`}>
                    {match.status}
                  </span>
                </div>
                <button 
                  onClick={() => setSelectedMatch(match.id)}
                  className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-secondary transition"
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
