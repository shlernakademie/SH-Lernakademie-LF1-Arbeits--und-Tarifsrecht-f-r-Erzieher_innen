import React, { useState } from 'react';
import { Lock, Unlock, FileText } from 'lucide-react';
import { Button } from './Button';
import { SAFE_CODE_DIGIT_1, SAFE_CODE_DIGIT_2, SAFE_CODE_DIGIT_3 } from '../constants';

interface SafeProps {
  onUnlock: () => void;
  clueRecap: {
    puzzle1: number | null;
  };
}

export const Safe: React.FC<SafeProps> = ({ onUnlock, clueRecap }) => {
  const [code, setCode] = useState(['', '', '']);
  const [error, setError] = useState(false);

  const handleInput = (index: number, value: string) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError(false);
  };

  const handleUnlock = () => {
    const attempt = code.join('');
    const solution = `${SAFE_CODE_DIGIT_1}${SAFE_CODE_DIGIT_2}${SAFE_CODE_DIGIT_3}`;
    
    if (attempt === solution) {
      onUnlock();
    } else {
      setError(true);
      setCode(['', '', '']);
    }
  };

  return (
    <div className="max-w-md mx-auto w-full text-center space-y-8">
      <div className="mb-8">
        <div className="inline-block p-6 bg-slate-800 rounded-full border-4 border-slate-700 shadow-2xl mb-6 relative">
          <Lock className="w-16 h-16 text-slate-400" />
          {error && <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping" />}
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Notfall-Tresor</h2>
        <p className="text-slate-400">Gib den 3-stelligen Sicherheitscode ein, um den Notfallplan zu erhalten.</p>
      </div>

      <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Deine Hinweise</h3>
        <ul className="text-left space-y-2 text-slate-300 text-sm">
          <li className="flex justify-between border-b border-slate-700 pb-2">
            <span>Rätsel 1 (Fakten):</span>
            <span className="font-mono font-bold text-blue-400">{clueRecap.puzzle1}</span>
          </li>
          <li className="flex justify-between border-b border-slate-700 pb-2">
            <span>Rätsel 2 (Schritte):</span>
            <span className="font-mono font-bold text-blue-400">5</span>
          </li>
          <li className="flex justify-between pb-2">
            <span>Rätsel 3 (Paragraph):</span>
            <span className="font-mono font-bold text-blue-400">8</span>
          </li>
        </ul>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        {[0, 1, 2].map((idx) => (
          <input
            key={idx}
            type="number"
            min="0"
            max="9"
            value={code[idx]}
            onChange={(e) => handleInput(idx, e.target.value)}
            className={`w-16 h-20 text-center text-4xl font-mono bg-slate-700 rounded-lg border-2 focus:border-blue-500 focus:outline-none transition-colors text-white ${error ? 'border-red-500 animate-shake' : 'border-slate-600'}`}
            placeholder="-"
          />
        ))}
      </div>

      <Button onClick={handleUnlock} fullWidth size="lg">
        <Unlock className="w-5 h-5 inline-block mr-2" />
        Tresor öffnen
      </Button>
    </div>
  );
};