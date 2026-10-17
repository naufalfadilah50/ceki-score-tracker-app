import { useState } from 'react';

function ModalCalculator({ isOpen, onClose, onSave }) {
  const [input, setInput] = useState('');

  const handleSave = () => {
    // Regex memisahkan operator (+, -, *, /) dengan angka
    const match = input.replace(/\s+/g, '').match(/^([\+\-\*\/])?(-?\d+(\.\d+)?)$/);
    
    if (match) {
      const operator = match[1] || '+'; 
      const value = parseFloat(match[2]);
      
      onSave(operator, value);
      setInput('');
      onClose();
    } else {
      alert("Format salah! Gunakan: +50, -20, *2, /2");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-[#0f172a] border border-[#1e293b] p-6 rounded-2xl max-w-sm w-full">
        <h2 className="font-bold mb-4">Masukkan Operasi</h2>
        <p className="text-xs text-gray-400 mb-4">Contoh: +50, -20, *2, /2</p>
        <input
          autoFocus
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          className="w-full p-3 rounded-lg bg-[#1e293b] border border-[#334155] mb-6 outline-none text-white"
          placeholder="+100"
        />
        <button onClick={handleSave} className="w-full py-3 bg-[#189ad3] rounded-xl font-bold hover:bg-[#1581b0]">
          Simpan
        </button>
      </div>
    </div>
  );
}

export default ModalCalculator;