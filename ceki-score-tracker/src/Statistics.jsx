import { useEffect, useState } from 'react';

function Statistics() {
  const [stats, setStats] = useState({
    totalMatches: 0,
    highestScore: 0,
    lowestScore: 0,
    wins: 0,
    losses: 0
  });

  useEffect(() => {
    const username = localStorage.getItem('username') || 'User';
    const history = JSON.parse(localStorage.getItem('matchHistory') || '[]');
    
    let highest = -Infinity;
    let lowest = Infinity;
    let wins = 0;
    let losses = 0;

    history.forEach(match => {
      const user = match.players.find(p => p.name === username);
      if (user) {
        if (user.score > highest) highest = user.score;
        if (user.score < lowest) lowest = user.score;
      }
      if (match.winner === username) wins++;
      if (match.loser === username) losses++;
    });

    setStats({
      totalMatches: history.length,
      highestScore: highest === -Infinity ? 0 : highest,
      lowestScore: lowest === Infinity ? 0 : lowest,
      wins,
      losses
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#050b18] text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Statistik Pribadi</h1>
      <div className="grid grid-cols-2 gap-4">
        <StatCard title="Total Pertandingan" value={stats.totalMatches} />
        <StatCard title="Raja Ceki" value={stats.wins} color="text-yellow-500" />
        <StatCard title="Skor Tertinggi" value={stats.highestScore} color="text-green-500" />
        <StatCard title="Kodok" value={stats.losses} color="text-red-500" />
      </div>
    </div>
  );
}

// Komponen pembantu untuk kartu statistik
function StatCard({ title, value, color = "text-white" }) {
  return (
    <div className="bg-[#0f172a] p-4 rounded-xl border border-[#1e293b]">
      <p className="text-gray-400 text-xs uppercase">{title}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

export default Statistics;