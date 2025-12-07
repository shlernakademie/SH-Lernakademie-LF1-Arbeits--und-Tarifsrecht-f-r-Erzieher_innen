import { ObservationSentence, ProcedureStep } from './types';

export const INITIAL_TIME = 600; // 10 minutes
export const PENALTY_SECONDS = 60;

export const PUZZLE_1_SENTENCES: ObservationSentence[] = [
  { id: 1, text: "Leo sitzt in der Bauecke und spielt mit einem roten Auto.", isFact: true },
  { id: 2, text: "Er wirkt heute ungewöhnlich still und traurig.", isFact: false },
  { id: 3, text: "An seinem linken Oberarm ist ein runder, bläulicher Fleck von ca. 2cm Durchmesser zu sehen.", isFact: true },
  { id: 4, text: "Bestimmt ist er zu Hause die Treppe heruntergefallen.", isFact: false },
  { id: 5, text: "Als ich mich ihm nähere, zuckt er kurz zusammen.", isFact: true },
  { id: 6, text: "Er hat wohl Angst, dass ich mit ihm schimpfe.", isFact: false },
  { id: 7, text: "Er sagt: 'Papa hat das gemacht', als ich auf den Arm zeige.", isFact: true },
];

export const PUZZLE_2_STEPS: ProcedureStep[] = [
  { id: 'A', text: "Gewichtige Anhaltspunkte wahrnehmen & dokumentieren", correctIndex: 0 },
  { id: 'B', text: "Gefährdungseinschätzung im Team (4-Augen-Prinzip)", correctIndex: 2 },
  { id: 'C', text: "Insoweit erfahrene Fachkraft (InsoFa) hinzuziehen", correctIndex: 3 },
  { id: 'D', text: "Gespräch mit den Eltern führen (Kooperation)", correctIndex: 4 },
  { id: 'E', text: "Kollegialen Austausch suchen", correctIndex: 1 },
];

export const PUZZLE_3_SCENARIO = `
  Du hast die Beobachtungen dokumentiert und die Schritte sortiert. 
  Du stehst nun vor dem Telefon. Die Mutter von Leo ruft gerade an und fragt, ob Leo noch Wechselwäsche braucht.
  
  Du hast den Verdacht auf Misshandlung noch nicht mit der InsoFa besprochen.
  
  Was tust du?
`;

export const SAFE_CODE_DIGIT_1 = 4; // Number of facts in Puzzle 1
export const SAFE_CODE_DIGIT_2 = 5; // Number of steps in Puzzle 2
export const SAFE_CODE_DIGIT_3 = 8; // Symbolizing Paragraph 8a