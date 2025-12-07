import React, { useState, useEffect } from 'react';
import { GameStage, GameState } from './types';
import { INITIAL_TIME, PENALTY_SECONDS } from './constants';
import { Timer } from './components/Timer';
import { Button } from './components/Button';
import { Puzzle1 } from './components/Puzzle1';
import { Puzzle2 } from './components/Puzzle2';
import { Puzzle3 } from './components/Puzzle3';
import { Safe } from './components/Safe';
import { Shield, FileText, CheckCircle, AlertOctagon } from 'lucide-react';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    stage: GameStage.INTRO,
    timeLeft: INITIAL_TIME,
    penaltyTime: 0,
    clues: {
      puzzle1: null,
      puzzle2: null,
      puzzle3: null,
    }
  });

  const [activePenalty, setActivePenalty] = useState(false);

  // Timer Logic
  useEffect(() => {
    if (gameState.stage === GameStage.INTRO || gameState.stage === GameStage.SUCCESS || gameState.stage === GameStage.FAILURE) return;

    const timer = setInterval(() => {
      setGameState(prev => {
        if (prev.timeLeft <= 0) {
          return { ...prev, stage: GameStage.FAILURE, timeLeft: 0 };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState.stage]);

  const handlePuzzle1Complete = (factCount: number) => {
    setGameState(prev => ({
      ...prev,
      clues: { ...prev.clues, puzzle1: factCount },
      stage: GameStage.PUZZLE_2
    }));
  };

  const handlePuzzle2Complete = () => {
    setGameState(prev => ({
      ...prev,
      clues: { ...prev.clues, puzzle2: "CORRECT" },
      stage: GameStage.PUZZLE_3
    }));
  };

  const handlePuzzle3Complete = (success: boolean) => {
    if (success) {
      setGameState(prev => ({
        ...prev,
        clues: { ...prev.clues, puzzle3: true },
        stage: GameStage.SAFE
      }));
    } else {
      // Penalty
      setActivePenalty(true);
      setGameState(prev => ({
        ...prev,
        timeLeft: Math.max(0, prev.timeLeft - PENALTY_SECONDS),
        penaltyTime: prev.penaltyTime + PENALTY_SECONDS
      }));
      setTimeout(() => setActivePenalty(false), 2000);
    }
  };

  const handleSafeUnlock = () => {
    setGameState(prev => ({
      ...prev,
      stage: GameStage.SUCCESS
    }));
  };

  const renderContent = () => {
    switch (gameState.stage) {
      case GameStage.INTRO:
        return (
          <div className="max-w-2xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-600 p-6 rounded-full shadow-2xl shadow-blue-500/20">
                <Shield className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              Notfall: Kinderschutz
            </h1>
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-xl text-left space-y-4">
              <p className="text-xl text-slate-300 font-medium">Freitag, 14:00 Uhr.</p>
              <p className="text-slate-400">
                Alle wollen ins Wochenende. Die Leitung ist bereits weg. Plötzlich bemerkst du beim 4-jährigen Leo deutliche Hämatome am Oberarm.
              </p>
              <p className="text-slate-400">
                Du erinnerst dich: Es gibt einen <strong className="text-white">Notfallplan nach § 8a SGB VIII</strong> im digitalen Tresor des Büros. Aber du hast den Code vergessen.
              </p>
              <p className="text-blue-400 font-semibold mt-4">
                Löse 3 Aufgaben, um den Code zu rekonstruieren, bevor die Zeit abläuft.
              </p>
            </div>
            <Button onClick={() => setGameState(prev => ({ ...prev, stage: GameStage.PUZZLE_1 }))} size="lg" className="w-full md:w-auto text-lg px-12">
              Szenario starten
            </Button>
          </div>
        );

      case GameStage.PUZZLE_1:
        return <Puzzle1 onComplete={handlePuzzle1Complete} />;

      case GameStage.PUZZLE_2:
        return <Puzzle2 onComplete={handlePuzzle2Complete} />;

      case GameStage.PUZZLE_3:
        return <Puzzle3 onComplete={handlePuzzle3Complete} />;

      case GameStage.SAFE:
        return <Safe onUnlock={handleSafeUnlock} clueRecap={gameState.clues} />;

      case GameStage.SUCCESS:
        return (
          <div className="max-w-2xl mx-auto text-center space-y-8 animate-in zoom-in duration-500">
             <div className="flex justify-center mb-6">
              <div className="bg-green-600 p-6 rounded-full shadow-2xl shadow-green-500/20">
                <CheckCircle className="w-16 h-16 text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-white">Tresor geöffnet!</h2>
            <div className="bg-slate-800 p-8 rounded-xl border border-green-500/50 shadow-2xl">
              <div className="flex items-center gap-4 mb-6 border-b border-slate-700 pb-4">
                <FileText className="w-8 h-8 text-green-400" />
                <h3 className="text-xl font-bold text-white">Dokument: Notfallplan § 8a</h3>
              </div>
              <ul className="text-left space-y-3 text-slate-300">
                <li className="flex gap-2"><span className="text-green-500">✓</span> Wahrnehmungen trennen (Fakten vs. Meinung)</li>
                <li className="flex gap-2"><span className="text-green-500">✓</span> Verfahrensschema einhalten</li>
                <li className="flex gap-2"><span className="text-green-500">✓</span> Ruhe bewahren & Team einbinden</li>
              </ul>
              <div className="mt-8 pt-4 border-t border-slate-700">
                <p className="text-sm text-slate-500 uppercase tracking-widest mb-2">Benötigte Zeit</p>
                <p className="text-3xl font-mono font-bold text-white">
                  {Math.floor((INITIAL_TIME - gameState.timeLeft) / 60)}m {(INITIAL_TIME - gameState.timeLeft) % 60}s
                </p>
              </div>
            </div>
            <Button onClick={() => window.location.reload()} variant="outline">
              Szenario neustarten
            </Button>
          </div>
        );

      case GameStage.FAILURE:
        return (
          <div className="max-w-2xl mx-auto text-center space-y-8">
             <div className="flex justify-center mb-6">
              <div className="bg-red-600 p-6 rounded-full shadow-2xl">
                <AlertOctagon className="w-16 h-16 text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-white">Zeit abgelaufen</h2>
            <p className="text-slate-400 max-w-md mx-auto">
              In Kinderschutzfällen ist umsichtiges, aber zügiges Handeln gefragt. Leider hast du den Plan nicht rechtzeitig gefunden.
            </p>
            <Button onClick={() => window.location.reload()} variant="danger">
              Nochmal versuchen
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 overflow-y-auto">
      {/* Header */}
      <header className="flex-none p-4 md:p-6 border-b border-slate-800 bg-slate-900/95 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-500" />
            <span className="font-bold hidden md:inline">Kinderschutz Escape Room</span>
          </div>
          {gameState.stage !== GameStage.INTRO && gameState.stage !== GameStage.SUCCESS && gameState.stage !== GameStage.FAILURE && (
            <div className="relative">
              <Timer seconds={gameState.timeLeft} />
              {activePenalty && (
                <div className="absolute top-full mt-2 right-0 text-red-500 font-bold text-sm animate-bounce whitespace-nowrap">
                  - {PENALTY_SECONDS}s Strafe!
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex items-center justify-center p-4 md:p-8">
        <div className="w-full animate-in fade-in duration-500">
          {renderContent()}
        </div>
      </main>

      {/* Progress Footer */}
      {gameState.stage !== GameStage.INTRO && gameState.stage !== GameStage.SUCCESS && gameState.stage !== GameStage.FAILURE && (
        <footer className="flex-none p-4 border-t border-slate-800 bg-slate-900">
          <div className="max-w-xl mx-auto flex justify-between items-center text-xs md:text-sm text-slate-500">
            <div className={`flex items-center gap-2 ${gameState.stage === GameStage.PUZZLE_1 ? 'text-blue-400 font-bold' : ''}`}>
              <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center">1</span>
              <span className="hidden md:inline">Wahrnehmung</span>
            </div>
            <div className="w-8 h-px bg-slate-700"></div>
            <div className={`flex items-center gap-2 ${gameState.stage === GameStage.PUZZLE_2 ? 'text-blue-400 font-bold' : ''}`}>
              <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center">2</span>
              <span className="hidden md:inline">Einschätzung</span>
            </div>
            <div className="w-8 h-px bg-slate-700"></div>
             <div className={`flex items-center gap-2 ${gameState.stage === GameStage.PUZZLE_3 ? 'text-blue-400 font-bold' : ''}`}>
              <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center">3</span>
              <span className="hidden md:inline">Handlung</span>
            </div>
             <div className="w-8 h-px bg-slate-700"></div>
             <div className={`flex items-center gap-2 ${gameState.stage === GameStage.SAFE ? 'text-blue-400 font-bold' : ''}`}>
              <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center">4</span>
              <span className="hidden md:inline">Tresor</span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;