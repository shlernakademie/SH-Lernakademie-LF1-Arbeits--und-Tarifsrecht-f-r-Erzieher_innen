import React, { useState } from 'react';
import { PUZZLE_1_SENTENCES } from '../constants';
import { Button } from './Button';
import { Eye } from 'lucide-react';

interface Puzzle1Props {
  onComplete: (factCount: number) => void;
}

export const Puzzle1: React.FC<Puzzle1Props> = ({ onComplete }) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  const toggleSentence = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
    setError(null);
  };

  const checkSolution = () => {
    // Check if all selected are facts AND all facts are selected
    const facts = PUZZLE_1_SENTENCES.filter(s => s.isFact);
    const selectedAreFacts = selectedIds.every(id => {
      const s = PUZZLE_1_SENTENCES.find(sent => sent.id === id);
      return s?.isFact;
    });
    
    const allFactsFound = facts.every(f => selectedIds.includes(f.id));

    if (selectedAreFacts && allFactsFound) {
      onComplete(facts.length);
    } else {
      setError("Das ist noch nicht korrekt. Unterscheide strikt zwischen objektiver Beobachtung und subjektiver Wertung/Interpretation.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full space-y-6">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
        <div className="flex items-center gap-3 mb-4 border-b border-slate-700 pb-4">
          <div className="p-3 bg-blue-900/50 rounded-lg text-blue-400">
            <Eye className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Rätsel 1: Wahrnehmung</h2>
            <p className="text-sm text-slate-400">Markiere NUR die objektiven Fakten. Streiche Interpretationen.</p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {PUZZLE_1_SENTENCES.map((sentence) => (
            <div 
              key={sentence.id}
              onClick={() => toggleSentence(sentence.id)}
              className={`p-4 rounded-lg cursor-pointer transition-all border-l-4 ${
                selectedIds.includes(sentence.id)
                  ? 'bg-blue-900/40 border-blue-500 text-blue-100'
                  : 'bg-slate-700/50 border-transparent hover:bg-slate-700 text-slate-300'
              }`}
            >
              {sentence.text}
            </div>
          ))}
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-500/50 text-red-200 p-4 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <Button onClick={checkSolution} fullWidth>
          Auswahl bestätigen
        </Button>
      </div>
      
      <div className="text-center text-xs text-slate-500">
        Die Anzahl der korrekten Fakten ist die erste Ziffer für den Tresor.
      </div>
    </div>
  );
};