import { useState } from 'react';

function ModalConfirmation({ isOpen, onClose, onConfirm, title, instruction, targetText }) {
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-[#0f172a] border border-[#1e293b] p-6 rounded-2xl max-w-sm w-full">
        <h2 className="font-bold text-lg mb-2">{title}</h2>
        <p className="text-sm text-gray-400 mb-4">{instruction}</p>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ketik ${targetText}`}
          className="w-full p-3 rounded-lg bg-[#1e293b] border border-[#334155] mb-6 outline-none text-white"
        />
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 bg-[#1e293b] rounded-xl font-bold">Batal</button>
          <button 
            onClick={() => { if(input === targetText) { onConfirm(); onClose(); setInput(''); } }}
            disabled={input !== targetText}
            className={`flex-1 py-3 rounded-xl font-bold ${input === targetText ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 cursor-not-allowed'}`}
          >
            {title === "Reset Pertandingan" ? "Reset" : "Keluar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirmation;