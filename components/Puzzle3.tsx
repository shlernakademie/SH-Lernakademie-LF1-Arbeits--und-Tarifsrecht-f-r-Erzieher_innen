import React, { useState } from 'react';
import { PUZZLE_3_SCENARIO } from '../constants';
import { Button } from './Button';
import { AlertTriangle, PhoneOff, Phone } from 'lucide-react';

interface Puzzle3Props {
  onComplete: (success: boolean) => void;
}

export const Puzzle3: React.FC<Puzzle3Props> = ({ onComplete }) => {
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleDecision = (callParents: boolean) => {
    if (callParents) {
      setFeedback("Fehler! Wenn du die Eltern jetzt unvorbereitet konfrontierst, riskierst du, dass Spuren verwischt werden oder das Kind unter Druck gesetzt wird. Erst Team/InsoFa, dann Eltern!");
      // Delay to show feedback then penalty logic triggers via parent
      setTimeout(() => {
        onComplete(false);
      }, 3000);
    } else {
      // Correct
      onComplete(true);
    }
  };

  if (feedback) {
    return (
      <div className="max-w-2xl mx-auto w-full">
        <div className="bg-red-900/80 p-8 rounded-xl border border-red-500 text-center animate-pulse">
           <AlertTriangle className="w-16 h-16 mx-auto text-red-200 mb-4" />
           <h3 className="text-2xl font-bold text-white mb-2">Gefahr!</h3>
           <p className="text-red-100 text-lg">{feedback}</p>
           <p className="mt-4 text-sm font-mono uppercase">Zeitstrafe wird angewendet...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto w-full space-y-6">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
        <div className="flex items-center gap-3 mb-4 border-b border-slate-700 pb-4">
          <div className="p-3 bg-amber-900/50 rounded-lg text-amber-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Rätsel 3: Handlung</h2>
            <p className="text-sm text-slate-400">Entscheide schnell und umsichtig.</p>
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-lg mb-8 text-lg leading-relaxed text-slate-200 border-l-4 border-amber-500">
          {PUZZLE_3_SCENARIO}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => handleDecision(true)}
            className="p-6 bg-slate-700 hover:bg-slate-600 rounded-xl border-2 border-slate-600 hover:border-slate-500 transition-all group"
          >
            <Phone className="w-8 h-8 mx-auto mb-3 text-slate-400 group-hover:text-green-400" />
            <div className="font-bold text-white mb-2">Sofort konfrontieren</div>
            <p className="text-xs text-slate-400">"Ja, erzählen Sie mir, woher der blaue Fleck kommt!"</p>
          </button>

          <button
            onClick={() => handleDecision(false)}
            className="p-6 bg-slate-700 hover:bg-slate-600 rounded-xl border-2 border-slate-600 hover:border-slate-500 transition-all group"
          >
            <PhoneOff className="w-8 h-8 mx-auto mb-3 text-slate-400 group-hover:text-blue-400" />
            <div className="font-bold text-white mb-2">Gespräch vertagen</div>
            <p className="text-xs text-slate-400">"Darum kümmere ich mich gleich. Ich rufe zurück." (Erst Beratung!)</p>
          </button>
        </div>
      </div>
      
      <div className="text-center text-xs text-slate-500">
        Die richtige Entscheidung führt zum Paragraph 8a. Die Ziffer '8' ist der letzte Teil des Codes.
      </div>
    </div>
  );
};