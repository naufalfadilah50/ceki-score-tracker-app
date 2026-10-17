# 🎴 Ceki Score Tracker App

**Ceki Score Tracker** adalah aplikasi web modern dan interaktif yang dirancang untuk mempermudah pencatatan, perhitungan, dan pemantauan skor dalam permainan kartu tradisional Ceki secara real-time. Aplikasi ini dilengkapi dengan indikator status emosional (emote status), riwayat pertandingan, statistik statistik pribadi pemain, serta dukungan integrasi ke aplikasi mobile Android via Capacitor.

---

## 🚀 Fitur Utama

- **🔑 Otentikasi & Manajemen Pengguna:**
  - Pendaftaran akun baru (*Register*) dan autentikasi masuk (*Login*).
  - Profil pengguna yang menampilkan informasi akun serta statistik riwayat permainan.

- **📊 Pencatatan & Perhitungan Skor Real-Time:**
  - Tambah dan kurangi skor pemain secara cepat (dukungan angka negatif menggunakan `-`).
  - Pencatatan hingga 5 riwayat aktivitas skor terakhir di setiap kartu pemain.
  - Opsi *Reset* dan *Batalkan* input untuk fleksibilitas permainan.

- **🎭 Indikator Emote Status Dinamis:**
  - 👑 **Raja Ceki:** Diberikan secara otomatis kepada pemain dengan total poin tertinggi.
  - 🐸 **Kodok:** Diberikan kepada pemain dengan total poin terendah.
  - 👊 **Baku Pukul:** Indikator otomatis saat selisih poin antar pemain maksimal 20 (persaingan ketat).

- **📜 Riwayat Pertandingan & Detail Statistik:**
  - Menyimpan riwayat pertandingan lengkap dengan tanggal, waktu, dan jumlah pemain.
  - Fitur untuk melanjutkan pertandingan yang belum selesai atau menghapus riwayat.
  - Halaman **Statistik Pribadi** mencakup *Total Main*, *Win Rate (%)*, skor tertinggi/terendah, serta perolehan gelar Raja Ceki & Kodok.

- **📱 Cross-Platform Ready:**
  - Dibangun menggunakan **Vite** dan **Tailwind CSS** untuk tampilan web yang responsif.
  - Terintegrasi dengan **Capacitor Android** untuk siap dipublikasikan sebagai aplikasi mobile.

---

## 🛠️ Teknologi yang Digunakan

- **Frontend / Core:** JavaScript / React / Vite
- **Styling:** Tailwind CSS
- **Mobile Wrapper:** Capacitor (Android)
- **Package Manager:** npm

---

## 💻 Cara Menjalankan Proyek Secara Lokal

### Prerequisites
Pastikan kamu telah menginstal:
- [Node.js](https://nodejs.org/) (versi LTS direkomendasikan)
- [Git](https://git-scm.com/)

### Langkah Instalasi

1. **Clone Repositori:**
   ```bash
   git clone [https://github.com/naufalfadilah50/ceki-score-tracker-app.git](https://github.com/naufalfadilah50/ceki-score-tracker-app.git)
   cd ceki-score-tracker-app/ceki-score-tracker
