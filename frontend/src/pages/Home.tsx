import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { matchApi } from '../services/matchApi';
import { Match } from '../types/match';

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

  if (loading) return <div className="flex items-center justify-center min-h-screen text-white text-2xl">Loading matches...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-400 text-2xl">{error}</div>;

  return (
    <div className="min-h-screen p-5">
      <header className="text-center text-white py-10">
        <h1 className="text-5xl font-bold mb-3 drop-shadow-lg">⚽ Football Live Scores</h1>
        <p className="text-xl opacity-90 mb-5">Real-time match updates using Server-Sent Events</p>
        <Link to="/admin" className="inline-block px-6 py-3 bg-white text-primary rounded-lg font-bold hover:scale-105 transition-transform">
          Admin Panel
        </Link>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {matches.map((match) => (
          <Link 
            key={match.id} 
            to={`/match/${match.id}`} 
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            <div className={`inline-block px-4 py-1 rounded-full text-sm font-bold mb-4 ${
              match.status === 'live' ? 'bg-red-500 text-white animate-pulse-slow' : 'bg-gray-400 text-white'
            }`}>
              {match.status === 'live' ? '🔴 LIVE' : match.status.toUpperCase()}
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b">
                <span className="text-lg font-bold text-gray-800">{match.homeTeam}</span>
                <span className="text-3xl font-bold text-primary">{match.homeScore}</span>
              </div>
              
              <div className="text-center text-gray-400 font-bold">VS</div>
              
              <div className="flex justify-between items-center py-3 border-b">
                <span className="text-lg font-bold text-gray-800">{match.awayTeam}</span>
                <span className="text-3xl font-bold text-primary">{match.awayScore}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mt-5 pt-5 border-t text-sm text-gray-500">
              <span>⚽ {match.goals.length} goals</span>
              <span className="text-primary font-bold">Watch Live →</span>
            </div>
          </Link>
        ))}
      </div>

      {matches.length === 0 && (
        <div className="text-center text-white text-xl mt-12">
          <p>No matches available at the moment</p>
        </div>
      )}
    </div>
  );
}

export default Home;
