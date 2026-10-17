import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function MatchDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [match, setMatch] = useState(null);

  useEffect(() => {
    // Mengambil data dari localStorage untuk mencari kecocokan ID
    const history = JSON.parse(localStorage.getItem('matchHistory') || '[]');
    const foundMatch = history.find(m => m.id === parseInt(id));
    setMatch(foundMatch);
  }, [id]);

  // Jika data belum dimuat atau tidak ditemukan
  if (!match) {
    return (
      <div className="min-h-screen bg-[#050b18] text-white p-6 flex items-center justify-center">
        <p>Data pertandingan tidak ditemukan.</p>
      </div>
    );
  }

  // Mengurutkan pemain berdasarkan skor tertinggi ke terendah
  const sortedPlayers = [...(match.players || [])].sort((a, b) => b.score - a.score);
  const winner = sortedPlayers[0];
  const loser = sortedPlayers[sortedPlayers.length - 1];

  return (
    <div className="min-h-screen bg-[#050b18] text-white p-6">
      <button 
        onClick={() => navigate(-1)} 
        className="text-gray-400 hover:text-white mb-6 flex items-center gap-2 transition"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Kembali
      </button>

      <h1 className="text-2xl font-bold mb-6">Detail Pertandingan Lengkap</h1>
      
      {/* Visualisasi Tren Pergerakan Skor (Grafik Trading Style) */}
      <h2 className="font-bold text-lg mb-4 text-gray-200">Grafik Tren Pergerakan Skor</h2>
      <div className="bg-[#0f172a] p-6 rounded-2xl border border-[#1e293b] mb-8 overflow-x-auto">
        <div className="flex gap-6 min-w-max h-48 items-center border-t border-b border-gray-700 relative py-4">
          {/* Garis Dasar Nol */}
          <div className="absolute left-0 w-full h-px bg-gray-600"></div>

          {/* Menghitung nilai absolut tertinggi untuk skala global agar proporsional */}
          {(() => {
            const allCumulative = match.players.flatMap(p => {
              let temp = 0;
              return (p.lastActivity || []).map(act => {
                temp += act;
                return Math.abs(temp);
              });
            });
            const allMax = Math.max(...allCumulative, 1);
            
            return match.players.map((p, i) => {
              // Menghitung akumulasi saldo berjalan
              let currentBalance = 0;
              const cumulativeHistory = (p.lastActivity || []).map(act => {
                currentBalance += act;
                return currentBalance;
              });

              return (
                <div key={i} className="flex flex-col items-center h-full justify-center">
                  <div className="flex items-center gap-1 h-32 px-2">
                    {cumulativeHistory.map((val, idx) => (
                      <div key={idx} className="flex flex-col items-center justify-center w-5 h-full relative group">
                        {/* Angka Poin yang muncul permanen (Class hover dihapus) */}
                        <span className="absolute -top-6 text-[8px] font-bold text-gray-400">
                          {val}
                        </span>

                        {/* Batang Positif (Hijau jika saldo >= 0) */}
                        {val >= 0 && (
                          <div 
                            className="w-full bg-green-500 rounded-t-sm transition-all duration-300 absolute bottom-1/2"
                            style={{ height: `${(val / allMax) * 50}%` }}
                          ></div>
                        )}
                        {/* Batang Negatif (Merah jika saldo < 0) */}
                        {val < 0 && (
                          <div 
                            className="w-full bg-red-500 rounded-b-sm transition-all duration-300 absolute top-1/2"
                            style={{ height: `${(Math.abs(val) / allMax) * 50}%` }}
                          ></div>
                        )}
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] mt-4 font-bold text-gray-400 uppercase">{p.name}</span>
                </div>
              );
            });
          })()}
        </div>
      </div>
      
      {/* Bagian Ringkasan Informasi Pertandingan */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-[#0f172a] p-4 rounded-xl border border-[#1e293b]">
          <p className="text-gray-400 text-xs uppercase tracking-wider">Tanggal Pertandingan</p>
          <p className="font-semibold">{new Date(match.startTime).toLocaleString('id-ID')}</p>
        </div>
        <div className="bg-[#0f172a] p-4 rounded-xl border border-[#1e293b]">
          <p className="text-gray-400 text-xs uppercase tracking-wider">Jumlah Pemain</p>
          <p className="font-semibold">{match.playersCount} pemain</p>
        </div>
      </div>

      {/* Bagian Raja Ceki dan Kodok */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-yellow-900/10 border border-yellow-700/50 p-4 rounded-2xl text-center">
          <div className="text-4xl mb-2">👑</div>
          <p className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest mb-1">Raja Ceki</p>
          <p className="font-bold text-lg">{winner?.name || '-'}</p>
          <p className="text-sm text-yellow-300 font-medium">{winner?.score || 0} Poin</p>
        </div>
        <div className="bg-green-900/10 border border-green-700/50 p-4 rounded-2xl text-center">
          <div className="text-4xl mb-2">🐸</div>
          <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest mb-1">Kodok</p>
          <p className="font-bold text-lg">{loser?.name || '-'}</p>
          <p className="text-sm text-green-300 font-medium">{loser?.score || 0} Poin</p>
        </div>
      </div>

      {/* Bagian Peringkat Pemain */}
      <h2 className="font-bold text-lg mb-4 text-gray-200">Peringkat Akhir</h2>
      <div className="space-y-2 mb-8">
        {sortedPlayers.map((p, i) => (
          <div key={i} className="bg-[#0f172a] p-4 rounded-xl flex justify-between items-center border border-[#1e293b]">
            <span className="font-medium text-gray-300">{i + 1}. {p.name}</span>
            <span className="font-bold text-white text-lg">{p.score} poin</span>
          </div>
        ))}
      </div>

      {/* Bagian Riwayat Aktivitas Lengkap */}
      <h2 className="font-bold text-lg mb-4 text-gray-200">Riwayat Aktivitas Lengkap</h2>
      <div className="space-y-4">
        {match.players?.map((p, index) => (
          <div key={index} className="bg-[#0f172a] p-5 rounded-xl border border-[#1e293b]">
            <p className="font-bold text-sm mb-3 text-[#189ad3] uppercase tracking-wide">{p.name}</p>
            <div className="flex flex-wrap gap-2">
              {p.lastActivity && p.lastActivity.length > 0 ? (
                p.lastActivity.map((act, i) => (
                  <span 
                    key={i} 
                    className={`px-3 py-1 rounded text-xs font-bold ${act >= 0 ? 'bg-green-900/30 text-green-400 border border-green-900/50' : 'bg-red-900/30 text-red-400 border border-red-900/50'}`}
                  >
                    {act > 0 ? `+${act}` : act}
                  </span>
                ))
              ) : (
                <span className="text-gray-500 text-xs italic">Tidak ada aktivitas tercatat</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MatchDetail;