function ModalInfo({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-[#0f172a] border border-[#1e293b] p-6 rounded-2xl max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4 text-center">Informasi Emote Status</h2>
        <p className="text-gray-400 text-sm mb-6 text-center">Pahami arti emote yang akan muncul selama pertandingan</p>
        
        <div className="space-y-3">
          <div className="bg-[#1e293b]/50 p-3 rounded-lg border border-[#334155]">
            <p className="font-bold text-orange-400">👑 Raja Ceki</p>
            <p className="text-xs text-gray-400">Status diberikan kepada pemain dengan total poin tertinggi saat ini.</p>
          </div>
          <div className="bg-[#1e293b]/50 p-3 rounded-lg border border-[#334155]">
            <p className="font-bold text-green-400">🐸 Kodok</p>
            <p className="text-xs text-gray-400">Status diberikan kepada pemain dengan total poin terendah saat ini.</p>
          </div>
          <div className="bg-[#1e293b]/50 p-3 rounded-lg border border-[#334155]">
            <p className="font-bold text-gray-300">✊ Baku Pukul</p>
            <p className="text-xs text-gray-400">Selisih poin maksimal 20 dengan pemain lain. Persaingan ketat!</p>
          </div>
        </div>

        <button 
          onClick={onClose} 
          className="w-full mt-6 py-3 bg-[#189ad3] hover:bg-[#1581b0] rounded-xl font-bold transition"
        >
          Saya Mengerti
        </button>
      </div>
    </div>
  );
}

export default ModalInfo;