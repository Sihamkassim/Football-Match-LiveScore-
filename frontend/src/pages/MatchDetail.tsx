import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { matchApi } from '../services/matchApi';
import { SSEService } from '../services/sseService';
import { Match, MatchUpdateEvent } from '../types/match';

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

  if (loading) return <div className="flex items-center justify-center min-h-screen text-white text-2xl">Loading match...</div>;
  if (!match) return <div className="flex items-center justify-center min-h-screen text-red-400 text-2xl">Match not found</div>;

  return (
    <div className="min-h-screen p-5">
      <Link to="/" className="inline-block m-5 px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 hover:-translate-x-1 transition-all">
        ← Back to Matches
      </Link>

      <div className="text-center my-5">
        <span className={`inline-block px-5 py-2 rounded-full font-bold text-sm ${
          connected ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {connected ? '🟢 Live Connected' : '🔴 Disconnected'}
        </span>
      </div>

      <div className="text-center my-5">
        <div className={`inline-block px-4 py-1 rounded-full text-sm font-bold ${
          match.status === 'live' ? 'bg-red-500 text-white animate-pulse-slow' : 'bg-gray-400 text-white'
        }`}>
          {match.status === 'live' ? '🔴 LIVE' : match.status.toUpperCase()}
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-10 shadow-2xl mb-8">
        <div className="flex justify-around items-center">
          <div className="text-center flex-1">
            <h2 className="text-3xl font-bold text-gray-800 mb-5">{match.homeTeam}</h2>
            <div className="text-6xl font-bold text-primary">{match.homeScore}</div>
          </div>

          <div className="text-2xl text-gray-400 font-bold px-8">VS</div>

          <div className="text-center flex-1">
            <h2 className="text-3xl font-bold text-gray-800 mb-5">{match.awayTeam}</h2>
            <div className="text-6xl font-bold text-primary">{match.awayScore}</div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 shadow-2xl">
        <h3 className="text-2xl font-bold mb-5 text-gray-800">⚽ Goals Timeline</h3>
        
        {match.goals.length === 0 ? (
          <p className="text-center text-gray-400 italic py-5">No goals yet...</p>
        ) : (
          <div className="space-y-4">
            {[...match.goals]
              .sort((a, b) => b.minute - a.minute)
              .map((goal) => (
                <div key={goal.id} className={`flex items-center gap-5 p-4 rounded-xl transition-all hover:translate-x-2 ${
                  goal.team === 'home' ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-orange-50 border-l-4 border-orange-500'
                }`}>
                  <span className="text-lg font-bold text-primary min-w-[50px]">{goal.minute}'</span>
                  <span className="text-lg font-semibold flex-1">⚽ {goal.scorer}</span>
                  <span className="text-sm text-gray-500">
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
