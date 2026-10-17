import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UserStats() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Mengambil data riwayat pertandingan dari localStorage
    const history = JSON.parse(localStorage.getItem('matchHistory') || '[]');
    // Mengambil username yang sedang login (untuk memfilter data)
    const currentUser = localStorage.getItem('username') || 'User'; 

    if (history.length === 0) {
      setStats({
        totalMatches: 0,
        highestScore: 0,
        lowestScore: 0,
        rajaCekiCount: 0,
        kodokCount: 0,
        winPercentage: 0
      });
      return;
    }

    let totalMatches = 0;
    let highestScore = -Infinity;
    let lowestScore = Infinity;
    let rajaCekiCount = 0;
    let kodokCount = 0;

    // Menelusuri setiap pertandingan di riwayat untuk menghitung statistik personal user
    history.forEach(match => {
      // Mencari data user di dalam array pemain pada pertandingan tersebut
      const player = match.players.find(p => p.name === currentUser);
      
      if (player) {
        totalMatches++;
        
        // Menentukan skor tertinggi yang pernah diraih
        if (player.score > highestScore) {
          highestScore = player.score;
        }
        
        // Menentukan skor terendah yang pernah diraih
        if (player.score < lowestScore) {
          lowestScore = player.score;
        }

        // Logika Raja Ceki: Mencari skor tertinggi di pertandingan tersebut
        const allScoresInMatch = match.players.map(p => p.score);
        const maxScoreInMatch = Math.max(...allScoresInMatch);
        
        // Jika skor user sama dengan skor tertinggi di match itu, maka user adalah Raja Ceki
        if (player.score === maxScoreInMatch) {
          rajaCekiCount++;
        }

        // Logika Kodok: Mencari skor terendah di pertandingan tersebut
        const minScoreInMatch = Math.min(...allScoresInMatch);
        
        // Jika skor user sama dengan skor terendah di match itu, maka user adalah Kodok
        if (player.score === minScoreInMatch) {
          kodokCount++;
        }
      }
    });

    // Menghitung persentase kemenangan (Win Rate) sebagai Raja Ceki
    const winPercentage = totalMatches > 0 ? ((rajaCekiCount / totalMatches) * 100).toFixed(0) : 0;

    // Menyimpan hasil perhitungan ke dalam state
    setStats({ 
      totalMatches, 
      highestScore: highestScore === -Infinity ? 0 : highestScore, 
      lowestScore: lowestScore === Infinity ? 0 : lowestScore, 
      rajaCekiCount, 
      kodokCount, 
      winPercentage 
    });
  }, []);

  // Tampilan loading jika data sedang diproses
  if (!stats) {
    return (
      <div className="min-h-screen bg-[#050b18] text-white p-6 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-[#189ad3] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-gray-400 font-medium">Memuat statistik...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050b18] text-white p-6 pb-24 relative">
      
      {/* Judul Halaman */}
      <div className="mt-4 mb-8">
        <h1 className="text-2xl font-bold">Statistik Pribadi Saya</h1>
        <p className="text-gray-400 text-xs mt-1">Data lengkap dari semua pertandingan yang Anda mainkan</p>
      </div>

      {/* Grid Kartu Statistik */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        
        {/* Card: Total Pertandingan */}
        <div className="bg-[#0f172a] p-5 rounded-2xl border border-[#1e293b] shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Total Main</p>
          </div>
          <p className="text-3xl font-bold">{stats.totalMatches}</p>
        </div>

        {/* Card: Win Rate */}
        <div className="bg-[#0f172a] p-5 rounded-2xl border border-[#1e293b] shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Win Rate</p>
          </div>
          <p className="text-3xl font-bold text-yellow-500">{stats.winPercentage}%</p>
        </div>

        {/* Card: Skor Tertinggi */}
        <div className="bg-[#0f172a] p-5 rounded-2xl border border-[#1e293b] shadow-lg">
          <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-2">Skor Tertinggi</p>
          <p className="text-2xl font-bold text-green-400">{stats.highestScore}</p>
        </div>

        {/* Card: Skor Terendah */}
        <div className="bg-[#0f172a] p-5 rounded-2xl border border-[#1e293b] shadow-lg">
          <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-2">Skor Terendah</p>
          <p className="text-2xl font-bold text-red-400">{stats.lowestScore}</p>
        </div>

        {/* Card: Raja Ceki Count */}
        <div className="bg-[#0f172a] p-5 rounded-2xl border border-[#1e293b] flex items-center gap-4 shadow-lg">
          <div className="text-4xl">👑</div>
          <div>
            <p className="text-gray-400 text-[10px] uppercase font-bold">Raja Ceki</p>
            <p className="text-xl font-bold text-white">{stats.rajaCekiCount}x</p>
          </div>
        </div>

        {/* Card: Kodok Count */}
        <div className="bg-[#0f172a] p-5 rounded-2xl border border-[#1e293b] flex items-center gap-4 shadow-lg">
          <div className="text-4xl">🐸</div>
          <div>
            <p className="text-gray-400 text-[10px] uppercase font-bold">Kodok</p>
            <p className="text-xl font-bold text-white">{stats.kodokCount}x</p>
          </div>
        </div>
      </div>

      {/* Informasi Tambahan */}
      <div className="bg-[#0f172a] p-5 rounded-2xl border border-[#1e293b] mb-10">
        <h3 className="font-bold text-sm mb-3">Tips Bermain</h3>
        <p className="text-xs text-gray-400 leading-relaxed">
          Tingkatkan persentase Raja Ceki Anda dengan konsisten mencatat skor setiap putaran. Pantau skor terendah Anda untuk menghindari gelar Kodok di pertandingan berikutnya.
        </p>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-[#050b18] border-t border-[#1e293b] p-3 flex justify-around items-center z-50">
        
        {/* Ikon Beranda */}
        <div 
          onClick={() => navigate('/home')} 
          className="flex flex-col items-center cursor-pointer transition-all duration-300 group"
        >
          <svg className="w-6 h-6 mb-1 text-gray-500 group-hover:text-[#189ad3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
          <span className="text-[10px] text-gray-500 group-hover:text-[#189ad3]">Beranda</span>
        </div>
        
        {/* Ikon Statistik (Halaman Aktif) */}
        <div className="flex flex-col items-center cursor-default">
          <svg className="w-6 h-6 mb-1 text-[#189ad3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
          <span className="text-[10px] text-[#189ad3] font-bold">Statistik</span>
        </div>
        
        {/* Ikon Profil (Diperbaiki) */}
        <div 
          onClick={() => navigate('/profil')} 
          className="flex flex-col items-center cursor-pointer transition-all duration-300 group"
        >
          <svg className="w-6 h-6 mb-1 text-gray-500 group-hover:text-[#189ad3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
          <span className="text-[10px] text-gray-500 group-hover:text-[#189ad3]">Profil</span>
        </div>
      </div>
    </div>
  );
}

export default UserStats;