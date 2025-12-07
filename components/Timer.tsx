import React from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  seconds: number;
}

export const Timer: React.FC<TimerProps> = ({ seconds }) => {
  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isCritical = seconds < 60;

  return (
    <div className={`flex items-center gap-2 font-mono text-xl md:text-2xl font-bold px-4 py-2 rounded-lg bg-slate-800 border ${isCritical ? 'border-red-500 text-red-400 animate-pulse' : 'border-slate-600 text-blue-400'}`}>
      <Clock className="w-5 h-5 md:w-6 md:h-6" />
      {formatTime(seconds)}
    </div>
  );
};