import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './Home';
import CreateMatch from './CreateMatch';
import Scoreboard from './Scoreboard';
import RiwayatPertandingan from './RiwayatPertandingan';
import MatchDetail from './MatchDetail';
import UserStats from './UserStats';
import Profile from './Profile'; 

function LoginForm() {
  const [formData, setFormData] = useState({ 
    namaLengkap: '', username: '', email: '', password: '', konfirmasiPassword: '' 
  });
  const [isRegistering, setIsRegistering] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isRegistering) {
      // PROSES PENDAFTARAN
      if (!formData.namaLengkap || !formData.username || !formData.email || !formData.password) {
        alert("Mohon isi semua data pendaftaran!");
        return;
      }

      // FITUR BARU: Validasi wajib menggunakan @gmail.com
      if (!formData.email.toLowerCase().endsWith('@gmail.com')) {
        alert("Pendaftaran gagal: Email wajib menggunakan @gmail.com!");
        return;
      }

      if (formData.password !== formData.konfirmasiPassword) {
        alert("Password tidak cocok!");
        return;
      }
      
      // Menyimpan data ke localStorage
      localStorage.setItem('namaLengkap', formData.namaLengkap);
      localStorage.setItem('username', formData.username);
      localStorage.setItem('email', formData.email);
      localStorage.setItem('password', formData.password);
      
      alert("Akun berhasil didaftarkan! Silakan masuk.");
      setIsRegistering(false); // Kembali ke mode login
      setFormData({ namaLengkap: '', username: '', email: '', password: '', konfirmasiPassword: '' });
    } else {
      // PROSES LOGIN
      const savedUser = localStorage.getItem('username');
      const savedPass = localStorage.getItem('password');

      if (!savedUser) {
        alert("Belum ada akun terdaftar. Silakan daftar terlebih dahulu!");
      } else if ((formData.email === savedUser || formData.email === localStorage.getItem('email')) && formData.password === savedPass) {
        navigate('/home');
      } else {
        alert("Username atau Password salah!");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1120] flex flex-col items-center justify-center p-4">
      <div className="bg-[#189ad3] p-4 rounded-full mb-6 shadow-lg shadow-[#189ad3]/20">
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5 16l-3-10 7 4 3-7 3 7 7-4-3 10h-14z"/>
        </svg>
      </div>

      <h1 className="text-3xl font-bold text-[#189ad3] mb-2">Ceki Score Tracker</h1>
      <p className="text-gray-400 mb-8">{isRegistering ? "Daftar Akun" : "Pencatat Skor Permainan Ceki"}</p>

      <form onSubmit={handleSubmit} className="bg-[#0f172a] p-8 rounded-xl shadow-2xl w-full max-w-sm border border-[#1e293b]">
        <div className="space-y-4">
          {/* Field Pendaftaran */}
          {isRegistering && (
            <>
              <div>
                <label className="text-gray-300 text-sm block mb-1">Nama Lengkap</label>
                <input name="namaLengkap" type="text" placeholder="Masukan nama lengkap" value={formData.namaLengkap} onChange={handleChange} className="w-full p-3 rounded-md bg-[#1e293b] text-white border border-[#334155] focus:border-[#189ad3] outline-none transition-colors" />
              </div>
              <div>
                <label className="text-gray-300 text-sm block mb-1">Username</label>
                <input name="username" type="text" placeholder="Masukan username" value={formData.username} onChange={handleChange} className="w-full p-3 rounded-md bg-[#1e293b] text-white border border-[#334155] focus:border-[#189ad3] outline-none transition-colors" />
              </div>
            </>
          )}

          <div>
            <label className="text-gray-300 text-sm block mb-1">{isRegistering ? "Email" : "Email atau Username"}</label>
            <input name="email" type="text" placeholder={isRegistering ? "Masukan email (@gmail.com)" : "Masukan email atau username"} value={formData.email} onChange={handleChange} className="w-full p-3 rounded-md bg-[#1e293b] text-white border border-[#334155] focus:border-[#189ad3] outline-none transition-colors" />
          </div>
          
          <div>
            <label className="text-gray-300 text-sm block mb-1">Password</label>
            <input name="password" type="password" placeholder="Masukan password" value={formData.password} onChange={handleChange} className="w-full p-3 rounded-md bg-[#1e293b] text-white border border-[#334155] focus:border-[#189ad3] outline-none transition-colors" />
          </div>

          {isRegistering && (
            <div>
              <label className="text-gray-300 text-sm block mb-1">Konfirmasi Password</label>
              <input name="konfirmasiPassword" type="password" placeholder="Masukan ulang password" value={formData.konfirmasiPassword} onChange={handleChange} className="w-full p-3 rounded-md bg-[#1e293b] text-white border border-[#334155] focus:border-[#189ad3] outline-none transition-colors" />
            </div>
          )}

          <button type="submit" className="w-full py-3 bg-[#189ad3] hover:bg-[#1581b0] rounded-md text-white font-bold transition-colors">
            {isRegistering ? "Daftar" : "Masuk"}
          </button>
        </div>

        <div className="flex justify-center mt-6 text-sm">
          <button 
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-[#189ad3] hover:underline font-medium"
          >
            {isRegistering ? "Sudah punya akun? Masuk" : "Belum punya akun? Daftar dulu"}
          </button>
        </div>
      </form>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-match" element={<CreateMatch />} />
        <Route path="/scoreboard" element={<Scoreboard />} />
        <Route path="/riwayat" element={<RiwayatPertandingan />} />
        <Route path="/match-detail/:id" element={<MatchDetail />} />
        <Route path="/stats" element={<UserStats />} />
        <Route path="/profil" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;