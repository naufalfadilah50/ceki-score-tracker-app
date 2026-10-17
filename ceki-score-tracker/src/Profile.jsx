import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();

  // Mengambil data dari localStorage
  const namaLengkap = localStorage.getItem('namaLengkap') || 'NOPAL';
  const username = localStorage.getItem('username') || 'NOPAL';
  const email = localStorage.getItem('email') || 'NOPAL@GMAIL.COM';
  const tanggalBergabung = '07 Juni 2026';

  const handleLogout = () => {
    // Aksi logout (bisa ditambah localStorage.clear() jika ingin menghapus semua data)
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#050b18] text-white p-10 pb-24 w-full">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Profil</h1>
        <p className="text-gray-400 text-sm">Informasi akun Anda</p>
      </div>

      {/* Card Profil Utama */}
      <div className="bg-[#0f172a] border border-[#1e293b] rounded-2xl p-8 mb-6 w-full">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-blue-900 rounded-full flex items-center justify-center text-2xl font-bold text-blue-400 mb-4">
            {namaLengkap.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <span className="text-gray-500 w-6">👤</span>
            <div>
              <p className="text-xs text-gray-400 uppercase">Nama Lengkap</p>
              <p className="font-medium">{namaLengkap}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-500 w-6">👤</span>
            <div>
              <p className="text-xs text-gray-400 uppercase">Username</p>
              <p className="font-medium">{username}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-500 w-6">✉️</span>
            <div>
              <p className="text-xs text-gray-400 uppercase">Email</p>
              <p className="font-medium">{email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-500 w-6">📅</span>
            <div>
              <p className="text-xs text-gray-400 uppercase">Tanggal Bergabung</p>
              <p className="font-medium">{tanggalBergabung}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tombol Logout */}
      <button 
        onClick={handleLogout}
        className="w-full py-4 bg-[#7f1d1d] hover:bg-[#991b1b] text-red-200 rounded-xl font-bold transition-colors"
      >
        Logout
      </button>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-[#050b18] border-t border-[#1e293b] p-3 flex justify-around items-center z-50">
        <div onClick={() => navigate('/home')} className="flex flex-col items-center cursor-pointer text-gray-500 hover:text-[#189ad3]">
          <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
          <span className="text-[10px]">Beranda</span>
        </div>
        <div onClick={() => navigate('/stats')} className="flex flex-col items-center cursor-pointer text-gray-500 hover:text-[#189ad3]">
          <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
          <span className="text-[10px]">Statistik</span>
        </div>
        <div className="flex flex-col items-center text-[#189ad3]">
          <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
          <span className="text-[10px] font-bold">Profil</span>
        </div>
      </div>
    </div>
  );
}

export default Profile;