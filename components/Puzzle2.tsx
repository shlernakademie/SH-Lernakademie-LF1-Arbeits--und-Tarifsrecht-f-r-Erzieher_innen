import React, { useState, useEffect } from 'react';
import { PUZZLE_2_STEPS } from '../constants';
import { ProcedureStep } from '../types';
import { Button } from './Button';
import { ArrowDownUp, RefreshCcw } from 'lucide-react';

interface Puzzle2Props {
  onComplete: () => void;
}

export const Puzzle2: React.FC<Puzzle2Props> = ({ onComplete }) => {
  const [availableSteps, setAvailableSteps] = useState<ProcedureStep[]>([]);
  const [orderedSteps, setOrderedSteps] = useState<ProcedureStep[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Initial shuffle
  useEffect(() => {
    // Fisher-Yates shuffle algorithm
    const shuffled = [...PUZZLE_2_STEPS];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setAvailableSteps(shuffled);
  }, []);

  const handleSelect = (step: ProcedureStep) => {
    setAvailableSteps(prev => prev.filter(s => s.id !== step.id));
    setOrderedSteps(prev => [...prev, step]);
    setError(null);
  };

  const handleReset = () => {
    setAvailableSteps([...availableSteps, ...orderedSteps]);
    setOrderedSteps([]);
    setError(null);
  };

  const checkSolution = () => {
    if (orderedSteps.length !== PUZZLE_2_STEPS.length) {
      setError("Bitte ordne alle Schritte zu.");
      return;
    }

    const isCorrect = orderedSteps.every((step, index) => step.correctIndex === index);

    if (isCorrect) {
      onComplete();
    } else {
      setError("Die Reihenfolge ist nicht korrekt. Denk an das Verfahrensschema § 8a.");
      // Optional: Reset on wrong attempt to force rethinking
      // handleReset();
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full space-y-6">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
        <div className="flex items-center gap-3 mb-4 border-b border-slate-700 pb-4">
          <div className="p-3 bg-purple-900/50 rounded-lg text-purple-400">
            <ArrowDownUp className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Rätsel 2: Einschätzung</h2>
            <p className="text-sm text-slate-400">Bringe die Schritte in die richtige logische Reihenfolge.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Source Pool */}
          <div className="bg-slate-900/50 p-4 rounded-lg min-h-[300px]">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Verfügbare Schritte</h3>
            <div className="space-y-2">
              {availableSteps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => handleSelect(step)}
                  className="w-full text-left p-3 bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm rounded-md transition-colors border border-slate-600"
                >
                  <span className="font-bold text-slate-400 mr-2">{step.id}</span>
                  {step.text}
                </button>
              ))}
              {availableSteps.length === 0 && (
                <div className="text-slate-600 text-center italic text-sm mt-10">Alle Schritte zugeordnet</div>
              )}
            </div>
          </div>

          {/* Target List */}
          <div className="bg-slate-900/50 p-4 rounded-lg min-h-[300px] border-2 border-dashed border-slate-700">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider">Dein Ablaufplan</h3>
              <button onClick={handleReset} className="text-slate-500 hover:text-white" title="Reset">
                <RefreshCcw className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-2">
              {orderedSteps.map((step, index) => (
                <div
                  key={step.id}
                  className="w-full text-left p-3 bg-blue-900/30 border border-blue-500/30 text-blue-100 text-sm rounded-md flex gap-2"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                  <span>{step.text}</span>
                </div>
              ))}
              {orderedSteps.length === 0 && (
                <div className="text-slate-600 text-center italic text-sm mt-10">Klicke links auf die Schritte, um sie hier hinzuzufügen.</div>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-500/50 text-red-200 p-4 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <Button onClick={checkSolution} fullWidth disabled={availableSteps.length > 0}>
          Reihenfolge prüfen
        </Button>
      </div>
      
      <div className="text-center text-xs text-slate-500">
        Die Anzahl der korrekten Schritte ({PUZZLE_2_STEPS.length}) ist die zweite Ziffer für den Tresor.
      </div>
    </div>
  );
};