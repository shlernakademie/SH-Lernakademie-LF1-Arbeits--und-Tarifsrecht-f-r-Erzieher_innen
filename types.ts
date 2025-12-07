export enum GameStage {
  INTRO = 'INTRO',
  PUZZLE_1 = 'PUZZLE_1',
  PUZZLE_2 = 'PUZZLE_2',
  PUZZLE_3 = 'PUZZLE_3',
  SAFE = 'SAFE',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE'
}

export interface ObservationSentence {
  id: number;
  text: string;
  isFact: boolean;
}

export interface ProcedureStep {
  id: string;
  text: string;
  correctIndex: number; // 0-based correct position
}

export interface GameState {
  stage: GameStage;
  timeLeft: number; // in seconds
  penaltyTime: number;
  clues: {
    puzzle1: number | null; // The count of facts
    puzzle2: string | null; // The sequence string
    puzzle3: boolean | null; // Correct decision made
  };
}