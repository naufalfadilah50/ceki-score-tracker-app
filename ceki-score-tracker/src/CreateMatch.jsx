import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalInfo from './components/ModalInfo';

function CreateMatch() {
  const navigate = useNavigate();
  
  // FUNGSI DETEKSI NAMA: Mengambil username yang terdaftar di localStorage
  const getLoggedInUsername = () => {
    const savedUser = localStorage.getItem('username');
    return savedUser ? savedUser : 'Player 1';
  };

  const [players, setPlayers] = useState(['', '', '']);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mengatur nama user segera setelah komponen dimuat
  useEffect(() => {
    const detectedName = getLoggedInUsername();
    // Langsung set ke index 0 agar Player 1 = Nama Akun Anda
    setPlayers([detectedName, '', '']);
  }, []);

  const handleInputChange = (index, value) => {
    // Jika index 0, jangan izinkan perubahan karena itu nama akun
    if (index === 0) return; 
    
    const newPlayers = [...players];
    newPlayers[index] = value;
    setPlayers(newPlayers);
  };

  const addPlayer = () => {
    setPlayers([...players, '']);
  };

  const removePlayer = (index) => {
    // Jangan izinkan menghapus Player 1 (index 0)
    if (index === 0) return;
    setPlayers(players.filter((_, i) => i !== index));
  };

  const proceedToMatch = () => {
    // VALIDASI: Cek apakah ada input kosong
    if (players.some(p => p.trim() === '')) {
      alert("Mohon isi semua nama pemain sebelum memulai pertandingan!");
      setIsModalOpen(false);
      return;
    }
    setIsModalOpen(false);
    
    // Menyimpan waktu mulai agar bisa dibaca oleh Riwayat
    localStorage.setItem('matchStartTime', new Date().toISOString());
    
    // Hapus data lama agar sesi baru benar-benar bersih
    localStorage.removeItem('matchData');
    
    navigate('/scoreboard', { state: { players } });
  };

  return (
    <div className="min-h-screen bg-[#050b18] text-white p-8">
      
      {/* Tombol Kembali */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        <span>Kembali</span>
      </button>

      <h2 className="text-xl font-bold mb-6">Daftar Pemain</h2>
      
      <div className="space-y-4">
        {players.map((player, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              placeholder={index === 0 ? "Nama Anda" : `Nama Pemain ${index + 1}`}
              value={player}
              // Jika index 0, input dikunci (readOnly) dan diberi gaya khusus
              readOnly={index === 0}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className={`flex-grow p-3 rounded-lg bg-[#0f172a] border border-[#1e293b] outline-none ${index === 0 ? 'opacity-60 cursor-not-allowed border-yellow-700/50' : 'focus:border-[#189ad3]'}`}
            />
            {/* Tombol hapus tidak muncul untuk index 0 */}
            {index !== 0 && (
              <button 
                onClick={() => removePlayer(index)}
                className="p-3 bg-[#1e293b] hover:bg-red-900/50 rounded-lg border border-[#334155] transition"
              >
                🗑️
              </button>
            )}
          </div>
        ))}
      </div>

      <button onClick={addPlayer} className="mt-4 flex items-center gap-2 text-[#189ad3] font-medium">
        <span>➕</span> Tambah Pemain
      </button>
      
      <button 
        onClick={() => setIsModalOpen(true)}
        className="w-full mt-10 py-3 bg-[#189ad3] rounded-xl font-bold hover:bg-[#1581b0] transition"
      >
        Mulai Pertandingan
      </button>

      {/* Modal tetap dipertahankan */}
      <ModalInfo isOpen={isModalOpen} onClose={proceedToMatch} />
    </div>
  );
}

export default CreateMatch;