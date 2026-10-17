import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ModalCalculator from './components/ModalCalculator';
import ModalConfirmation from './components/ModalConfirmation';

function Scoreboard() {
  const location = useLocation();
  const navigate = useNavigate();

  // Inisialisasi state: Memperbaiki cara pengambilan data saat resume
  const [data, setData] = useState(() => {
    // 1. Cek jika user menekan "Lanjutkan" dari Riwayat
    if (location.state?.isResuming) {
      // Mengambil data dari state, memastikan formatnya benar
      return location.state.players;
    }
    // 2. Cek jika ada data tersimpan di localStorage (dari sesi aktif sebelumnya)
    const savedData = localStorage.getItem('matchData');
    if (savedData) {
      return JSON.parse(savedData);
    } 
    // 3. Jika bukan keduanya, buat data baru
    const initialPlayers = location.state?.players || ['Pemain 1', 'Pemain 2', 'Pemain 3'];
    return initialPlayers.map(name => ({ name, score: 0, lastActivity: [] }));
  });
  
  // Simpan ke localStorage setiap kali data berubah
  useEffect(() => {
    localStorage.setItem('matchData', JSON.stringify(data));
  }, [data]);

  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [isExitOpen, setIsExitOpen] = useState(false);
  const [targetIndex, setTargetIndex] = useState(null);

  const getEmote = (playerIndex, allData) => {
    const scores = allData.map(p => p.score);
    const max = Math.max(...scores);
    const min = Math.min(...scores);
    const current = allData[playerIndex].score;

    if (current === max && max !== min) return '👑';
    if (current === min && min !== max) return '🐸';
    
    const isBakuPukul = allData.some((p, i) => i !== playerIndex && Math.abs(p.score - current) <= 20);
    if (isBakuPukul) return '👊🏻';
    return '';
  };

  const applyCalculation = (operator, value) => {
    const newData = [...data];
    const currentScore = newData[targetIndex].score;
    let newScore = currentScore;

    switch (operator) {
      case '+': newScore = currentScore + value; break;
      case '-': newScore = currentScore - value; break;
      case '*': newScore = currentScore * value; break;
      case '/': newScore = currentScore / value; break;
    }

    const delta = newScore - currentScore;
    newData[targetIndex].score = newScore;
    newData[targetIndex].lastActivity = [delta, ...newData[targetIndex].lastActivity].slice(0, 5);
    setData(newData);
  };

  const undoScore = (index) => {
    const newData = [...data];
    if (newData[index].lastActivity.length === 0) return;

    const lastDelta = newData[index].lastActivity[0];
    newData[index].score -= lastDelta;
    newData[index].lastActivity = newData[index].lastActivity.slice(1);
    setData(newData);
  };

  const resetAll = () => {
    setData(data.map(p => ({ ...p, score: 0, lastActivity: [] })));
    localStorage.removeItem('matchData');
  };

  // LOGIKA DIPERBAIKI: Mengupdate riwayat lama alih-alih menambah duplikat
  const saveToHistory = () => {
    const oldHistory = JSON.parse(localStorage.getItem('matchHistory') || '[]');
    const matchId = location.state?.id || Date.now();
    
    const newEntry = {
      id: matchId,
      startTime: localStorage.getItem('matchStartTime') || new Date().toISOString(),
      endTime: new Date().toISOString(),
      playersCount: data.length,
      players: data, 
      status: 'Selesai'
    };

    // Mencari apakah ID sudah ada di riwayat
    const existingIndex = oldHistory.findIndex(m => m.id === matchId);
    let updatedHistory;

    if (existingIndex !== -1) {
      // Jika ada, timpa entri lama (Update)
      updatedHistory = [...oldHistory];
      updatedHistory[existingIndex] = newEntry;
    } else {
      // Jika baru, tambahkan ke riwayat
      updatedHistory = [...oldHistory, newEntry];
    }

    localStorage.setItem('matchHistory', JSON.stringify(updatedHistory));
    
    localStorage.removeItem('matchData');
    localStorage.removeItem('matchStartTime');
    
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-[#050b18] text-white p-6">
      
      <div className="flex gap-3 mb-8">
        <button onClick={() => setIsResetOpen(true)} className="bg-[#1e293b] px-4 py-2 rounded-lg text-xs border border-[#334155]">Reset</button>
        <button onClick={() => setIsExitOpen(true)} className="bg-[#1e293b] px-4 py-2 rounded-lg text-xs border border-[#334155]">Keluar</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {data.map((player, index) => (
          <div key={index} className="bg-[#0f172a] border border-[#1e293b] p-5 rounded-2xl">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-bold">{player.name}</h2>
              <span className="text-xl">{getEmote(index, data)}</span>
            </div>
            <div className="text-4xl font-bold mb-4">{player.score}</div>
            <p className="text-[10px] text-gray-400 mb-2">5 Aktivitas Terakhir:</p>
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-full h-8 flex items-center justify-center bg-[#1e293b] rounded text-[10px] border border-[#334155]">
                  {player.lastActivity[i] !== undefined ? player.lastActivity[i] : '-'}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={() => { setTargetIndex(index); setIsCalcOpen(true); }} className="w-full bg-[#189ad3] py-2 rounded-lg text-sm font-bold">+ Tambah Skor</button>
              <button onClick={() => undoScore(index)} className="w-full bg-[#1e293b] py-2 rounded-lg text-sm border border-[#334155]">Batalkan</button>
            </div>
          </div>
        ))}
      </div>

      <ModalCalculator isOpen={isCalcOpen} onClose={() => setIsCalcOpen(false)} onSave={applyCalculation} />
      
      <ModalConfirmation 
        isOpen={isResetOpen}
        onClose={() => setIsResetOpen(false)}
        onConfirm={resetAll}
        title="Reset Pertandingan"
        instruction="Ketik 'RESET' dengan huruf kapital untuk menghapus seluruh skor."
        targetText="RESET"
      />
      
      <ModalConfirmation 
        isOpen={isExitOpen}
        onClose={() => setIsExitOpen(false)}
        onConfirm={saveToHistory}
        title="Keluar Pertandingan"
        instruction="Ketik 'KELUAR' dengan huruf kapital untuk keluar. Data akan tersimpan otomatis ke Riwayat."
        targetText="KELUAR"
      />
    </div>
  );
}

export default Scoreboard;