import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUserName(storedUsername);
    }
  }, []);

  const handleCreateMatch = () => {
    const savedData = localStorage.getItem('matchData');
    if (savedData) {
      const isConfirmed = window.confirm("Masih ada pertandingan yang sedang berjalan! Apakah Anda ingin menghapusnya dan memulai yang baru?");
      if (isConfirmed) {
        localStorage.removeItem('matchData');
        navigate('/create-match');
      }
    } else {
      navigate('/create-match');
    }
  };

  return (
    <div className="min-h-screen bg-[#050b18] text-white flex flex-col items-center w-full">
      
      {/* Header - Menggunakan w-full dan px-10 agar tetap ada spasi sedikit di pinggir */}
      <div className="w-full mt-10 mb-8 px-10">
        <h1 className="text-2xl font-bold">Selamat Datang, {userName}!</h1>
        <p className="text-gray-400 text-sm">Siap untuk mencatat skor pertandingan Ceki Anda?</p>
      </div>

      {/* Menu Cards - w-full untuk memenuhi layar */}
      <div className="w-full space-y-4 px-10">
        
        {/* Tombol Buat Pertandingan Baru */}
        <div 
          onClick={handleCreateMatch} 
          className="bg-[#0f172a] border border-[#1e293b] p-4 rounded-xl flex items-center gap-4 cursor-pointer hover:border-blue-500 transition w-full"
        >
          <div className="bg-blue-500 p-3 rounded-full">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
          </div>
          <div>
            <h2 className="font-bold">Buat Pertandingan Baru</h2>
            <p className="text-xs text-gray-400">Mulai pertandingan baru dengan pemain baru</p>
          </div>
        </div>

        {/* Tombol Riwayat Pertandingan */}
        <div 
          onClick={() => navigate('/riwayat')} 
          className="bg-[#0f172a] border border-[#1e293b] p-4 rounded-xl flex items-center gap-4 cursor-pointer hover:border-orange-500 transition w-full"
        >
          <div className="bg-orange-500 p-3 rounded-full">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <div>
            <h2 className="font-bold">Riwayat Pertandingan</h2>
            <p className="text-xs text-gray-400">Lihat semua pertandingan yang pernah dimainkan</p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation - w-full */}
      <div className="fixed bottom-0 w-full bg-[#050b18] border-t border-[#1e293b] p-3 flex justify-around text-[10px] text-gray-500">
        <div className="flex flex-col items-center text-[#189ad3]">
          <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
          <span>Beranda</span>
        </div>
        
        <div onClick={() => navigate('/stats')} className="flex flex-col items-center cursor-pointer hover:text-white transition">
          <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
          <span>Statistik</span>
        </div>
        
        {/* Tombol Profil yang sudah diperbaiki agar bisa ditekan */}
        <div onClick={() => navigate('/profil')} className="flex flex-col items-center cursor-pointer hover:text-white transition">
          <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
          <span>Profil</span>
        </div>
      </div>
    </div>
  );
}

export default Home;