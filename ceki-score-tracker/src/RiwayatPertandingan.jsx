import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function RiwayatPertandingan() {
  const navigate = useNavigate();
  const [riwayat, setRiwayat] = useState([]);

  useEffect(() => {
    const savedData = localStorage.getItem('matchHistory');
    if (savedData) {
      setRiwayat(JSON.parse(savedData));
    }
  }, []);

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Apakah Anda yakin ingin menghapus riwayat ini?");
    if (isConfirmed) {
      const updatedRiwayat = riwayat.filter(item => item.id !== id);
      setRiwayat(updatedRiwayat);
      localStorage.setItem('matchHistory', JSON.stringify(updatedRiwayat));
    }
  };

  const handleContinue = (match) => {
    // Mengirim data pemain dan ID agar Scoreboard tahu ini pertandingan yang dilanjutkan
    navigate('/scoreboard', { state: { players: match.players, isResuming: true, id: match.id } });
  };

  const formatWaktu = (isoString) => {
    return new Date(isoString).toLocaleString('id-ID', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-[#050b18] text-white p-6">
      <h1 className="text-xl font-bold mb-6">Riwayat Pertandingan</h1>
      
      {riwayat.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">Belum ada riwayat pertandingan.</p>
      ) : (
        riwayat.map((match, index) => ( // Penambahan index disini
          <div key={`${match.id}-${index}`} className="bg-[#0f172a] border border-[#1e293b] p-5 rounded-xl mb-4"> {/* Penambahan index di key */}
            <div className="text-sm text-gray-400 space-y-1 mb-4">
              <p>Mulai: {formatWaktu(match.startTime)}</p>
              <p>Selesai: {match.endTime ? formatWaktu(match.endTime) : 'Masih Berlangsung'}</p>
              <p className="font-bold text-white mt-2">Jumlah Pemain: {match.playersCount} Orang</p>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => handleContinue(match)}
                className="flex-1 bg-[#189ad3] py-2 rounded-lg text-xs font-bold hover:bg-[#1581b0] transition"
              >
                Lanjutkan
              </button>
              <button 
                onClick={() => navigate(`/match-detail/${match.id}`)}
                className="flex-1 bg-[#1e293b] py-2 rounded-lg text-xs border border-[#334155] hover:bg-[#2d3748] transition"
              >
                Detail
              </button>
              <button 
                onClick={() => handleDelete(match.id)}
                className="flex-1 bg-red-900/20 text-red-400 py-2 rounded-lg text-xs border border-red-900/50 hover:bg-red-900/40 transition"
              >
                Hapus
              </button>
            </div>
          </div>
        ))
      )}
      
      <button onClick={() => navigate(-1)} className="mt-6 w-full text-gray-400 text-sm">Kembali</button>
    </div>
  );
}

export default RiwayatPertandingan;