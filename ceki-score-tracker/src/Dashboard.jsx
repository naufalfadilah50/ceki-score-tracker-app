import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function Scoreboard() {
  const location = useLocation();
  const players = location.state?.players || ['Pemain 1', 'Pemain 2', 'Pemain 3'];
  
  const [data, setData] = useState(
    players.map(name => ({ name, score: 0, lastActivity: 0 }))
  );

  const getEmote = (playerIndex, allData) => {
    const scores = allData.map(p => p.score);
    const maxScore = Math.max(...scores);
    const minScore = Math.min(...scores);
    const currentPlayerScore = allData[playerIndex].score;

    // Logika Emote
    if (currentPlayerScore === maxScore && maxScore !== minScore) return '👑';
    if (currentPlayerScore === minScore && minScore !== maxScore) return '🐸';
    
    // Logika Baku Pukul: Selisih maksimal 20 poin dengan pemain lain
    const isBakuPukul = allData.some((p, i) => i !== playerIndex && Math.abs(p.score - currentPlayerScore) <= 20);
    if (isBakuPukul) return '👊🏻';

    return '';
  };

  const updateScore = (index, value) => {
    const newData = [...data];
    newData[index].score += value;
    newData[index].lastActivity = value;
    setData(newData);
  };

  const resetActivity = (index) => {
    const newData = [...data];
    newData[index].score -= newData[index].lastActivity;
    newData[index].lastActivity = 0;
    setData(newData);
  };

  return (
    <div className="min-h-screen bg-[#050b18] text-white p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {data.map((player, index) => (
          <div key={index} className="bg-[#0f172a] border border-[#1e293b] p-6 rounded-2xl">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-lg">{player.name}</h3>
              <span className="text-2xl">{getEmote(index, data)}</span>
            </div>
            <div className="text-5xl font-bold mb-4">{player.score}</div>
            <p className="text-xs text-gray-500 mb-2">Aktivitas Terakhir:</p>
            <div className="bg-[#1e293b] p-2 rounded mb-4 text-sm">{player.lastActivity}</div>
            
            <div className="flex flex-col gap-2">
              <button onClick={() => updateScore(index, 10)} className="w-full bg-[#189ad3] py-2 rounded-lg font-bold hover:bg-[#1581b0]">
                + Tambah Skor
              </button>
              <button onClick={() => resetActivity(index)} className="w-full bg-[#1e293b] py-2 rounded-lg text-sm hover:bg-gray-700">
                ↺ Batalkan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Scoreboard;